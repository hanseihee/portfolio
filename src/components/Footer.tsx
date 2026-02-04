"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-6 border-t border-primary">
      <div className="max-w-6xl mx-auto flex items-center justify-center">
        <p className="text-muted text-sm">
          &copy; {currentYear} Sei Hee Han. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
