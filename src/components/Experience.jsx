import React from "react";
import "../css/Experience.css";
import helloLogo from "../assets/hello.png";
import baiduLogo from "../assets/baidu.svg";
import byteDanceLogo from "../assets/ByteDance.png";

const experiences = [
  {
    organization: "ByteDance Inc.",
    logo: byteDanceLogo,
    period: "2026.08 — Present",
    location: "Shanghai, China",
    role: "Senior MLLM Algorithm Engineer",
    details: [
      <span><span className="exp-project-name">Scope:</span> Contributed to CV, MLLM, and agentic applications across TikTok and Doubao ecosystems, including an MLLM-driven spatial perception system based on in-cabin and dashcam imagery.</span>,
      <span><span className="exp-project-name">Key Work:</span> Applied VLM post-training to road-scene understanding, spatial generation, and AI agents.</span>,
    ],
  },
  {
    organization: "Baidu Inc.",
    logo: baiduLogo,
    period: "2025.01 — 2026.06",
    location: "Beijing, China",
    role: "Senior CV & Multimodal Algorithm Engineer",
    details: [
      <span><span className="exp-project-name">Scope:</span> Contributed to multimodal search and educational AI systems in AI Assistant, spanning open-world image understanding, Vision-Grounded RAG, VLM post-training, and autonomous vision-language agents.</span>,
      <span><span className="exp-project-name">Key Work:</span> Worked on intent-aware fine-grained Vision-Grounded RAG, feedback-driven reasoning and tool scheduling for education agents, and DORIS for joint object detection and instance-priority recommendation in AI search.</span>,
    ],
  },
  {
    organization: "Hello Ltd.",
    logo: helloLogo,
    period: "2023.06 — 2024.12",
    location: "Shanghai, China",
    role: "CV Algorithm Engineer",
    details: [
      <span><span className="exp-project-name">Scope:</span> Conducted R&amp;D of advanced computer vision algorithms on cloud, mobile, and edge platforms for smart-city, transportation, and risk-control applications.</span>,
      <span><span className="exp-project-name">Key Work:</span> Developed edge-cloud collaborative multi-state visual perception for micro-mobility intelligent transportation platforms.</span>,
    ],
  },
];

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
                  {experience.details.map((detail, index) => <li key={index}>{detail}</li>)}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
