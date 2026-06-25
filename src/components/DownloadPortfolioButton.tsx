import { useState } from "react";
import { Download, Loader2, Printer, X } from "lucide-react";
import { toast } from "sonner";

// Quality presets — scale corresponds to effective DPI relative to 96 CSS DPI.
// 2 => ~192 DPI, 3 => ~288 DPI (print-ready). Higher = crisper text/images but bigger files.
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
      letterRendering: true, // crisper text glyphs
      logging: false,
      imageTimeout: 0,
    },
    jsPDF: {
      unit: "mm" as const,
      format: "a4" as const,
      orientation: "portrait" as const,
      compress: true,
      // Embed standard fonts so text stays vector-crisp where html2canvas isn't used
      putOnlyUsedFonts: true,
    },
    pagebreak: { mode: ["css", "legacy", "avoid-all"] },
  };
};

const DownloadPortfolioButton = ({
  label = "Download Portfolio",
  className = "",
}: {
  label?: string;
  className?: string;
}) => {
  const [loading, setLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState<QualityKey>("high");

  const cleanupPreview = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
  };

  const closePreview = () => {
    cleanupPreview();
    setPreviewOpen(false);
  };

  const generatePreview = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const target = document.getElementById("portfolio-root");
      if (!target) {
        toast.error("Could not find portfolio content");
        return;
      }
      const html2pdf = (await import("html2pdf.js")).default;
      const worker = html2pdf().set(buildPdfOptions(quality) as any).from(target);
      const pdf = await worker.toPdf().get("pdf");
      // Verify A4 portrait dimensions at runtime
      const [w, h] = pdf.internal.pageSize ? [pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight()] : [0, 0];
      const isA4Portrait = Math.round(w) === 210 && Math.round(h) === 297;
      if (!isA4Portrait) {
        console.warn(`PDF page size unexpected: ${w}x${h}mm (expected 210x297)`);
      }
      const blob: Blob = pdf.output("blob");
      const url = URL.createObjectURL(blob);
      cleanupPreview();
      setPreviewUrl(url);
      setPreviewOpen(true);
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate preview");
    } finally {
      setLoading(false);
    }
  };

  const confirmDownload = () => {
    if (!previewUrl) return;
    const a = document.createElement("a");
    a.href = previewUrl;
    a.download = "heather-greek-portfolio.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    toast.success("Portfolio downloaded");
    closePreview();
  };

  return (
    <>
      <button
        data-testid="download-portfolio-btn"
        onClick={generatePreview}
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
            className="bg-background text-foreground rounded-xl shadow-2xl w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <div>
                <h2 className="font-semibold text-base">Preview before download</h2>
                <p className="text-xs text-muted-foreground">
                  A4 portrait · {A4_MARGIN_MM}mm margins · {QUALITY_PRESETS[quality].label}
                </p>
              </div>
              <button
                onClick={closePreview}
                aria-label="Close preview"
                className="p-2 rounded-md hover:bg-muted"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 border-b border-border flex-wrap">
              <span className="text-xs text-muted-foreground mr-1">Quality:</span>
              {(Object.keys(QUALITY_PRESETS) as QualityKey[]).map((k) => (
                <button
                  key={k}
                  onClick={() => {
                    setQuality(k);
                    setTimeout(generatePreview, 0);
                  }}
                  className={`text-xs px-2 py-1 rounded-md border ${
                    quality === k
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border hover:bg-muted"
                  }`}
                >
                  {QUALITY_PRESETS[k].label}
                </button>
              ))}
            </div>

            <div className="flex-1 bg-muted/30">
              {previewUrl && (
                <iframe
                  title="PDF preview"
                  src={previewUrl}
                  className="w-full h-full"
                />
              )}
            </div>

            <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-border">
              <button
                onClick={closePreview}
                className="px-4 py-2 rounded-lg text-sm border border-border hover:bg-muted"
              >
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
                className="inline-flex items-center gap-2 bg-gradient-theme text-primary-foreground px-4 py-2 rounded-lg font-medium text-sm hover:opacity-90"
              >
                <Download size={14} /> Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DownloadPortfolioButton;
