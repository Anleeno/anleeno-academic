import React from "react";
import { Quote } from "lucide-react";
import "../css/All.css";

function InfoCallout({ icon, label, children, footer, variant = "default" }) {
  return (
    <aside className={`callout callout-${variant}`}>
      <div className="callout-icon" aria-hidden="true">{React.createElement(icon)}</div>
      {label && <div className="callout-label">{label}</div>}
      <blockquote className="callout-body">
        <p>{children}</p>
        {footer && <footer>{footer}</footer>}
      </blockquote>
    </aside>
  );
}

export default function About() {
  return (
    <section className="about" id="about">
      <div className="intro-text">
        Hi, I&apos;m <strong>Shubo Xu</strong> (aka <strong>Anleeno Xu</strong>), an AI algorithm engineer and researcher working at the intersection of <strong>computer vision, multimodal large language models, AIGC, and AI Agents</strong>. My work focuses on visual perception and multimodal large language models, with an interest in turning research ideas into practical intelligent systems.
        <br /><br />
        I am currently a <strong>Senior Algorithm Engineer at ByteDance</strong>, following algorithm roles at Baidu and Hello. Beyond research and engineering, I enjoy photography, music, reading, anime, science fiction, philosophy, and meditation.
        <InfoCallout icon={Quote} footer="Rabindranath Tagore" variant="quote">
          Let life be beautiful like summer flowers and death like autumn leaves.
        </InfoCallout>
      </div>
    </section>
  );
}
