"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Mail, Github, Linkedin, Twitter } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/hanseihee", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
];

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          {t.contact.title}
        </h2>
        <p className="text-muted text-lg mb-12 max-w-2xl mx-auto whitespace-pre-line">
          {t.contact.description}
        </p>
        <a
          href="mailto:realmasse@gmail.com"
          className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-background font-semibold rounded-xl hover:bg-accent/90 transition-all duration-200 cursor-pointer hover:scale-105 mb-12"
        >
          <Mail className="w-5 h-5" />
          realmasse@gmail.com
        </a>
{/* SNS links hidden
        <div className="flex justify-center gap-6">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="p-4 bg-primary rounded-xl text-foreground/60 hover:bg-secondary hover:text-accent transition-all duration-200 cursor-pointer"
            >
              <social.icon className="w-6 h-6" />
            </a>
          ))}
        </div>
*/}
      </div>
    </section>
  );
}
