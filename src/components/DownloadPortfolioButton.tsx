import { useEffect, useMemo, useState } from "react";
import { Download, Loader2, Printer, X, RefreshCw } from "lucide-react";
import { toast } from "sonner";

const QUALITY_PRESETS = {
  standard: { label: "Standard (192 DPI)", scale: 2, jpegQuality: 0.95 },
  high: { label: "High (288 DPI, print-ready)", scale: 3, jpegQuality: 0.98 },
} as const;

type QualityKey = keyof typeof QUALITY_PRESETS;

const A4_MARGIN_MM = 10;

const buildPdfOptions = (quality: QualityKey) => {
  const preset = QUALITY_PRESETS[quality];
  const bg =
    typeof window !== "undefined"
      ? getComputedStyle(document.body).backgroundColor || "#ffffff"
      : "#ffffff";
  return {
    margin: [A4_MARGIN_MM, A4_MARGIN_MM, A4_MARGIN_MM, A4_MARGIN_MM],
    filename: "heather-greek-portfolio.pdf",
    image: { type: "jpeg" as const, quality: preset.jpegQuality },
    html2canvas: {
      scale: preset.scale,
      useCORS: true,
      allowTaint: true,
      backgroundColor: bg,
      windowWidth: 1280,
      scrollX: 0,
      scrollY: 0,
      letterRendering: true,
      logging: false,
      imageTimeout: 0,
    },
    jsPDF: {
      unit: "mm" as const,
      format: "a4" as const,
      orientation: "portrait" as const,
      compress: true,
      putOnlyUsedFonts: true,
    },
    pagebreak: { mode: ["css", "legacy", "avoid-all"] },
  };
};

// Subset a PDF Blob to the inclusive page range [start, end] (1-indexed).
const subsetPdf = async (fullPdfBytes: ArrayBuffer, start: number, end: number): Promise<Blob> => {
  const { PDFDocument } = await import("pdf-lib");
  const src = await PDFDocument.load(fullPdfBytes);
  const total = src.getPageCount();
  const s = Math.max(1, Math.min(start, total));
  const e = Math.max(s, Math.min(end, total));
  const out = await PDFDocument.create();
  const indices = Array.from({ length: e - s + 1 }, (_, i) => s - 1 + i);
  const copied = await out.copyPages(src, indices);
  copied.forEach((p) => out.addPage(p));
  const bytes = await out.save();
  return new Blob([bytes], { type: "application/pdf" });
};

const DownloadPortfolioButton = ({
  label = "Download Portfolio",
  className = "",
}: {
  label?: string;
  className?: string;
}) => {
  const [loading, setLoading] = useState(false);
  const [rangeBuilding, setRangeBuilding] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState<QualityKey>("high");
  const [fullPdfBytes, setFullPdfBytes] = useState<ArrayBuffer | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(1);

  const filename = useMemo(() => {
    if (totalPages === 0) return "heather-greek-portfolio.pdf";
    const isAll = startPage === 1 && endPage === totalPages;
    if (isAll) return "heather-greek-portfolio.pdf";
    if (startPage === endPage) return `heather-greek-portfolio-p${startPage}.pdf`;
    return `heather-greek-portfolio-p${startPage}-${endPage}.pdf`;
  }, [startPage, endPage, totalPages]);

  const cleanupPreview = () => {
    setPreviewUrl((url) => {
      if (url) URL.revokeObjectURL(url);
      return null;
    });
  };

  const closePreview = () => {
    cleanupPreview();
    setPreviewOpen(false);
    setFullPdfBytes(null);
    setTotalPages(0);
  };

  const generatePreview = async (qualityOverride?: QualityKey) => {
    if (loading) return;
    setLoading(true);
    try {
      const target = document.getElementById("portfolio-root");
      if (!target) {
        toast.error("Could not find portfolio content");
        return;
      }
      const html2pdf = (await import("html2pdf.js")).default;
      const worker = html2pdf().set(buildPdfOptions(qualityOverride ?? quality) as any).from(target);
      const pdf = await worker.toPdf().get("pdf");
      const w = pdf.internal.pageSize.getWidth();
      const h = pdf.internal.pageSize.getHeight();
      if (Math.round(w) !== 210 || Math.round(h) !== 297) {
        console.warn(`PDF page size unexpected: ${w}x${h}mm (expected 210x297)`);
      }
      const arrayBuf: ArrayBuffer = pdf.output("arraybuffer");
      const blob = new Blob([arrayBuf], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const pages = pdf.internal.getNumberOfPages();
      cleanupPreview();
      setFullPdfBytes(arrayBuf);
      setTotalPages(pages);
      setStartPage(1);
      setEndPage(pages);
      setPreviewUrl(url);
      setPreviewOpen(true);
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate preview");
    } finally {
      setLoading(false);
    }
  };

  // Rebuild a trimmed preview blob whenever the page range changes
  useEffect(() => {
    if (!previewOpen || !fullPdfBytes || totalPages === 0) return;
    const isAll = startPage === 1 && endPage === totalPages;
    let cancelled = false;
    (async () => {
      setRangeBuilding(true);
      try {
        const blob = isAll
          ? new Blob([fullPdfBytes], { type: "application/pdf" })
          : await subsetPdf(fullPdfBytes, startPage, endPage);
        if (cancelled) return;
        const url = URL.createObjectURL(blob);
        setPreviewUrl((old) => {
          if (old) URL.revokeObjectURL(old);
          return url;
        });
      } catch (e) {
        console.error(e);
        toast.error("Failed to update page range");
      } finally {
        if (!cancelled) setRangeBuilding(false);
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startPage, endPage, fullPdfBytes, totalPages, previewOpen]);

  const confirmDownload = () => {
    if (!previewUrl) return;
    const a = document.createElement("a");
    a.href = previewUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    toast.success(`Downloaded ${filename}`);
    closePreview();
  };

  const setRange = (s: number, e: number) => {
    const ss = Math.max(1, Math.min(s, totalPages));
    const ee = Math.max(ss, Math.min(e, totalPages));
    setStartPage(ss);
    setEndPage(ee);
  };

  return (
    <>
      <button
        data-testid="download-portfolio-btn"
        onClick={() => generatePreview()}
        disabled={loading}
        className={`inline-flex items-center gap-2 bg-gradient-theme text-primary-foreground px-4 py-2 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-60 ${className}`}
      >
        {loading ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
        {loading ? "Generating..." : label}
      </button>

      {previewOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="PDF preview"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4"
          onClick={closePreview}
        >
          <div
            className="bg-background text-foreground rounded-xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <div>
                <h2 className="font-semibold text-base">Preview before download</h2>
                <p className="text-xs text-muted-foreground">
                  A4 portrait · {A4_MARGIN_MM}mm margins · {QUALITY_PRESETS[quality].label} ·{" "}
                  {totalPages} page{totalPages === 1 ? "" : "s"} total
                </p>
              </div>
              <button onClick={closePreview} aria-label="Close preview" className="p-2 rounded-md hover:bg-muted">
                <X size={18} />
              </button>
            </div>

            {/* Quality */}
            <div className="flex items-center gap-2 px-4 py-2 border-b border-border flex-wrap">
              <span className="text-xs text-muted-foreground mr-1">Quality:</span>
              {(Object.keys(QUALITY_PRESETS) as QualityKey[]).map((k) => (
                <button
                  key={k}
                  onClick={() => {
                    setQuality(k);
                    generatePreview(k);
                  }}
                  className={`text-xs px-2 py-1 rounded-md border ${
                    quality === k ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-muted"
                  }`}
                >
                  {QUALITY_PRESETS[k].label}
                </button>
              ))}
              <button
                onClick={() => generatePreview()}
                className="text-xs px-2 py-1 rounded-md border border-border hover:bg-muted inline-flex items-center gap-1"
                title="Re-render preview"
              >
                <RefreshCw size={12} /> Re-render
              </button>
            </div>

            {/* Page range controls */}
            <div className="flex items-center gap-3 px-4 py-2 border-b border-border flex-wrap">
              <span className="text-xs text-muted-foreground">Pages:</span>
              <button
                data-testid="range-all"
                onClick={() => setRange(1, totalPages)}
                className={`text-xs px-2 py-1 rounded-md border ${
                  startPage === 1 && endPage === totalPages
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border hover:bg-muted"
                }`}
              >
                All ({totalPages})
              </button>
              <button
                data-testid="range-single"
                onClick={() => setRange(startPage, startPage)}
                className={`text-xs px-2 py-1 rounded-md border ${
                  startPage === endPage ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-muted"
                }`}
              >
                Single page
              </button>
              <div className="flex items-center gap-1 text-xs">
                <label className="text-muted-foreground">From</label>
                <input
                  data-testid="range-start"
                  type="number"
                  min={1}
                  max={totalPages}
                  value={startPage}
                  onChange={(e) => setRange(Number(e.target.value), endPage)}
                  className="w-16 px-2 py-1 rounded-md border border-border bg-background"
                />
                <label className="text-muted-foreground">to</label>
                <input
                  data-testid="range-end"
                  type="number"
                  min={startPage}
                  max={totalPages}
                  value={endPage}
                  onChange={(e) => setRange(startPage, Number(e.target.value))}
                  className="w-16 px-2 py-1 rounded-md border border-border bg-background"
                />
              </div>
              <span className="text-xs text-muted-foreground ml-auto">
                {rangeBuilding ? "Updating…" : `Showing ${endPage - startPage + 1} page${endPage === startPage ? "" : "s"}`}
              </span>
            </div>

            <div className="flex-1 bg-muted/30 relative">
              {previewUrl && (
                <iframe
                  title="PDF preview"
                  src={previewUrl}
                  className="w-full h-full"
                  data-testid="pdf-preview-iframe"
                />
              )}
              {rangeBuilding && (
                <div className="absolute top-2 right-2 bg-background/90 border border-border rounded-md px-2 py-1 text-xs flex items-center gap-1">
                  <Loader2 size={12} className="animate-spin" /> Rebuilding
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-border">
              <button onClick={closePreview} className="px-4 py-2 rounded-lg text-sm border border-border hover:bg-muted">
                Cancel
              </button>
              <button
                onClick={() => previewUrl && window.open(previewUrl, "_blank")?.print()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm border border-border hover:bg-muted"
              >
                <Printer size={14} /> Print
              </button>
              <button
                data-testid="confirm-download-btn"
                onClick={confirmDownload}
                disabled={rangeBuilding}
                className="inline-flex items-center gap-2 bg-gradient-theme text-primary-foreground px-4 py-2 rounded-lg font-medium text-sm hover:opacity-90 disabled:opacity-60"
              >
                <Download size={14} /> Download {filename}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DownloadPortfolioButton;
