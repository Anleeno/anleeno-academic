import React, { useRef, useState } from "react";
import { Smartphone } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { SiHuggingface } from "react-icons/si";
import "../css/All.css";
import exPoster from "../assets/projects/ex-poster.jpg";
import exVideo from "../assets/projects/ex.mp4";
import adas from "../assets/projects/ADAS.png";
import doris from "../assets/projects/doris.png";

const projects = [
  {
    title: "AI-Native Mixed-Reality Socializing",
    image: exPoster,
    video: exVideo,
    meta: "XR",
    text: "An AI-native mixed-reality social platform that blends spatial perception, generative interaction, and shared XR experiences. The project explores how intelligent agents can make remote socializing feel more embodied, expressive, and naturally connected.",
    note: "Showcase only. The full app will be available in the future.",
    action: "app",
  },
  {
    title: "ADAS for Micro-Mobility",
    image: adas,
    meta: "Intelligent Transportation",
    text: "A vision-based advanced driver-assistance system designed for e-bicycles and other micro-mobility vehicles. It combines real-time road perception, hazard awareness, and lightweight on-device inference to improve safety in complex urban traffic.",
    action: "github",
  },
  {
    title: "DORIS: End-to-End Detection with Object Ranking for Retrieval Instance Selection",
    image: doris,
    meta: "Object Recommendation",
    text: "We propose a novel model for visual search and shopping scenarios, such as Taobao image search and Xiaohongshu camera search, that jointly performs object detection and ranking to identify and recommend the subjects most relevant to user intent.",
    action: "demo",
    link: "https://huggingface.co/spaces/geminia/Doris",
  },
];

const actionDetails = {
  app: { label: "App", Icon: Smartphone },
  github: { label: "GitHub", Icon: FaGithub },
  demo: { label: "Demo", Icon: SiHuggingface },
};

function ProjectMedia({ project }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playVideo = () => {
    if (!videoRef.current) return;
    setIsPlaying(true);
    videoRef.current.play().catch(() => setIsPlaying(false));
  };

  const resetVideo = () => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
    setIsPlaying(false);
  };

  if (project.video) {
    return (
      <div className={`project-video-shell ${isPlaying ? "is-playing" : ""}`}
        onMouseEnter={playVideo} onMouseLeave={resetVideo} onFocus={playVideo} onBlur={resetVideo}>
        <video ref={videoRef} className="project-media" src={project.video} muted loop playsInline
          preload="metadata" aria-label={`${project.title} preview`} />
        <img className="project-video-poster" src={project.image} alt={`${project.title} preview`} />
      </div>
    );
  }

  return <img className="project-media" src={project.image} alt={`${project.title} preview`} />;
}

function ProjectAction({ project }) {
  const { label, Icon } = actionDetails[project.action];
  const content = <><Icon size={14} aria-hidden="true" /><span>{label}</span></>;

  if (!project.link) {
    return <span className="project-link is-disabled" aria-disabled="true">{content}</span>;
  }

  return <a className="project-link" href={project.link} target="_blank" rel="noreferrer">{content}</a>;
}

export default function More() {
  return (
    <section className="card projects-section" id="projects">
      <div className="card-title">Selected Projects</div>
      <div className="project-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.title}>
            <div className="project-media-frame">
              <img className="project-media-backdrop" src={project.image} alt="" aria-hidden="true" />
              <ProjectMedia project={project} />
            </div>
            <div className="project-body">
              <span className="project-meta">{project.meta}</span>
              <h3>{project.title}</h3>
              <p>{project.text}</p>
              {project.note && <div className="project-note">{project.note}</div>}
              <ProjectAction project={project} />
            </div>
          </article>
        ))}
      </div>
      <div className="card-title portfolio-progress-title">More to Come</div>
      <p className="portfolio-progress-text">My portfolio is still under construction—more stories are on the way.</p>
    </section>
  );
}
