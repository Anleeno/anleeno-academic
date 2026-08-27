import React, { useEffect, useState } from "react";
import { BookOpen, BriefcaseBusiness, FolderKanban, Newspaper, UserRound } from "lucide-react";
import "../css/Header.css";
import logo from "../assets/anleeno-logo.svg";

const NAV = [
  { id: "about", label: "About", icon: UserRound },
  { id: "news", label: "News", icon: Newspaper },
  { id: "publications", label: "Publications", icon: BookOpen },
  { id: "experience", label: "Experience", icon: BriefcaseBusiness },
  { id: "projects", label: "Projects", icon: FolderKanban },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY >= 20);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);
  const handleClick = (id) => {
    const target = id === "about" ? document.querySelector("#about .intro-text") : document.getElementById(id);
    if (target) window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 70, behavior: "smooth" });
    setMenuOpen(false);
  };
  return (
    <header className={`header-wrapper ${scrolled ? "is-scrolled" : ""} ${menuOpen ? "menu-open" : ""}`}><div className="header-container">
      <button className="header-name brand-button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <img className="brand-logo" src={logo} alt="Shubo Xu logo" />
      </button>
      <button className={`hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}><span className="bar bar1" /><span className="bar bar2" /><span className="bar bar3" /></button>
      <nav className={`header-nav ${menuOpen ? "show" : ""}`}>{NAV.map((item) => {
        const Icon = item.icon;
        return <button key={item.id} className="nav-item" onClick={() => handleClick(item.id)}><span className="nav-item-content"><Icon aria-hidden="true" />{item.label}</span></button>;
      })}</nav>
    </div></header>
  );
}
