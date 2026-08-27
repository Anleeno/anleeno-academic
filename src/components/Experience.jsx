import React, { useEffect, useRef } from "react";
import "../css/Experience.css";
import { experiences } from "../data/experience";

export default function Experience() {
  const timelineRef = useRef(null);

  useEffect(() => {
    const cleanups = [];
    const cards = timelineRef.current?.querySelectorAll(".timeline-content") ?? [];

    cards.forEach((card) => {
      const image = card.querySelector(".org-logo");
      if (!image) return;

      const reflectLogoColor = () => {
        try {
          const canvas = document.createElement("canvas");
          canvas.width = 32;
          canvas.height = 32;
          const context = canvas.getContext("2d", { willReadFrequently: true });
          context.drawImage(image, 0, 0, 32, 32);
          const pixels = context.getImageData(0, 0, 32, 32).data;
          let red = 0;
          let green = 0;
          let blue = 0;
          let totalWeight = 0;

          for (let index = 0; index < pixels.length; index += 4) {
            const alpha = pixels[index + 3] / 255;
            if (alpha < 0.2) continue;

            const r = pixels[index];
            const g = pixels[index + 1];
            const b = pixels[index + 2];
            const maximum = Math.max(r, g, b);
            const minimum = Math.min(r, g, b);
            const brightness = (r + g + b) / 3;
            if (brightness > 245 || brightness < 18) continue;

            const saturation = maximum === 0 ? 0 : (maximum - minimum) / maximum;
            const weight = alpha * (0.35 + saturation);
            red += r * weight;
            green += g * weight;
            blue += b * weight;
            totalWeight += weight;
          }

          if (totalWeight > 0) {
            const reflectedRed = Math.round(red / totalWeight);
            const reflectedGreen = Math.round(green / totalWeight);
            const reflectedBlue = Math.round(blue / totalWeight);
            const luminance = (0.2126 * reflectedRed + 0.7152 * reflectedGreen + 0.0722 * reflectedBlue) / 255;
            const mobileOpacity = (0.14 + luminance * 0.1).toFixed(3);
            card.style.setProperty(
              "--experience-glow",
              `rgba(${reflectedRed}, ${reflectedGreen}, ${reflectedBlue}, 0.13)`,
            );
            card.style.setProperty(
              "--experience-mobile-glow",
              `rgba(${reflectedRed}, ${reflectedGreen}, ${reflectedBlue}, ${mobileOpacity})`,
            );
          }
        } catch {
          // Keep the CSS fallback if a browser cannot sample the image.
        }
      };

      if (image.complete) reflectLogoColor();
      else {
        image.addEventListener("load", reflectLogoColor, { once: true });
        cleanups.push(() => image.removeEventListener("load", reflectLogoColor));
      }
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return (
    <section className="experience" id="experience">
      <div className="card-title">Experience</div>
      <div className="timeline-container" ref={timelineRef}>
        {experiences.map((experience) => (
          <article className="timeline-item" key={experience.organization}>
            <div className="timeline-year">{experience.period.slice(0, 4)}</div>
            <div className="timeline-content">
              <div className="org-logo-container">
                <img className="org-logo" src={experience.logo} alt={`${experience.organization} logo`} />
              </div>
              <div className="exp-container">
                <div className="timeline-header">
                  <div className="exp-organization">
                    <div className="exp-organization-name">{experience.organization}</div>
                    <div className="exp-role">{experience.role}</div>
                  </div>
                  <div className="exp-period">
                    <div>{experience.period}</div>
                    <div className="exp-location">{experience.location}</div>
                  </div>
                </div>
                <ul className="exp-details">
                  {experience.details.map((detail) => (
                    <li key={detail.label}>
                      <span><span className="exp-project-name">{detail.label}</span> {detail.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
