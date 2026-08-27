import React from "react";
import { ArrowUp } from "lucide-react";
import "../css/Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer-content">
        <p>© {year} Anleeno Xu.</p>
        <button
          className="back-to-top"
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          title="Back to top"
        >
          <ArrowUp size={19} aria-hidden="true" />
        </button>
      </div>
    </footer>
  );
}
