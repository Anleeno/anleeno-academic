import React from "react";
import "../css/Experience.css";
import { experiences } from "../data/experience";

export default function Experience() {
  return (
    <section className="experience" id="experience">
      <div className="card-title">Experience</div>
      <div className="timeline-container">
        {experiences.map((experience) => (
          <article className="timeline-item" key={experience.organization}>
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
