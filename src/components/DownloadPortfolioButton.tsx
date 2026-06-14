import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";

const DownloadPortfolioButton = ({
  label = "Download Portfolio",
  className = "",
}: {
  label?: string;
  className?: string;
}) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const target = document.getElementById("portfolio-root");
      if (!target) {
        toast.error("Could not find portfolio content");
        return;
      }
      const html2pdf = (await import("html2pdf.js")).default;
      await html2pdf()
        .set({
          margin: 0,
          filename: "heather-greek-portfolio.pdf",
          image: { type: "jpeg", quality: 0.95 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            backgroundColor: getComputedStyle(document.body).backgroundColor || "#ffffff",
            windowWidth: target.scrollWidth,
          },
          jsPDF: { unit: "px", format: [target.scrollWidth, target.scrollHeight], orientation: "portrait" },
          pagebreak: { mode: ["css", "legacy"] },
        } as any)
        .from(target)
        .save();
      toast.success("Portfolio downloaded");
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate PDF");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className={`inline-flex items-center gap-2 bg-gradient-theme text-primary-foreground px-4 py-2 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-60 ${className}`}
    >
      {loading ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
      {loading ? "Generating..." : label}
    </button>
  );
};

export default DownloadPortfolioButton;
