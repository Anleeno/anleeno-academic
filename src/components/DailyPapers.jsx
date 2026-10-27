import { useState } from "react";
import PdfPreview from "./PdfPreview";
import RelatedPapers from "./RelatedPapers";
import "../css/DailyPapers.css";

const dailyFeed = { id: "daily" };

export default function DailyPapers() {
  const [paper, setPaper] = useState(null);
  return <>
    <svg aria-hidden="true" width="0" height="0" style={{position: "absolute", pointerEvents: "none"}}>
      <defs><filter id="daily-remove-white" colorInterpolationFilters="sRGB">
        <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  -10 -10 -10 0 30" result="whiteMask" />
        <feComposite in="SourceGraphic" in2="whiteMask" operator="in" />
      </filter></defs>
    </svg>
    <RelatedPapers paper={dailyFeed} daily onOpen={setPaper} />
    {paper && <PdfPreview key={paper.id} url={paper.pdfUrl} name={paper.title} kind="paper" standalone onClose={() => setPaper(null)} />}
  </>;
}
