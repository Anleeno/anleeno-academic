import React, { useEffect, useState } from "react";
import { AiOutlineCheck, AiOutlineCopy, AiOutlineFileText } from "react-icons/ai";
import "../css/Publications.css";
import { publications } from "../siteConfig";
import { fetchScholarCitations, resolveCitationCount } from "../utils/scholarCitations";

function copyText(text) {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);
  const input = document.createElement("textarea");
  input.value = text;
  input.style.position = "fixed";
  input.style.opacity = "0";
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  input.remove();
  return Promise.resolve();
}

export default function Publications() {
  const [copiedPaper, setCopiedPaper] = useState("");
  const [bursts, setBursts] = useState([]);
  const [citationMap, setCitationMap] = useState({});

  useEffect(() => {
    let active = true;
    fetchScholarCitations().then((citations) => {
      if (active) setCitationMap(citations);
    });
    return () => { active = false; };
  }, []);

  const copyCitation = (paper, event) => {
    copyText(paper.citation).then(() => {
      const burstId = `${paper.id}-${Date.now()}`;
      setCopiedPaper(paper.id);
      setBursts((current) => [...current, { id: burstId, x: event.clientX, y: event.clientY }]);
      window.setTimeout(() => setCopiedPaper((current) => current === paper.id ? "" : current), 1400);
      window.setTimeout(() => setBursts((current) => current.filter((burst) => burst.id !== burstId)), 900);
    }).catch(() => {});
  };

  return (
    <section id="publications">
      <div className="publication-fireworks" aria-hidden="true">
        {bursts.map((burst) => (
          <span className="publication-firework" style={{ left: burst.x, top: burst.y }} key={burst.id}>
            {Array.from({ length: 10 }).map((_, index) => <i style={{ "--particle-angle": `${index * 36}deg` }} key={index} />)}
          </span>
        ))}
      </div>
      <div className="card-title">Publications</div>
      <div className="publications-list">
        {publications.map((paper) => {
          const citationCount = resolveCitationCount(paper.title, citationMap);
          return (
          <article className="publication-card" id={paper.id} key={paper.id}>
            <img className="publication-image" src={paper.image} alt="" />
            <div className="publication-content">
              <div className="publication-venue">
                <span className={`venue-tag ${paper.venueType}`}>{paper.venue}</span>
                {paper.ccf && <span className="venue-tag ccf">{paper.ccf}</span>}
              </div>
              <div className="publication-title-wrapper">
                <div className="publication-title" tabIndex="0">{paper.title}</div>
                <div className="abstract-popup" role="tooltip">{paper.abstract}</div>
              </div>
              <div className="publication-author-row">
                <div className="publication-authors">{paper.authors.map((author, index) => author.strong ? <strong key={index}>{author.text}</strong> : <React.Fragment key={index}>{author.text}</React.Fragment>)}</div>
                <div className="publication-author-tags">
                  {Number.isFinite(citationCount) && citationCount > 0 && <span className="publication-author-tag is-citation">Cited by {citationCount}</span>}
                  {paper.authorTag && <span className={`publication-author-tag is-${paper.authorTag.type}`}>{paper.authorTag.label}</span>}
                </div>
              </div>
              <div className="publication-tags">{paper.tags.map((tag) => <span className="tag-item-show" key={tag}>{tag}</span>)}</div>
              <div className="publication-links">
                <a href={paper.link} target="_blank" rel="noreferrer"><AiOutlineFileText aria-hidden="true" />Paper</a>
                <button className={copiedPaper === paper.id ? "is-copied" : ""} type="button" onClick={(event) => copyCitation(paper, event)}>
                  {copiedPaper === paper.id ? <AiOutlineCheck aria-hidden="true" /> : <AiOutlineCopy aria-hidden="true" />}
                  {copiedPaper === paper.id ? "Copied" : "Cite"}
                </button>
                <span className="publication-citation-preview">{paper.citation}</span>
              </div>
            </div>
          </article>
          );
        })}
      </div>
    </section>
  );
}
