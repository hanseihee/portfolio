"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Code2,
  Copy,
  Download,
  Github,
  Grid2X2,
  List,
  LoaderCircle,
  Mail,
  Minus,
  Pause,
  Play,
  Plus,
  Search,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import {
  companies,
  contact,
  eras,
  featuredIds,
  featuredTaglines,
  getProjects,
  isFeatured,
  type Project,
  type ProjectCategory,
} from "@/lib/portfolio";
import CountUp from "./CountUp";
import ProjectMedia from "./ProjectMedia";
import SplitText from "./SplitText";
import { ProjectDialog, SearchDialog } from "./PortfolioDialogs";

let fallbackMotion: boolean | null = null;

function subscribeMotion(callback: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  window.addEventListener("portfolio-motion", callback);
  window.addEventListener("storage", callback);
  return () => {
    media.removeEventListener("change", callback);
    window.removeEventListener("portfolio-motion", callback);
    window.removeEventListener("storage", callback);
  };
}
function motionSnapshot(): boolean | null {
  try {
    const saved = localStorage.getItem("portfolio-motion");
    if (saved) return saved === "reduced";
  } catch {
    /* Storage can be disabled. */
  }
  return (
    fallbackMotion ??
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
// Unknown on the server: the inline script in layout.tsx already set
// <html data-motion>, so the first client render must not overwrite it.
const motionServerSnapshot = () => null;

const heroShots = ["kimpga", "esports", "f1"];
// One shot per counter, in counter order (each sits beside its number).
// Shots share a 16:10 frame; `focus` keeps each image's key area in view.
const glanceShots = [
  { image: "bunjang.jpg", focus: "50% 50%" }, // 17+ years building
  { image: "esports-opgg.webp", focus: "50% 40%" }, // 20+ products shipped
  { image: "kimpga.png", focus: "50% 50%" }, // 2 exits
  { image: "couple-diary.jpg", focus: "50% 50%" }, // #1 on both app stores
];
const tickerWords = [
  "Product strategy",
  "iOS & Android",
  "Growth",
  "Fintech",
  "Esports",
  "AI automation",
  "Next.js",
  "Swift",
];
const principles = [
  {
    word: "Think",
    icon: Code2,
    label: "01 / THINK IN SYSTEMS",
    ko: ["깊이 이해하고", "구현을 알아야 더 나은 질문을 할 수 있습니다."],
    en: [
      "Understand deeply.",
      "Understanding how things work leads to better questions.",
    ],
  },
  {
    word: "People",
    icon: Search,
    label: "02 / STAY CLOSE TO PEOPLE",
    ko: ["사람에서 출발하고", "지표 너머, 실제로 쓰는 사람의 맥락을 봅니다."],
    en: [
      "Start with people.",
      "Behind every metric is a person with a real context.",
    ],
  },
  {
    word: "Make",
    icon: Sparkles,
    label: "03 / NEVER STOP MAKING",
    ko: ["직접 만들어 검증합니다", "가장 좋은 아이디어는 실행하며 발견합니다."],
    en: ["Make it real.", "The best ideas often show up in the making."],
  },
];

function SectionIndex({ number, label }: { number: string; label: string }) {
  return (
    <div className="section-index" data-reveal="line">
      <span className="section-index-number">{number}</span>
      <span className="section-index-line" aria-hidden="true" />
      <span className="section-index-label">{label}</span>
    </div>
  );
}

const delay = (seconds: number) =>
  ({ "--delay": `${seconds}s` }) as CSSProperties;

export default function Portfolio() {
  const { locale, setLocale } = useLanguage();
  const ko = locale === "ko";
  const projects = useMemo(() => getProjects(locale), [locale]);
  const orderedProjects = useMemo(
    () => [
      ...featuredIds.map((id) => projects.find((project) => project.id === id)!),
      ...projects.filter((project) => !isFeatured(project.id)),
    ],
    [projects],
  );
  const [projectId, setProjectId] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [category, setCategory] = useState<ProjectCategory | "all">("all");
  const [view, setView] = useState<"list" | "grid">("list");
  const [expanded, setExpanded] = useState(true);
  const [era, setEra] = useState(2);
  const [activeSection, setActiveSection] = useState("home");
  const [clock, setClock] = useState("--:--:-- KST");
  const [toast, setToast] = useState("");
  const [exporting, setExporting] = useState(false);
  const resumeRef = useRef<HTMLElement>(null);
  const revealObserver = useRef<IntersectionObserver | null>(null);
  const motionPreference = useSyncExternalStore(
    subscribeMotion,
    motionSnapshot,
    motionServerSnapshot,
  );
  const reducedMotion = motionPreference !== false;
  const closeProject = useCallback(() => setProjectId(null), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);
  const openProject = useCallback((id: string) => setProjectId(id), []);

  useEffect(() => {
    if (motionPreference === null) return;
    document.documentElement.dataset.motion = motionPreference
      ? "reduced"
      : "full";
  }, [motionPreference]);
  useEffect(() => {
    const timer = window.setInterval(
      () =>
        setClock(
          new Intl.DateTimeFormat("en-GB", {
            timeZone: "Asia/Seoul",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          }).format(new Date()) + " KST",
        ),
      1000,
    );
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen((value) => !value);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    // `data-shown` is written outside React so re-renders never reset it.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).dataset.shown = "";
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
    );
    revealObserver.current = observer;
    const sectionObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }),
      { rootMargin: "-15% 0px -55% 0px" },
    );
    document
      .querySelectorAll("main > section[id]")
      .forEach((element) => sectionObserver.observe(element));
    return () => {
      observer.disconnect();
      sectionObserver.disconnect();
    };
  }, []);
  // Filtering and layout changes mount new cards; observe them as they appear.
  const revealKey = `${locale}|${category}|${view}|${expanded}`;
  useEffect(() => {
    document
      .querySelectorAll("[data-reveal]:not([data-shown])")
      .forEach((element) => revealObserver.current?.observe(element));
  }, [revealKey]);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 4000);
    return () => clearTimeout(timer);
  }, [toast]);
  useEffect(() => {
    if (!projectId && !searchOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [projectId, searchOpen]);
  const toggleMotion = () => {
    fallbackMotion = !reducedMotion;
    try {
      localStorage.setItem(
        "portfolio-motion",
        reducedMotion ? "full" : "reduced",
      );
    } catch {
      /* Keep the control functional without persistent storage. */
    }
    window.dispatchEvent(new Event("portfolio-motion"));
  };
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setToast(ko ? "이메일 주소를 복사했습니다." : "Email address copied.");
    } catch {
      setToast(contact.email);
    }
  };
  const downloadResume = async () => {
    if (!resumeRef.current || exporting) return;
    setExporting(true);
    try {
      const { exportResume } = await import("@/lib/export-resume");
      await exportResume(
        resumeRef.current,
        `Sei-Hee-Han-Portfolio-${locale}.pdf`,
      );
      setToast(
        ko ? "포트폴리오 PDF를 저장했습니다." : "Portfolio PDF downloaded.",
      );
    } catch {
      setToast(
        ko
          ? "PDF 생성에 실패했습니다. 잠시 후 다시 시도해주세요."
          : "Could not export PDF. Please try again.",
      );
    } finally {
      setExporting(false);
    }
  };
  // Featured projects lead every view; "all" + grid stacks them as a showcase.
  const filtered = orderedProjects.filter(
    (project) => category === "all" || project.category === category,
  );
  const curated = category === "all" && view === "grid";
  const limit = category === "all" ? 9 : 6;
  const shown = expanded ? filtered : filtered.slice(0, limit);
  const stacked = curated ? shown.filter((p) => isFeatured(p.id)) : [];
  const cards = curated ? shown.filter((p) => !isFeatured(p.id)) : shown;
  const activeEra = eras[era];
  const currentProject =
    projects.find((project) => project.id === projectId) ?? null;
  const stats = [
    {
      value: 17,
      suffix: "+",
      label: ko ? "개발 9년 + 프로덕트 8년" : "Years building · 9 eng + 8 product",
    },
    { value: 20, suffix: "+", label: ko ? "직접 만든 제품" : "Products shipped" },
    { value: 2, label: ko ? "매각 경험" : "Exits" },
    {
      value: 1,
      prefix: ko ? undefined : "#",
      suffix: ko ? "위" : undefined,
      label: ko ? "양대 앱마켓" : "On both app stores",
    },
  ];

  const renderProject = (project: Project, index: number, isStack: boolean) => {
    const featured = isFeatured(project.id);
    return (
      <button
        key={project.id}
        className={`archive-project ${featured ? `is-featured featured-${project.id}` : ""}`}
        onClick={() => openProject(project.id)}
        data-reveal
        style={delay(isStack ? 0 : (index % 3) * 0.08)}
      >
        {isStack && (
          <span className="stack-flank" aria-hidden="true">
            <span>Featured</span>
            <span>Work</span>
          </span>
        )}
        <span className="archive-media">
          <ProjectMedia
            project={project}
            sizes={
              view === "list"
                ? "160px"
                : isStack
                  ? "(max-width: 900px) 100vw, 420px"
                  : "(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
            }
          />
          {featured && (
            <span className="featured-badge">
              {ko ? "대표 프로젝트" : "FEATURED"}
            </span>
          )}
        </span>
        <span className="archive-content">
          <span className="archive-meta">
            <span className="archive-period">{project.period}</span>
            <span className="archive-company">{project.company}</span>
          </span>
          <span className="archive-name">
            <strong>{project.name}</strong>
          </span>
          <span className="archive-description">
            {featured
              ? featuredTaglines[project.id][ko ? 0 : 1]
              : project.description.split("\n")[0].replace(/^•\s*/, "")}
          </span>
          {isStack && (
            <span className="stack-facts">
              <span>
                <em>{ko ? "역할" : "Role"}</em>
                {project.role}
              </span>
              <span>
                <em>{ko ? "성과" : "Outcome"}</em>
                {project.metric}
              </span>
            </span>
          )}
          <span className="archive-card-bottom">
            {isStack ? (
              <span className="stack-cta">
                {ko ? "자세히 보기" : "View project"}
                <span className="button-icon">
                  <ArrowRight size={17} />
                </span>
              </span>
            ) : (
              <span className="archive-outcome">{project.metric}</span>
            )}
            {isStack ? (
              <span className="stack-number" aria-hidden="true">
                0{index + 1}
              </span>
            ) : (
              <span className="archive-open">
                <ArrowUpRight size={20} />
              </span>
            )}
          </span>
        </span>
      </button>
    );
  };

  return (
    <div
      className={`portfolio ${reducedMotion ? "motion-reduced" : "motion-full"}`}
    >
      <a className="skip-link" href="#work">
        {ko ? "프로젝트로 바로가기" : "Skip to projects"}
      </a>
      <div className="scroll-progress" aria-hidden="true" />
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Sei Hee Han home">
          <span className="brand-mark" aria-hidden="true">
            ✳
          </span>
          <span className="brand-name">Sei Hee Han</span>
        </a>
        <nav
          className="main-nav"
          aria-label={ko ? "주 메뉴" : "Main navigation"}
        >
          {[
            { id: "work", en: "Work", kr: "프로젝트" },
            { id: "about", en: "About", kr: "소개" },
            { id: "contact", en: "Contact", kr: "연락하기" },
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={activeSection === item.id ? "is-active" : ""}
            >
              <span className="nav-dot" />
              {ko ? item.kr : item.en}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="search-trigger"
            onClick={() => setSearchOpen(true)}
            aria-label={
              ko ? "프로젝트 검색 (Ctrl K)" : "Search projects (Ctrl K)"
            }
          >
            <Search size={18} />
          </button>
          <a className="header-mail" href={`mailto:${contact.email}`}>
            <span className="header-mail-icon">
              <Mail size={16} />
            </span>
            {contact.email}
          </a>
          <button
            className="language-toggle"
            onClick={() => setLocale(ko ? "en" : "ko")}
            aria-label={ko ? "Switch to English" : "한국어로 전환"}
          >
            <span className={ko ? "selected" : ""}>KR</span>
            <span aria-hidden="true">/</span>
            <span className={!ko ? "selected" : ""}>EN</span>
          </button>
        </div>
      </header>
      <main>
        <section id="home" className="hero">
          <div className="hero-glow" aria-hidden="true" />
          <div className="section-shell hero-inner">
            <div className="hero-top">
              <div className="hero-copy">
                <p className="hero-intro">
                  <span className="hero-anim" style={delay(0.05)}>
                    Developer’s mind.
                  </span>
                  <span className="hero-anim" style={delay(0.15)}>
                    Product’s heart.
                    <i className="hero-intro-line" aria-hidden="true" />
                  </span>
                </p>
                <h1 className="hero-title">
                  <SplitText lines={["Ideas", "into impact."]} accentLast />
                </h1>
              </div>
              <aside
                className="profile-card hero-anim hero-anim-card"
                style={delay(0.7)}
                aria-label={ko ? "프로필 요약" : "Profile at a glance"}
              >
                <div className="profile-top">
                  <span className="availability">
                    <i />
                    NOW
                  </span>
                  <span className="local-time">SEOUL · {clock}</span>
                </div>
                <div className="profile-now">
                  <strong>SPOTV</strong>
                  <p>
                    {ko
                      ? "지금은 SPOTV에서 제품을 만듭니다."
                      : "Currently building products at SPOTV."}
                  </p>
                </div>
                <div className="profile-career">
                  <div className="career-years" aria-hidden="true">
                    <span>2008</span>
                    <span>2017</span>
                    <span>NOW</span>
                  </div>
                  <div className="career-bar" aria-hidden="true">
                    <span className="career-dev" />
                    <span className="career-pm" />
                  </div>
                  <div className="career-labels">
                    <span>
                      <i className="career-dev" />
                      {ko ? "개발 9년" : "9 yrs engineering"}
                    </span>
                    <span>
                      <i className="career-pm" />
                      {ko ? "프로덕트 8년" : "8 yrs product"}
                    </span>
                  </div>
                </div>
              </aside>
            </div>
            <div className="section-index hero-index">
              <span className="section-index-number">001</span>
              <span className="section-index-line" aria-hidden="true" />
              <span className="section-index-label">What I do</span>
            </div>
            <div className="hero-bottom">
              <div className="hero-social hero-anim" style={delay(1)}>
                <span>Find me:</span>
                <div>
                  <a
                    href={contact.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                  >
                    <Github size={18} />
                  </a>
                  <a href={`mailto:${contact.email}`} aria-label="Email">
                    <Mail size={18} />
                  </a>
                  <button
                    onClick={copyEmail}
                    aria-label={ko ? "이메일 주소 복사" : "Copy email address"}
                  >
                    <Copy size={17} />
                  </button>
                </div>
              </div>
              <a
                className="button hero-anim"
                style={delay(1.1)}
                href="#work"
              >
                {ko ? "만들어온 것들" : "Explore my work"}
                <span className="button-icon">
                  <ArrowRight size={18} />
                </span>
              </a>
              <div className="hero-description hero-anim" style={delay(1.2)}>
                <p>
                  {ko
                    ? "기술을 이해하고, 사람을 위한 제품을 만듭니다."
                    : "I connect the dots between code, people, and possibility."}
                </p>
                <p className="hero-subtext">
                  {ko
                    ? "안녕하세요, 개발자 출신 프로덕트 매니저 한세희입니다."
                    : "Hi, I’m Sei Hee. Developer turned product manager."}
                </p>
              </div>
            </div>
            <div className="hero-gallery">
              {heroShots.map((id, index) => {
                const project = projects.find((item) => item.id === id)!;
                return (
                  <button
                    key={id}
                    className={`hero-shot hero-shot-${index + 1}`}
                    onClick={() => openProject(id)}
                    aria-label={
                      ko ? `${project.name} 열어보기` : `Open ${project.name}`
                    }
                  >
                    <span className="hero-shot-frame">
                      <Image
                        src={`/images/${project.image}`}
                        alt=""
                        fill
                        priority={index === 1}
                        sizes="(max-width: 700px) 45vw, 360px"
                      />
                    </span>
                    <span className="hero-shot-label">{project.name}</span>
                  </button>
                );
              })}
              <a
                className="hero-badge"
                href="#work"
                aria-label={ko ? "작업물 보러 가기" : "Scroll to the work"}
              >
                <svg viewBox="0 0 200 200" aria-hidden="true">
                  <defs>
                    <path
                      id="hero-badge-circle"
                      d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0"
                    />
                  </defs>
                  <text>
                    <textPath href="#hero-badge-circle">
                      DEVELOPER’S MIND ✳ PRODUCT’S HEART ✳ SINCE 2008 ✳
                    </textPath>
                  </text>
                </svg>
                <span className="hero-badge-core">
                  <ArrowDownRight size={30} />
                </span>
              </a>
            </div>
          </div>
        </section>
        <div className="ticker" aria-hidden="true">
          <div className="ticker-band">
            <div className="ticker-track">
              {[0, 1].map((copy) => (
                <span key={copy} className="ticker-group">
                  {tickerWords.map((word) => (
                    <span key={word}>
                      {word}
                      <i>✳</i>
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </div>
        <section id="glance" className="glance-section">
          <div className="section-shell">
            <SectionIndex number="02" label="At a glance" />
            <h2 className="display-heading glance-heading" data-reveal="split">
              <SplitText
                lines={["From a small observation", "to millions of lives."]}
              />
            </h2>
            <div className="glance-body">
              {glanceShots.map(({ image, focus }, index) => (
                <span
                  key={image}
                  className={`glance-shot glance-shot-${index + 1}`}
                  data-reveal={index % 2 ? "right" : "left"}
                  style={{ "--shot-focus": focus } as CSSProperties}
                  aria-hidden="true"
                >
                  <span className="glance-shot-inner">
                    <Image src={`/images/${image}`} alt="" fill sizes="300px" />
                  </span>
                </span>
              ))}
              <dl className="counter-grid">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className="counter"
                    data-reveal
                    style={delay(index * 0.12)}
                  >
                    <dt>{stat.label}</dt>
                    <dd>
                      {stat.prefix && (
                        <span className="counter-affix">{stat.prefix}</span>
                      )}
                      <CountUp value={stat.value} />
                      {stat.suffix && (
                        <span className="counter-affix">{stat.suffix}</span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="companies" data-reveal>
              <p className="companies-label">
                {ko ? "함께 만들어온 경험" : "A few places along the way"}
              </p>
              <ul className="company-logos">
                {companies.map((company, index) => (
                  <li key={company.name} style={delay(index * 0.06)}>
                    <span
                      role="img"
                      aria-label={company.name}
                      className="company-logo"
                      style={
                        {
                          "--logo": `url(/logos/${company.logo})`,
                          "--logo-ratio": company.ratio,
                          "--logo-height": `${company.height}px`,
                        } as CSSProperties
                      }
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <section id="work" className="work-section">
          <div className="section-shell">
            <SectionIndex number="03" label="Selected work 2008 — 2026" />
            <div className="section-heading">
              <h2 className="display-heading" data-reveal="split">
                <SplitText lines={["Built with purpose.", "Made for people."]} />
              </h2>
              <p className="section-aside" data-reveal>
                {ko ? (
                  <>
                    작은 발견에서 시작해
                    <br />
                    수백만의 일상에 닿기까지.
                  </>
                ) : (
                  <>
                    From a small observation
                    <br />
                    to a part of millions of lives.
                  </>
                )}
                <ArrowDownRight size={27} />
              </p>
            </div>
            <div className="work-toolbar" data-reveal>
              <div
                className="archive-filters"
                aria-label={ko ? "프로젝트 분류" : "Project categories"}
              >
                {(
                  [
                    { id: "all", kr: "전체", en: "All projects" },
                    {
                      id: "product",
                      kr: "프로덕트 리딩",
                      en: "Product leadership",
                    },
                    {
                      id: "independent",
                      kr: "개인 프로젝트",
                      en: "Independent",
                    },
                    { id: "engineering", kr: "개발", en: "Engineering" },
                  ] as const
                ).map((filter) => (
                  <button
                    key={filter.id}
                    aria-pressed={category === filter.id}
                    onClick={() => setCategory(filter.id)}
                  >
                    {ko ? filter.kr : filter.en}
                    <span>
                      {filter.id === "all"
                        ? projects.length
                        : projects.filter(
                            (project) => project.category === filter.id,
                          ).length}
                    </span>
                  </button>
                ))}
              </div>
              <div className="work-tools">
                <button
                  className="archive-search"
                  onClick={() => setSearchOpen(true)}
                  aria-label={ko ? "프로젝트 검색" : "Search projects"}
                >
                  <Search size={17} />
                </button>
                <div className="view-switch">
                  <button
                    aria-label={ko ? "목록 보기" : "List view"}
                    aria-pressed={view === "list"}
                    onClick={() => setView("list")}
                  >
                    <List size={17} />
                    <span>{ko ? "리스트" : "List"}</span>
                  </button>
                  <button
                    aria-label={ko ? "그리드 보기" : "Grid view"}
                    aria-pressed={view === "grid"}
                    onClick={() => setView("grid")}
                  >
                    <Grid2X2 size={16} />
                    <span>{ko ? "카드" : "Cards"}</span>
                  </button>
                </div>
              </div>
            </div>
            <div
              className={`archive-projects ${view === "grid" ? "archive-grid" : "archive-list"} ${curated ? "is-curated" : ""}`}
            >
              {stacked.length > 0 && (
                <div className="featured-stack">
                  {stacked.map((project, index) =>
                    renderProject(project, index, true),
                  )}
                </div>
              )}
              <div className="archive-cards">
                {cards.map((project, index) =>
                  renderProject(project, index, false),
                )}
              </div>
            </div>
            {filtered.length > limit && (
              <button
                className="show-more"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded
                  ? ko
                    ? "접어두기"
                    : "Show less"
                  : ko
                    ? `${filtered.length - limit}개 프로젝트 더 보기`
                    : `Explore ${filtered.length - limit} more projects`}
                <span className="button-icon">
                  {expanded ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>
            )}
          </div>
        </section>
        <section id="about" className="about-section">
          <div className="section-shell">
            <SectionIndex number="04" label="The person behind the products" />
            <h2 className="display-heading" data-reveal="split">
              <SplitText lines={["Many hats.", "One curious mind."]} />
            </h2>
            <div className="about-intro" data-reveal>
              <p>
                {ko ? (
                  <>
                    코드를 쓰던 손으로,
                    <br />
                    이제는 <span>제품의 다음 장</span>을 만듭니다.
                  </>
                ) : (
                  <>
                    The hands that wrote the code
                    <br />
                    now shape <span>what comes next.</span>
                  </>
                )}
              </p>
              <div>
                <p>
                  {ko
                    ? "개발을 아는 PM은 질문이 다릅니다. 기술의 가능성과 사용자의 필요 사이에서, 팀과 함께 가장 의미 있는 답을 찾습니다."
                    : "A PM who has written the code asks different questions. I work at the intersection of technical possibility and human need, finding the most meaningful answer with my team."}
                </p>
                <button
                  className="button button-ghost"
                  onClick={downloadResume}
                  disabled={exporting}
                >
                  {exporting
                    ? ko
                      ? "PDF 만드는 중…"
                      : "Creating PDF…"
                    : ko
                      ? "포트폴리오 PDF 받기"
                      : "Download portfolio PDF"}
                  <span className="button-icon">
                    {exporting ? (
                      <LoaderCircle className="spin" size={16} />
                    ) : (
                      <Download size={16} />
                    )}
                  </span>
                </button>
              </div>
            </div>
            <div className="journey" data-reveal>
              <div className="journey-top">
                <span className="journey-kicker">
                  Not a straight line. A continuous evolution.
                </span>
                <div className="journey-arrows">
                  <button
                    className="icon-button"
                    aria-label={ko ? "이전 경력" : "Previous chapter"}
                    disabled={era === 0}
                    onClick={() => setEra(era - 1)}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    className="icon-button"
                    aria-label={ko ? "다음 경력" : "Next chapter"}
                    disabled={era === eras.length - 1}
                    onClick={() => setEra(era + 1)}
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
              <div
                className="journey-tabs"
                role="tablist"
                aria-label={ko ? "경력 타임라인" : "Career timeline"}
              >
                {eras.map((item, index) => (
                  <button
                    key={item.title}
                    id={`era-tab-${index}`}
                    role="tab"
                    aria-selected={era === index}
                    aria-controls="era-panel"
                    tabIndex={era === index ? 0 : -1}
                    onClick={() => setEra(index)}
                    onKeyDown={(event) => {
                      if (
                        !["ArrowLeft", "ArrowRight", "Home", "End"].includes(
                          event.key,
                        )
                      )
                        return;
                      event.preventDefault();
                      const next =
                        event.key === "Home"
                          ? 0
                          : event.key === "End"
                            ? 3
                            : (index + (event.key === "ArrowRight" ? 1 : 3)) %
                              4;
                      setEra(next);
                      document.getElementById(`era-tab-${next}`)?.focus();
                    }}
                  >
                    <span className="timeline-point" />
                    <span className="journey-years">{item.years}</span>
                    <strong>{item.title}</strong>
                  </button>
                ))}
              </div>
              <div
                className="journey-panel"
                id="era-panel"
                role="tabpanel"
                aria-labelledby={`era-tab-${era}`}
                tabIndex={0}
              >
                <div key={era} className="journey-panel-content">
                  <div className="chapter-number" aria-hidden="true">
                    0{era + 1}
                    <span>Chapter</span>
                  </div>
                  <div className="chapter-copy">
                    <span className="chapter-years">{activeEra.years}</span>
                    <h3>{ko ? activeEra.ko : activeEra.en}</h3>
                    <p>{ko ? activeEra.koText : activeEra.enText}</p>
                    <div className="tag-list">
                      {activeEra.stack.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="chapter-projects">
                    <span className="chapter-projects-title">
                      {ko ? "이 시기의 프로젝트" : "Projects from this chapter"}
                    </span>
                    {activeEra.ids.map((id) => {
                      const project = projects.find((item) => item.id === id)!;
                      return (
                        <button key={id} onClick={() => openProject(id)}>
                          <span style={{ background: project.color }} />
                          <span>{project.name}</span>
                          <ArrowUpRight size={15} />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="principles">
              {principles.map((principle, index) => {
                const Icon = principle.icon;
                const [title, text] = ko ? principle.ko : principle.en;
                return (
                  <div
                    key={principle.word}
                    className="principle"
                    data-reveal={index % 2 ? "right" : "left"}
                  >
                    <span className="principle-word" aria-hidden="true">
                      {principle.word}
                    </span>
                    <div className="principle-copy">
                      <span className="principle-label">
                        <Icon size={18} />
                        {principle.label}
                      </span>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <section id="contact" className="contact-section">
          <div className="contact-glow" aria-hidden="true" />
          <div className="section-shell">
            <SectionIndex number="05" label="Next chapter, together" />
            <div className="contact-stage">
              {["gme-remit.jpg", "pickmiju.png"].map((image, index) => (
                <span
                  key={image}
                  className={`contact-shot contact-shot-${index + 1}`}
                  data-reveal={index ? "right" : "left"}
                  aria-hidden="true"
                >
                  <span className="contact-shot-inner">
                    <Image src={`/images/${image}`} alt="" fill sizes="280px" />
                  </span>
                </span>
              ))}
              <span className="availability contact-availability" data-reveal>
                <i />
                Open to opportunities
              </span>
              <h2 className="contact-title" data-reveal="split">
                <SplitText lines={["Have a good", "what if?"]} accentLast />
              </h2>
              <a
                className="contact-circle"
                href={`mailto:${contact.email}`}
                aria-label={ko ? "이메일 보내기" : "Send an email"}
                data-reveal="zoom"
              >
                <ArrowUpRight />
              </a>
              <p className="contact-text" data-reveal>
                {ko ? (
                  <>
                    새로운 제품, 흥미로운 문제, 가벼운 인사.
                    <br />
                    좋은 대화는 언제나 환영합니다.
                  </>
                ) : (
                  <>
                    A new product, an interesting problem, or just a hello.
                    <br />
                    Good conversations are always welcome.
                  </>
                )}
              </p>
              <div className="contact-links" data-reveal>
                <a href={`mailto:${contact.email}`}>
                  {contact.email}
                  <ArrowUpRight size={19} />
                </a>
                <button
                  className="icon-button"
                  onClick={copyEmail}
                  aria-label={ko ? "이메일 주소 복사" : "Copy email address"}
                >
                  <Copy size={17} />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="footer-glow" aria-hidden="true" />
        <div className="section-shell footer-grid">
          <div className="footer-main">
            <div className="footer-title">
              <span className="footer-kicker">Seoul, KR —</span>
              <a className="footer-signature" href="#home">
                Sei Hee
                <br />
                Han.
              </a>
            </div>
            <div className="footer-columns">
              <div>
                <span>{ko ? "지금" : "Now"}</span>
                <p>Product Manager · Developer · Builder</p>
              </div>
              <div>
                <span>{ko ? "연락처" : "Contact"}</span>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </div>
            </div>
          </div>
          <div className="footer-side">
            <p className="footer-heading">Quick links</p>
            <nav
              className="footer-nav"
              aria-label={ko ? "바로가기" : "Quick links"}
            >
              <a href="#work">{ko ? "프로젝트" : "Work"}</a>
              <a href="#about">{ko ? "소개" : "About"}</a>
              <a href="#contact">{ko ? "연락하기" : "Contact"}</a>
              <a href={contact.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </nav>
            <div className="footer-links">
              <a
                href={contact.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <Github size={17} />
              </a>
              <a href={`mailto:${contact.email}`} aria-label="Email">
                <Mail size={17} />
              </a>
              <button
                className="motion-toggle"
                onClick={toggleMotion}
                aria-pressed={!reducedMotion}
                aria-label={
                  ko
                    ? reducedMotion
                      ? "애니메이션 켜기"
                      : "애니메이션 멈추기"
                    : reducedMotion
                      ? "Enable animation"
                      : "Pause animation"
                }
              >
                {reducedMotion ? <Play size={13} /> : <Pause size={13} />}
                MOTION {reducedMotion ? "OFF" : "ON"}
              </button>
              <a
                href="#home"
                className="back-top"
                aria-label={ko ? "맨 위로" : "Back to top"}
              >
                <ArrowUp size={18} />
              </a>
            </div>
          </div>
        </div>
        <div className="section-shell footer-bottom">
          <span>© {new Date().getFullYear()} Sei Hee Han. All rights reserved.</span>
          <span className="footer-note">
            Built with intention. Always in progress.
          </span>
        </div>
      </footer>
      <div className="toast" role="status" aria-live="polite">
        {toast && (
          <span>
            <Check size={16} />
            {toast}
          </span>
        )}
      </div>
      <ProjectDialog
        project={currentProject}
        onClose={closeProject}
        locale={locale}
      />
      <SearchDialog
        open={searchOpen}
        onClose={closeSearch}
        projects={projects}
        onProject={openProject}
        locale={locale}
      />
      <article ref={resumeRef} className="resume-document" aria-hidden="true">
        <span>SEI HEE HAN / PORTFOLIO</span>
        <h1>{ko ? "한세희" : "Sei Hee Han"}</h1>
        <h2>Product Manager · Developer · Builder</h2>
        <p>
          {contact.email} · {contact.github}
        </p>
        <p>
          {ko
            ? "개발 9년 + PM 8년. 기술을 이해하고 사람을 위한 제품을 만듭니다."
            : "9 years in development. 8 years in product management. Building products for people."}
        </p>
        <hr />
        {projects.map((project) => (
          <section key={project.id}>
            <h2>{project.name}</h2>
            <p>
              {project.company} · {project.period} · {project.role}
            </p>
            <strong>{project.metric}</strong>
            <p>
              {project.description.replaceAll("• ", "").split("\n").join(" / ")}
            </p>
            {project.link && <p>{project.link}</p>}
          </section>
        ))}
      </article>
    </div>
  );
}
