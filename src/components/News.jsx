import React from "react";
import "../css/All.css";

export default function News() {
  const news = [
    ["2026.08", <>Joined <strong className="news-ref">ByteDance</strong> as a Senior Algorithm Engineer, focusing on MLLMs and Agents.</>],
    ["2026.07", <>Co-first-authored <a className="news-ref" href="https://arxiv.org/pdf/2604.12813" target="_blank" rel="noreferrer">DPC-VQA</a>, accepted by ACM MM&apos;26.</>],
    ["2026.01", <>Released the preprint <a className="news-ref" href="https://arxiv.org/pdf/2601.20689" target="_blank" rel="noreferrer">LEAF</a>, a label-efficient image quality assessment framework.</>],
    ["2025.07", <>Our team placed <strong className="news-ref">Top 2</strong> in the VQualA 2025 Challenge; the report appeared at the ICCV workshop.</>],
  ];
  return <section className="News" id="news"><div className="card-title">News</div><ul className="news-list">{news.map(([time, content], index) => <li key={index}><div className="news-time">{time}</div><div className="news-content">{content}</div></li>)}</ul></section>;
}
