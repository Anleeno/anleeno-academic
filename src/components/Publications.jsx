import React, { useEffect, useState } from "react";
import { AiOutlineCheck, AiOutlineCopy, AiOutlineFileText } from "react-icons/ai";
import "../css/Publications.css";
import { fetchScholarCitations, resolveCitationCount } from "../utils/scholarCitations";
import dpc from "../assets/publications/2026-dpc-vqa.png";
import leaf from "../assets/publications/2026-leaf.png";
import vquala from "../assets/publications/2025-vqc-cha.png";

const publications = [
  {
    id: "dpc-vqa",
    image: dpc,
    title: "DPC-VQA: Decoupling Quality Perception and Residual Calibration for Video Quality Assessment",
    abstract: "Recent multimodal large language models (MLLMs) have shown promising performance on video quality assessment (VQA) tasks. However, adapting them to new scenarios remains expensive due to large-scale retraining and costly mean opinion score (MOS) annotations. In this paper, we argue that a pretrained MLLM already provides a useful perceptual prior for VQA, and that the main challenge is to efficiently calibrate this prior to the target MOS space. Based on this insight, we propose DPC-VQA, a decoupling perception and calibration framework for video quality assessment. Specifically, DPC-VQA uses a frozen MLLM to provide a base quality estimate and perceptual prior, and employs a lightweight calibration branch to predict a residual correction for target-scenario adaptation. This design avoids costly end-to-end retraining while maintaining reliable performance with lower training and data costs. Extensive experiments on both user-generated content (UGC) and AI-generated content (AIGC) benchmarks show that DPC-VQA achieves competitive performance against representative baselines, while using less than 2% of the trainable parameters of conventional MLLM-based VQA methods and remaining effective with only 20% of MOS labels. The code will be released upon publication.",
    authors: <>X. Li, <strong>S. Xu</strong>, Z. Zhang, Z. Cai, Y. Chen, and G. Zhai</>,
    authorTag: { label: "Co-1st", type: "cofirst" },
    venue: "ACM MM '26",
    ccf: "CCF A",
    venueType: "conference",
    tags: ["Video Quality Assessment", "MLLM", "Few-shot", "AIGC"],
    link: "https://arxiv.org/pdf/2604.12813",
    citation: "X. Li, S. Xu, Z. Zhang, Z. Cai, Y. Chen, and G. Zhai, “DPC-VQA: Decoupling Quality Perception and Residual Calibration for Video Quality Assessment,” arXiv preprint arXiv:2604.12813, 2026.",
  },
  {
    id: "leaf",
    image: leaf,
    title: "Decoupling Perception and Calibration: Label-Efficient Image Quality Assessment Framework",
    abstract: "Recent multimodal large language models (MLLMs) have demonstrated strong capabilities in image quality assessment (IQA) tasks. However, adapting such large-scale models is computationally expensive and still relies on substantial Mean Opinion Score (MOS) annotations. We argue that for MLLM-based IQA, the core bottleneck lies not in the quality perception capacity of MLLMs, but in MOS scale calibration. Therefore, we propose LEAF, a Label-Efficient Image Quality Assessment Framework that distills perceptual quality priors from an MLLM teacher into a lightweight student regressor, enabling MOS calibration with minimal human supervision. Specifically, the teacher conducts dense supervision through point-wise judgments and pair-wise preferences, with an estimate of decision reliability. Guided by these signals, the student learns the teacher's quality perception patterns through joint distillation and is calibrated on a small MOS subset to align with human annotations. Experiments on both user-generated and AI-generated IQA benchmarks demonstrate that our method significantly reduces the need for human annotations while maintaining strong MOS-aligned correlations, making lightweight IQA practical under limited annotation budgets.",
    authors: <>X. Li, Z. Zhang, Z. Xu, <strong>S. Xu</strong>, X. Min, Y. Chen, and G. Zhai</>,
    venue: "Preprint '26",
    venueType: "preprint",
    tags: ["Image Quality Assessment", "Knowledge Distillation", "Label-Efficient Learning"],
    link: "https://arxiv.org/pdf/2601.20689",
    citation: "X. Li, Z. Zhang, Z. Xu, S. Xu, X. Min, Y. Chen, and G. Zhai, “Decoupling Perception and Calibration: Label-Efficient Image Quality Assessment Framework,” arXiv preprint arXiv:2601.20689, 2026.",
  },
  {
    id: "vquala",
    image: vquala,
    title: "VQualA 2025 Challenge on Visual Quality Comparison for Large Multimodal Models: Methods and Results",
    abstract: "This paper presents a summary of the VQualA 2025 Challenge on Visual Quality Comparison for Large Multimodal Models (LMMs), hosted as part of the ICCV 2025 Workshop on Visual Quality Assessment. The challenge aims to evaluate and enhance the ability of state-of-the-art LMMs to perform open-ended and detailed reasoning about visual quality differences across multiple images. To this end, the competition introduces a novel benchmark comprising thousands of coarse-to-fine grained visual quality comparison tasks, spanning single images, pairs, and multi-image groups. Each task requires models to provide accurate quality judgments. The competition emphasizes holistic evaluation protocols, including 2AFC-based binary preference and multi-choice questions (MCQs). Around 100 participants submitted entries, with five models demonstrating the emerging capabilities of instruction-tuned LMMs on quality assessment. This challenge marks a significant step toward open-domain visual quality reasoning and comparison and serves as a catalyst for future research on interpretable and human-aligned quality evaluation systems.",
    authors: <>H. Zhu et al.</>,
    authorTag: { label: "Challenge Top 2", type: "rank" },
    venue: "ICCVW '25",
    ccf: "CCF A",
    venueType: "conference",
    tags: ["Visual Quality Comparison", "LMM Evaluation", "Benchmark"],
    link: "https://openaccess.thecvf.com/content/ICCV2025W/VQualA/papers/Zhu_VQualA_2025_Challenge_on_Visual_Quality_Comparison_for_Large_Multimodal_ICCVW_2025_paper.pdf",
    citation: "H. Zhu et al., “VQualA 2025 Challenge on Visual Quality Comparison for Large Multimodal Models: Methods and Results,” in Proc. IEEE/CVF Int. Conf. Comput. Vis. (ICCV) Workshops, 2025, pp. 3383–3393.",
  },
];

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
                <div className="publication-authors">{paper.authors}</div>
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
