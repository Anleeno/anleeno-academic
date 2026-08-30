import React from "react";
import "../css/Hero.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaGoogleScholar } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { RiInstagramFill } from "react-icons/ri";
import { TbBrandOpenai } from "react-icons/tb";
import { Camera, Sparkles } from "lucide-react";
import { hero } from "../siteConfig";

const descriptionIcons = {
  openai: TbBrandOpenai,
  sparkles: Sparkles,
  camera: Camera,
};

const socialIcons = {
  email: MdEmail,
  github: FaGithub,
  scholar: FaGoogleScholar,
  linkedin: FaLinkedin,
  instagram: RiInstagramFill,
};

export default function Hero() {
  return (
    <div className="hero-grid"><div className="hero-left">
      <img src={hero.profileImage} alt={hero.name} className="profile-pic" draggable={false} />
      <div className="hero-meta">
        <div className="meta-name">{hero.name}</div><div>{hero.title}</div>
        <div className="meta-description">
          {hero.descriptions.map((item) => {
            const Icon = descriptionIcons[item.icon];
            return <div className="meta-description-row" key={item.text}>{Icon && <Icon aria-hidden="true" />}<span>{item.text}</span></div>;
          })}
        </div>
        <div className="meta-link">
          {hero.primaryLinks.map((link) => <a className="meta-linkitem" href={link.url} target="_blank" rel="noreferrer" key={link.label}>{link.label}</a>)}
        </div>
        <div className="contact-small">{hero.socialLinks.map((item) => {
          const Icon = socialIcons[item.icon];
          return <a key={item.label} aria-label={item.label} title={item.label} href={item.url} target="_blank" rel="noreferrer" className="icon-link">{Icon && <Icon />}</a>;
        })}</div>
        <div className="small-text">Last updated: {import.meta.env.VITE_BUILD_DATE}</div>
      </div>
    </div></div>
  );
}
