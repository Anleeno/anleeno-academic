import React from "react";
import face from "../assets/anleeno-home-profile.png";
import cv from "../assets/Anleeno-Xu-Resume-mini.pdf";
import "../css/Hero.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaGoogleScholar } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { RiInstagramFill } from "react-icons/ri";
import { Atom, Camera, ScanEye } from "lucide-react";

export default function Hero() {
  const links = [
    { label: "Email", icon: <MdEmail />, url: "mailto:xushubo0805@gmail.com" },
    { label: "GitHub", icon: <FaGithub />, url: "https://github.com/anleeno" },
    { label: "Google Scholar", icon: <FaGoogleScholar />, url: "https://scholar.google.com/citations?hl=en&user=Ih094PwAAAAJ&view_op=list_works&sortby=pubdate" },
    { label: "LinkedIn", icon: <FaLinkedin />, url: "https://www.linkedin.com/in/anleeno0805" },
    { label: "Instagram", icon: <RiInstagramFill />, url: "https://www.instagram.com/anleeno_ss" },
  ];
  return (
    <div className="hero-grid"><div className="hero-left">
      <img src={face} alt="Shubo Xu" className="profile-pic" draggable={false} />
      <div className="hero-meta">
        <div className="meta-name">Shubo Xu</div><div>Senior Algorithm Engineer</div>
        <div className="meta-description">
          <div className="meta-description-row"><ScanEye aria-hidden="true" /><span>CV &amp; MLLM Researcher</span></div>
          <div className="meta-description-row"><Atom aria-hidden="true" /><span>AIGC &amp; AI4Science Explorer</span></div>
          <div className="meta-description-row"><Camera aria-hidden="true" /><span>Photography Enthusiast · Dreamer</span></div>
        </div>
        <div className="meta-link">
          <a className="meta-linkitem" href="https://encore.anleeno.com" target="_blank" rel="noreferrer">Portfolio</a>
          <a className="meta-linkitem" href={cv} target="_blank" rel="noreferrer">Resume</a>
        </div>
        <div className="contact-small">{links.map((item) => <a key={item.label} aria-label={item.label} title={item.label} href={item.url} target="_blank" rel="noreferrer" className="icon-link">{item.icon}</a>)}</div>
        <div className="small-text">Last updated: 2026/08/27</div>
      </div>
    </div></div>
  );
}
