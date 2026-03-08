"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative py-24 md:py-32 px-6 overflow-hidden">
      {/* Simple Background with Animation */}
      <div className="absolute inset-0 -z-10">
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

      </div>
    </section>
  );
}
