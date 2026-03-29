"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Download, Loader2 } from "lucide-react";

export default function Hero() {
  const { t, locale } = useLanguage();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPDF = async () => {
    if (isGenerating) return;
    setIsGenerating(true);

    try {
      // Let React render the "생성 중..." state first
      await new Promise((r) => setTimeout(r, 50));

      const html2canvas = (await import("html2canvas-pro")).default;
      const { jsPDF } = await import("jspdf");

      const mainEl = document.querySelector("main")!;
      const header = document.querySelector("header") as HTMLElement | null;
      const downloadBtn = document.getElementById("pdf-download-btn");

      // Hide elements not needed in PDF
      if (header) header.style.display = "none";
      if (downloadBtn) downloadBtn.style.display = "none";

      // Fix 0: Hide hero background glows
      const heroBg = document.getElementById("hero-bg");
      if (heroBg) heroBg.style.display = "none";

      // Fix 1: Force all fadeIn animations to complete
      const animated = mainEl.querySelectorAll(".animate-fadeIn");
      animated.forEach((el) => {
        (el as HTMLElement).style.animationDelay = "0s";
        (el as HTMLElement).style.animationDuration = "0s";
        (el as HTMLElement).style.opacity = "1";
      });

      // Fix 2: Replace gradient text (bg-clip-text) with solid color
      const gradientTexts = mainEl.querySelectorAll(".bg-clip-text");
      const gradientOriginals: { el: HTMLElement; styles: Record<string, string> }[] = [];
      gradientTexts.forEach((el) => {
        const htmlEl = el as HTMLElement;
        gradientOriginals.push({
          el: htmlEl,
          styles: {
            backgroundImage: htmlEl.style.backgroundImage,
            backgroundClip: htmlEl.style.backgroundClip,
            webkitBackgroundClip: htmlEl.style.getPropertyValue("-webkit-background-clip"),
            webkitTextFillColor: htmlEl.style.getPropertyValue("-webkit-text-fill-color"),
            color: htmlEl.style.color,
          },
        });
        htmlEl.style.backgroundImage = "none";
        htmlEl.style.backgroundClip = "unset";
        htmlEl.style.setProperty("-webkit-background-clip", "unset");
        htmlEl.style.setProperty("-webkit-text-fill-color", "unset");
        htmlEl.style.color = "#22C55E";
      });

      const body = document.body;
      const originalOverflow = body.style.overflow;
      body.style.overflow = "visible";

      // Scroll to top for consistent capture
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 100));

      const canvas = await html2canvas(mainEl, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#0F172A",
        windowWidth: 1280,
      });

      // Restore all styles
      body.style.overflow = originalOverflow;
      if (header) header.style.display = "";
      if (downloadBtn) downloadBtn.style.display = "";
      if (heroBg) heroBg.style.display = "";
      animated.forEach((el) => {
        (el as HTMLElement).style.animationDelay = "";
        (el as HTMLElement).style.animationDuration = "";
        (el as HTMLElement).style.opacity = "";
      });
      gradientOriginals.forEach(({ el, styles }) => {
        el.style.backgroundImage = styles.backgroundImage;
        el.style.backgroundClip = styles.backgroundClip;
        el.style.setProperty("-webkit-background-clip", styles.webkitBackgroundClip);
        el.style.setProperty("-webkit-text-fill-color", styles.webkitTextFillColor);
        el.style.color = styles.color;
      });

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pdf = new jsPDF("p", "mm", "a4");
      const pageHeight = 297;

      let position = 0;
      let remainingHeight = imgHeight;

      while (remainingHeight > 0) {
        if (position > 0) pdf.addPage();

        pdf.addImage(
          canvas.toDataURL("image/jpeg", 0.95),
          "JPEG",
          0,
          -position,
          imgWidth,
          imgHeight
        );

        position += pageHeight;
        remainingHeight -= pageHeight;
      }

      const fileName = locale === "ko"
        ? `한세희_포트폴리오.pdf`
        : `SeiHeeHan_Portfolio.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="relative py-24 md:py-32 px-6 overflow-hidden">
      {/* Simple Background with Animation */}
      <div id="hero-bg" className="absolute inset-0 -z-10">
        {/* Animated gradient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] animate-pulse"
          style={{ animationDuration: '4s' }}
        />

        {/* Secondary subtle glow */}
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[100px] animate-pulse"
          style={{ animationDuration: '6s', animationDelay: '2s' }}
        />

        {/* Bottom fade for section transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative">
        {/* Badge with fade-in */}
        <div className="mb-6 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium border border-accent/20">
            {t.hero.available}
          </span>
        </div>

        {/* Name with fade-in */}
        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-4 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
          {t.hero.greeting}{" "}
          <span className="text-accent">{t.hero.name}</span>
        </h1>

        {/* Intro with fade-in */}
        <p className="text-2xl md:text-4xl font-bold text-foreground/60 mb-6 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
          {t.hero.intro}
        </p>

        {/* Description with fade-in */}
        <p className="text-lg md:text-xl text-muted mb-10 max-w-2xl mx-auto leading-relaxed animate-fadeIn" style={{ animationDelay: '0.8s' }}>
          {t.hero.description}
        </p>

        {/* PDF Download Button */}
        <div className="animate-fadeIn" style={{ animationDelay: '1s' }}>
          <button
            id="pdf-download-btn"
            onClick={handleDownloadPDF}
            disabled={isGenerating}
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-background font-semibold rounded-full hover:bg-accent/90 transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {locale === "ko" ? "생성 중..." : "Generating..."}
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                {locale === "ko" ? "포트폴리오 다운로드" : "Download Portfolio"}
              </>
            )}
          </button>
        </div>

      </div>
    </section>
  );
}
