import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useModalDialog } from "../hooks/useModalDialog";
import { Document, Page, pdfjs } from "react-pdf";
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { ArrowLeft, ArrowRight, Download, Maximize2, Minus, Plus, X } from "lucide-react";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "../css/ResumePreview.css";

pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

export default function ResumePreview({ url, name, onClose }) {
  const dialog = useRef(null);
  const viewport = useRef(null);
  useModalDialog(dialog);
  const [area, setArea] = useState({ width: 600, height: 800, desktop: false });
  const [pageRatio, setPageRatio] = useState(Math.SQRT2);
  const [fit, setFit] = useState("auto");
  const [pages, setPages] = useState(0);
  const [page, setPage] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [attempt, setAttempt] = useState(0);
  const [failed, setFailed] = useState(false);
  const fitPage = fit === "page" || (fit === "auto" && area.desktop);
  const width = fitPage ? Math.min(area.width, area.height / pageRatio) : area.width;
  const pageWidth = Math.floor(width * zoom);

  function centerPage() {
    const container = viewport.current;
    if (container) container.scrollLeft = Math.max(0, (container.scrollWidth - container.clientWidth) / 2);
  }

  useLayoutEffect(() => {
    centerPage();
  }, [pageWidth, page, area.width]);

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => setArea({
      width: Math.max(180, entry.contentRect.width),
      height: Math.max(180, entry.contentRect.height),
      desktop: window.matchMedia("(min-width: 601px)").matches,
    }));
    observer.observe(viewport.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  function turnPage(next) {
    setPage(Math.max(1, Math.min(pages, next)));
    viewport.current.scrollTo({ top: 0, left: 0 });
  }

  return createPortal(<dialog ref={dialog} className="resume-preview" aria-labelledby="resume-preview-title"
    onCancel={event => { event.preventDefault(); onClose(); }}
    onClick={event => { if (event.target === event.currentTarget) onClose(); }}
    onKeyDown={event => {
      if (!pages || event.target.closest("a, button, input")) return;
      if (event.key === "PageDown" || event.key === "PageUp") {
        event.preventDefault(); turnPage(page + (event.key === "PageDown" ? 1 : -1));
      }
    }}>
    <header className="resume-heading">
      <h2 id="resume-preview-title" className="resume-accessible-title">{name} — Resume</h2>
      <div className="resume-document-icon" title="Resume" aria-hidden="true">
        <svg viewBox="0 0 28 28" fill="none">
          <rect x="3" y="4" width="22" height="20" rx="4" fill="currentColor" fillOpacity=".1" />
          <path d="M11 4H7a4 4 0 0 0-4 4v12a4 4 0 0 0 4 4h4V4Z" fill="currentColor" fillOpacity=".16" />
          <rect x="3" y="4" width="22" height="20" rx="4" stroke="currentColor" strokeWidth="1.3" />
          <circle cx="8" cy="11" r="2" fill="currentColor" />
          <path d="M5.5 17a2.5 2.5 0 0 1 5 0v1h-5v-1Z" fill="currentColor" />
          <path d="M15 10h6m-6 4h6m-6 4h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <div className="resume-zoom" aria-label="PDF zoom">
        <button type="button" disabled={zoom <= .5} onClick={() => setZoom(value => Math.max(.5, value - .25))} title="Zoom out" aria-label="Zoom out"><Minus /></button>
        <button type="button" className="resume-scale" onClick={() => setZoom(1)} title="Reset zoom" aria-label={`Reset zoom, currently ${Math.round(zoom * 100)} percent`}>{Math.round(zoom * 100)}%</button>
        <button type="button" disabled={zoom >= 2} onClick={() => setZoom(value => Math.min(2, value + .25))} title="Zoom in" aria-label="Zoom in"><Plus /></button>
        <button type="button" className="resume-fit" onClick={() => { setFit(fitPage ? "width" : "page"); setZoom(1); viewport.current.scrollTo({ top: 0, left: 0 }); }} title={fitPage ? "Fit to width" : "Fit whole page"} aria-label={fitPage ? "Fit to width" : "Fit whole page"}><Maximize2 /></button>
      </div>
      <div className="resume-window-actions resume-actions">
        <a href={url} download title="Download PDF" aria-label="Download resume PDF"><Download /></a>
        <button type="button" onClick={onClose} title="Close" aria-label="Close resume preview"><X /></button>
      </div>
    </header>
    {pages > 1 && <div className="resume-tools" aria-label="PDF controls">
      <div className="resume-pagination">
        <button type="button" disabled={page <= 1 || !pages || failed} onClick={() => turnPage(page - 1)} aria-label="Previous page"><ArrowLeft /></button>
        <span aria-live="polite">{pages ? `${page} / ${pages}` : "— / —"}</span>
        <button type="button" disabled={!pages || page >= pages || failed} onClick={() => turnPage(page + 1)} aria-label="Next page"><ArrowRight /></button>
      </div>
    </div>}
    <div className="resume-viewport" ref={viewport} tabIndex={0} aria-label="Resume document">
      <Document key={attempt} file={url} onLoadSuccess={({ numPages }) => { setPages(numPages); setFailed(false); }} onLoadError={() => setFailed(true)}
        style={{ width: pageWidth }}
        externalLinkTarget="_blank" externalLinkRel="noopener noreferrer"
        loading={null}
        error={<div className="resume-message" role="alert"><p>The PDF could not be loaded.</p><button type="button" onClick={() => { setFailed(false); setPages(0); setAttempt(value => value + 1); }}>Try again</button><a href={url} target="_blank" rel="noreferrer">Open the original PDF</a></div>}>
        {pages > 0 && <Page pageNumber={page} width={pageWidth} devicePixelRatio={Math.min(window.devicePixelRatio || 1, 2)}
          onRenderSuccess={centerPage}
          onLoadSuccess={pdfPage => { const size = pdfPage.getViewport({ scale: 1 }); setPageRatio(size.height / size.width); }}
          loading={null}
          error={<p className="resume-message" role="alert">This page could not be rendered. Download the PDF to view it.</p>} />}
      </Document>
    </div>
  </dialog>, document.body);
}
