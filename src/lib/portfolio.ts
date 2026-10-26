import { translations, type Locale } from "./i18n";

export type ProjectCategory = "independent" | "product" | "engineering";
export type Project = {
  id: string;
  name: string;
  description: string;
  tags: string[];
  link?: string;
  category: ProjectCategory;
  company: string;
  period: string;
  role: string;
  metric: string;
  image?: string;
  color: string;
};

const personal = [
  {
    id: "kimpga",
    period: "EXIT · 2022",
    image: "kimpga.png",
    color: "#d6e4bc",
  },
  { id: "f1", period: "Independent", image: "f1-boxbox.png", color: "#f26b4f" },
  { id: "meme", period: "2013", image: "couple-diary.jpg", color: "#edcfea" },
  {
    id: "pickmiju",
    period: "Independent",
    image: "pickmiju.png",
    color: "#c1d6fb",
  },
  {
    id: "oguogu",
    period: "Independent",
    image: "oguogu.webp",
    color: "#f3d48a",
  },
  {
    id: "ulmazip",
    period: "Independent",
    image: "ulmazip.png",
    color: "#cce6d5",
  },
  {
    id: "english",
    period: "Independent",
    image: "youngohaja.png",
    color: "#e3d6f4",
  },
];

const work = [
  { id: "gme", image: "gme-remit.jpg", color: "#c2e2de" },
  { id: "esports", image: "esports-opgg.webp", color: "#b9c9f2" },
  { id: "duo", image: "duo-opgg.png", color: "#d3c6ed" },
  { id: "pal", image: "pal-opgg.png", color: "#d2e4b8" },
  { id: "qwer", image: "qwer-opgg.jpg", color: "#d6c6e7" },
  { id: "gopax", image: "gopax.jpg", color: "#c1d4f0" },
  { id: "bunjang", image: "bunjang.jpg", color: "#f2c1b6" },
  { id: "commerce", image: "shopping-mall-app.png", color: "#c8dfd5" },
  { id: "pikicast", image: "pikicast.jpg", color: "#f0dbac" },
  { id: "kbs", image: "kbs-storage.jpg", color: "#cbd6df" },
  { id: "heroes", image: "heroes-of-empire.jpg", color: "#dfd5b7" },
  { id: "surface", image: "ms-surface.webp", color: "#b9d6e0" },
  { id: "messenger", image: "b2b-messenger.png", color: "#d5d9ce" },
];

export function getProjects(locale: Locale): Project[] {
  const t = translations[locale];
  return [
    ...t.projects.featuredItems.map((project, index) => ({
      ...project,
      ...personal[index],
      category: "independent" as const,
      company: locale === "ko" ? "개인 프로젝트" : "Independent",
      role:
        locale === "ko" ? "기획 · 개발 · 운영" : "Concept · Build · Operate",
    })),
    ...t.projects.workItems.map((project, index) => ({
      ...project,
      ...work[index],
      category: (index < 6 ? "product" : "engineering") as ProjectCategory,
      metric: project.tags.slice(0, 2).join(" · "),
    })),
  ];
}

export const featuredIds = ["esports", "kimpga", "f1"] as const;
export const isFeatured = (id: string) =>
  (featuredIds as readonly string[]).includes(id);
export const featuredTaglines: Record<string, [ko: string, en: string]> = {
  esports: ["게임을 보는 새로운 방법", "A new way to experience esports"],
  kimpga: ["가격 차이에서 발견한 기회", "Opportunity in the difference"],
  f1: ["팬의 호기심이 만든 레이스", "Built by curiosity. Driven by fans."],
};

// Official wordmarks, newest first. `height` is tuned per logo so that heavy
// and light marks read at the same visual weight.
export const companies = [
  { name: "SPOTV", logo: "spotv.png", ratio: 2.877, height: 27 },
  { name: "GME", logo: "gme.png", ratio: 3.254, height: 30 },
  { name: "OP.GG", logo: "opgg.svg", ratio: 4.125, height: 21 },
  { name: "GOPAX", logo: "gopax.svg", ratio: 4.25, height: 23 },
  { name: "번개장터", logo: "bunjang.svg", ratio: 4.686, height: 25 },
  { name: "d'strict", logo: "dstrict.png", ratio: 4.063, height: 22 },
];

export const contact = {
  email: "realmasse@gmail.com",
  github: "https://github.com/hanseihee",
};

export const eras = [
  {
    years: "2008 — 2014",
    title: "The maker.",
    ko: "직접 만들며 배운 것들",
    en: "Learning by building.",
    koText:
      "실시간 메신저부터 멀티터치 테이블, 모바일 게임까지. 아이디어가 실제로 작동하는 순간을 만드는 개발자로 시작했습니다.",
    enText:
      "From real-time messengers to multitouch tables and mobile games. I started by making ideas actually work.",
    stack: ["C# / WPF", "Cocos2d-x", "Real-time systems"],
    ids: ["messenger", "surface", "heroes", "meme"],
  },
  {
    years: "2014 — 2019",
    title: "The bridge.",
    ko: "기술과 사용자를 연결하다",
    en: "Connecting code and people.",
    koText:
      "KBS 방송 시스템, 번개장터 iOS, GOPAX. 만드는 방법에 대한 이해를 바탕으로 무엇을, 왜 만들어야 하는지 고민하기 시작했습니다.",
    enText:
      "KBS, Bungaejangter, and GOPAX. Knowing how to build led me to a bigger question: what should we build, and why?",
    stack: ["iOS / macOS", "Product strategy", "Fintech"],
    ids: ["kbs", "bunjang", "gopax"],
  },
  {
    years: "2020 — 2025",
    title: "The multiplier.",
    ko: "아이디어를 성장하는 제품으로",
    en: "Turning an idea into impact.",
    koText:
      "QWER.GG에서 OP.GG로 이어지는 여정. e스포츠와 듀오 매칭 서비스를 이끌고, 개인 프로젝트 김프가의 성장과 매각을 경험했습니다.",
    enText:
      "From QWER.GG to OP.GG. Leading esports and matching products, while independently building, growing, and selling Kimpga.",
    stack: ["Product leadership", "Growth", "Entrepreneurship"],
    ids: ["esports", "duo", "qwer", "kimpga"],
  },
  {
    years: "2025 — NOW",
    title: "Still curious.",
    ko: "다음 가능성을 만드는 중",
    en: "Always building what comes next.",
    koText:
      "글로벌머니익스프레스에서 해외송금 모바일팀을 이끌며 AI 자동화를 만듭니다. 금융, 스포츠, 교육에서 새로운 제품 실험도 계속합니다.",
    enText:
      "Leading the remittance mobile team at GME and building AI automation. Still experimenting across finance, sports, and education.",
    stack: ["AI automation", "Next.js", "Swift"],
    ids: ["gme", "f1", "pickmiju", "english"],
  },
];
