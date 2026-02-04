"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import {
  SiSwift,
  SiFlutter,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiPython,
  SiFirebase,
  SiSupabase,
  SiVercel,
  SiCloudflare,
  SiGoogleanalytics,
  SiMixpanel,
  SiNotion,
  SiSlack,
  SiDotnet,
  SiJira,
  SiGithub,
  SiOpenai,
  SiApple,
} from "react-icons/si";
import { Gamepad2, Bot, Monitor, Smartphone, BarChart3, Activity, Plane } from "lucide-react";
import { IconType } from "react-icons";
import { LucideIcon } from "lucide-react";

type IconComponent = IconType | LucideIcon;

interface SkillItem {
  name: string;
  icon: IconComponent;
}

const skillCategories: Record<string, SkillItem[]> = {
  mobile: [
    { name: "iOS/Swift", icon: SiSwift },
    { name: "Objective-C", icon: SiApple },
    { name: "Flutter", icon: SiFlutter },
    { name: "React Native", icon: SiReact },
    { name: "Xamarin", icon: Smartphone },
  ],
  web: [
    { name: "React", icon: SiReact },
    { name: "Next.js", icon: SiNextdotjs },
    { name: "TypeScript", icon: SiTypescript },
  ],
  desktop: [
    { name: "C#", icon: SiDotnet },
    { name: "WPF", icon: Monitor },
    { name: "Cocos2d-x", icon: Gamepad2 },
  ],
  backend: [
    { name: "Node.js", icon: SiNodedotjs },
    { name: "Python", icon: SiPython },
    { name: "Firebase", icon: SiFirebase },
    { name: "Supabase", icon: SiSupabase },
    { name: "Vercel", icon: SiVercel },
    { name: "Cloudflare", icon: SiCloudflare },
  ],
  analytics: [
    { name: "Google Analytics", icon: SiGoogleanalytics },
    { name: "Mixpanel", icon: SiMixpanel },
    { name: "Amplitude", icon: BarChart3 },
    { name: "Datadog", icon: Activity },
    { name: "AppsFlyer", icon: Plane },
  ],
  tools: [
    { name: "JIRA", icon: SiJira },
    { name: "GitHub", icon: SiGithub },
    { name: "Notion", icon: SiNotion },
    { name: "Slack", icon: SiSlack },
    { name: "Claude Code", icon: Bot },
    { name: "Codex", icon: SiOpenai },
  ],
};

export default function About() {
  const { t } = useLanguage();

  const skills = [
    { category: t.about.skills.mobile, items: skillCategories.mobile },
    { category: t.about.skills.web, items: skillCategories.web },
    { category: t.about.skills.desktop, items: skillCategories.desktop },
    { category: t.about.skills.backend, items: skillCategories.backend },
    { category: t.about.skills.analytics, items: skillCategories.analytics },
    { category: t.about.skills.tools, items: skillCategories.tools },
  ];

  return (
    <section id="about" className="py-24 px-6 bg-primary/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            {/* Profile Image */}
            <div className="mb-8">
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-accent/20 shadow-lg shadow-accent/10">
                <Image
                  src="/images/profile.png"
                  alt="Sei Hee Han"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t.about.title}
            </h2>
            <div className="space-y-4 text-muted text-lg leading-relaxed">
              {t.about.description.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-8">{t.about.skillsTitle}</h3>
            <div className="space-y-6">
              {skills.map((skill) => (
                <div key={skill.category}>
                  <h4 className="text-accent font-medium mb-3">
                    {skill.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <span
                        key={item.name}
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary rounded-lg text-foreground/80 hover:bg-secondary hover:text-accent transition-all duration-200 cursor-default text-sm"
                      >
                        <item.icon className="w-4 h-4" />
                        {item.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
