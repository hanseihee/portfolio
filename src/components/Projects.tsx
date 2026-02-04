"use client";

import { useLanguage } from "@/context/LanguageContext";
import { ArrowUpRight } from "lucide-react";

// Project image mapping - actual project images
const projectImages: Record<string, string> = {
  // Featured Projects
  "김프가 (KIMPGA)": "/images/kimpga.png", // Actual Kimpga OG image
  "Kimpga": "/images/kimpga.png",
  "F1-boxbox.com": "/images/f1-boxbox.png", // Actual F1 Boxbox logo
  "꾸쥬워마이걸": "/images/couple-diary.jpg", // Actual couple diary app screenshot
  "Ggujuwomygirl": "/images/couple-diary.jpg",
  "픽미주 (PICKMIJU)": "https://www.pickmiju.com/og-image.png", // Pickmiju OG image
  "Pickmiju": "https://www.pickmiju.com/og-image.png",
  "오구오구": "/images/oguogu.webp", // OguOgu server time app
  "OguOgu": "/images/oguogu.webp",

  // Work Projects
  "해외송금 앱 & AI 자동화": "/images/gme-remit.jpg", // GME Remittance app
  "Remittance App & AI Automation": "/images/gme-remit.jpg",
  "Esports.op.gg": "/images/esports-opgg.webp", // Actual OP.GG Esports app image
  "Duo.op.gg": "/images/duo-opgg.png", // Actual Duo.op.gg screenshot
  "Pal.op.gg": "/images/pal-opgg.png", // Actual Pal.op.gg screenshot
  "QWER.GG → OP.GG 매각": "/images/qwer-opgg.jpg", // OP.GG brand image
  "QWER.GG → Sold to OP.GG": "/images/qwer-opgg.jpg",
  "GOPAX 암호화폐 거래소": "https://www.gopax.co.kr/gopax-og.jpg", // Actual GOPAX image
  "GOPAX Crypto Exchange": "https://www.gopax.co.kr/gopax-og.jpg",
  "번개장터 iOS": "/images/bunjang.jpg", // Actual Bunjang app image
  "Bungaejangter iOS": "/images/bunjang.jpg",
  "빨대 - 쇼핑몰 관리 앱": "/images/shopping-mall-app.png", // Actual shopping mall app screenshot
  "Bbaldae - Shopping Mall Manager App": "/images/shopping-mall-app.png",
  "소셜 쇼핑플랫폼": "/images/pikicast.jpg", // Actual Pikicast logo
  "Social Shopping Platform": "/images/pikicast.jpg",
  "KBS 스토리지 시스템": "/images/kbs-storage.jpg",
  "KBS Storage System": "/images/kbs-storage.jpg",
  "히어로즈 오브 엠파이어": "/images/heroes-of-empire.jpg", // Actual Heroes of Empire game image
  "Heroes of Empire": "/images/heroes-of-empire.jpg",
  "Microsoft Surface 광고 플랫폼": "/images/ms-surface.webp", // Actual Microsoft Surface table photo
  "Microsoft Surface Ad Platform": "/images/ms-surface.webp",
  "B2B 메신저": "/images/b2b-messenger.png", // Actual NEXUSCUBE Messenger screenshot
  "B2B Messenger": "/images/b2b-messenger.png",
};

// Helper function to get project image
const getProjectImage = (projectName: string): string => {
  return projectImages[projectName] || `https://picsum.photos/seed/${projectName.replace(/\s/g, '')}/800/600`;
};

export default function Projects() {
  const { t } = useLanguage();

  // Group work items by year
  const workItemsByYear = t.projects.workItems.reduce((acc, item) => {
    const year = item.period.split(" ")[0];
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(item);
    return acc;
  }, {} as Record<string, typeof t.projects.workItems>);

  const years = Object.keys(workItemsByYear).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-16">
          <div>
            <span className="text-accent text-sm font-medium tracking-wider uppercase mb-2 block">
              Portfolio
            </span>
            <h2 className="text-4xl md:text-5xl font-bold">{t.projects.title}</h2>
          </div>
        </div>

        {/* Featured Projects */}
        <div className="mb-24">
          <h3 className="text-xl font-semibold text-foreground mb-8 flex items-center gap-3">
            <span className="w-8 h-px bg-accent"></span>
            {t.projects.featured}
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {t.projects.featuredItems.map((project, index) => (
              <div
                key={index}
                className="group relative bg-primary rounded-2xl overflow-hidden border border-secondary hover:border-accent/50 transition-all duration-300"
              >
                {/* Image */}
                <div className="aspect-[4/3] relative overflow-hidden">
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-accent/20 via-accent/10 to-transparent"
                    style={{
                      backgroundImage: `url('${getProjectImage(project.name)}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />

                  {/* Metric Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1.5 bg-accent/90 text-background text-xs font-bold rounded-full backdrop-blur-sm">
                      {project.metric}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 -mt-12 relative">
                  <h4 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                    {project.name}
                  </h4>
                  <p className="text-muted text-sm leading-relaxed mb-4 whitespace-pre-line">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-background/50 rounded text-xs text-foreground/60 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Link */}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-accent text-sm font-medium hover:underline"
                    >
                      Visit
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Work Projects - Year-based Timeline */}
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-12 flex items-center gap-3">
            <span className="w-8 h-px bg-accent"></span>
            {t.projects.work}
          </h3>

          <div className="space-y-16">
            {years.map((year) => (
              <div key={year} className="relative">
                {/* Year Header */}
                <div className="flex items-start gap-8 mb-8">
                  <div className="sticky top-24 flex-shrink-0">
                    <div className="relative">
                      <span className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-accent to-accent/20">
                        {year}
                      </span>
                      <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-accent to-transparent rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Projects for this year */}
                <div className="grid gap-8 md:pl-4">
                  {workItemsByYear[year].map((project, index) => (
                    <div
                      key={index}
                      className="group relative bg-primary rounded-3xl overflow-hidden border border-secondary hover:border-accent/50 transition-all duration-500"
                    >
                      <div className="flex flex-col lg:flex-row">
                        {/* Image Section */}
                        <div className="lg:w-2/5 relative">
                          <div className="aspect-[16/10] lg:aspect-auto lg:absolute lg:inset-0">
                            <div
                              className="absolute inset-0"
                              style={{
                                backgroundImage: `url('${getProjectImage(project.name)}')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                              }}
                            />
                            {/* Overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-primary lg:bg-gradient-to-r lg:from-transparent lg:via-primary/50 lg:to-primary" />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent lg:hidden" />

                            {/* Company Badge */}
                            <div className="absolute top-4 left-4">
                              <span className="px-4 py-2 bg-background/80 backdrop-blur-md text-foreground text-sm font-semibold rounded-full border border-secondary">
                                {project.company}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Content Section */}
                        <div className="lg:w-3/5 p-8 lg:p-10 flex flex-col justify-center">
                          {/* Period */}
                          <span className="text-accent text-sm font-medium mb-2">
                            {project.period}
                          </span>

                          {/* Title */}
                          <h4 className="text-2xl lg:text-3xl font-bold mb-4 group-hover:text-accent transition-colors">
                            {project.name}
                          </h4>

                          {/* Description */}
                          <p className="text-muted leading-relaxed mb-6 whitespace-pre-line">
                            {project.description}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-4 py-1.5 bg-accent/10 border border-accent/20 rounded-full text-sm text-accent font-medium"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Link */}
                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-accent text-sm font-medium hover:underline"
                            >
                              Visit
                              <ArrowUpRight className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
