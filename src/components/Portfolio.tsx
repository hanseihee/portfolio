"use client";

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
  type ProjectCategory,
} from "@/lib/portfolio";
import ProjectMedia from "./ProjectMedia";
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
function motionSnapshot() {
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
  const [view, setView] = useState<"list" | "grid">("grid");
  const [expanded, setExpanded] = useState(false);
  const [era, setEra] = useState(2);
  const [activeSection, setActiveSection] = useState("home");
  const [clock, setClock] = useState("--:--:-- KST");
  const [toast, setToast] = useState("");
  const [exporting, setExporting] = useState(false);
  const resumeRef = useRef<HTMLElement>(null);
  const reducedMotion = useSyncExternalStore(
    subscribeMotion,
    motionSnapshot,
    () => true,
  );
  const closeProject = useCallback(() => setProjectId(null), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);
  const openProject = useCallback((id: string) => setProjectId(id), []);

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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    document
      .querySelectorAll("[data-reveal]")
      .forEach((element) => observer.observe(element));
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
  // Featured projects lead every view; "all" + grid renders them as a bento row.
  const filtered = orderedProjects.filter(
    (project) => category === "all" || project.category === category,
  );
  const curated = category === "all" && view === "grid";
  const limit = category === "all" ? 9 : 6;
  const shown = expanded ? filtered : filtered.slice(0, limit);
  const activeEra = eras[era];
  const currentProject =
    projects.find((project) => project.id === projectId) ?? null;

  return (
    <div
      className={`portfolio ${reducedMotion ? "motion-reduced" : "motion-full"}`}
    >
      <a className="skip-link" href="#work">
        {ko ? "프로젝트로 바로가기" : "Skip to projects"}
      </a>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Sei Hee Han home">
          <span className="brand-symbol">
            h<span>↗</span>
          </span>
          <span>
            SEI HEE HAN<span className="brand-role">PRODUCT BUILDER</span>
          </span>
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
            className="language-toggle mono"
            onClick={() => setLocale(ko ? "en" : "ko")}
            aria-label={ko ? "Switch to English" : "한국어로 전환"}
          >
            <span className={ko ? "selected" : ""}>KR</span>
            <span>/</span>
            <span className={!ko ? "selected" : ""}>EN</span>
          </button>
          <button
            className="search-trigger"
            onClick={() => setSearchOpen(true)}
            aria-label={
              ko ? "프로젝트 검색 (Ctrl K)" : "Search projects (Ctrl K)"
            }
          >
            <Search size={16} />
            <kbd>⌘ K</kbd>
          </button>
        </div>
      </header>
      <main>
        <section id="home" className="hero section-shell">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow hero-intro">
                DEVELOPER’S MIND. PRODUCT’S HEART.
              </p>
              <h1>
                Ideas into
                <br />
                <span className="impact-word">
                  impact<span className="orange-period">.</span>
                  <svg viewBox="0 0 430 22" aria-hidden="true">
                    <path d="M3 16Q210 -5 425 9" />
                  </svg>
                </span>
              </h1>
              <div className="hero-description">
                <span className="small-star">✳</span>
                <p>
                  {ko ? (
                    <>
                      기술을 이해하고,
                      <br />
                      사람을 위한 제품을 만듭니다.
                    </>
                  ) : (
                    <>
                      I connect the dots between
                      <br />
                      code, people, and possibility.
                    </>
                  )}
                </p>
              </div>
              <p className="hero-subtext">
                {ko
                  ? "안녕하세요, 개발자 출신 프로덕트 매니저 한세희입니다."
                  : "Hi, I’m Sei Hee. Developer turned product manager."}
              </p>
              <div className="hero-cta">
                <a className="button button-dark" href="#work">
                  {ko ? "만들어온 것들" : "Explore my work"}
                  <ArrowDownRight size={19} />
                </a>
                <a className="text-link" href="#about">
                  {ko ? "저에 대해 더 알아보기" : "A little about me"}
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
            <aside
              className="profile-card"
              aria-label={ko ? "프로필 요약" : "Profile at a glance"}
            >
              <div className="profile-top mono">
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
                <div className="career-years mono" aria-hidden="true">
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
              <dl className="profile-stats">
                <div>
                  <dt>{ko ? "만든 제품" : "Products shipped"}</dt>
                  <dd>
                    20<span>+</span>
                  </dd>
                </div>
                <div>
                  <dt>{ko ? "매각 경험" : "Exits"}</dt>
                  <dd>2</dd>
                </div>
                <div>
                  <dt>{ko ? "양대 앱마켓" : "On both app stores"}</dt>
                  <dd>
                    {ko ? (
                      <>
                        1<span>위</span>
                      </>
                    ) : (
                      <>
                        <span>#</span>1
                      </>
                    )}
                  </dd>
                </div>
              </dl>
            </aside>
          </div>
        </section>
        <div className="companies-strip">
          <span className="mono">
            {ko ? "함께 만들어온 경험" : "A FEW PLACES ALONG THE WAY"}
          </span>
          <ul className="company-logos">
            {companies.map((company) => (
              <li key={company.name}>
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
        <section id="work" className="work-section section-shell">
          <div className="section-heading" data-reveal>
            <div>
              <p className="eyebrow">
                <span className="section-number">01 /</span> WORK
              </p>
              <h2>
                Built with purpose.
                <br />
                <span className="muted-heading">Made for people.</span>
              </h2>
            </div>
            <p className="section-aside">
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
                  { id: "independent", kr: "개인 프로젝트", en: "Independent" },
                  { id: "engineering", kr: "개발", en: "Engineering" },
                ] as const
              ).map((filter) => (
                <button
                  key={filter.id}
                  aria-pressed={category === filter.id}
                  onClick={() => {
                    setCategory(filter.id);
                    setExpanded(false);
                  }}
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
                  aria-label={ko ? "그리드 보기" : "Grid view"}
                  aria-pressed={view === "grid"}
                  onClick={() => setView("grid")}
                >
                  <Grid2X2 size={16} />
                  <span>{ko ? "카드" : "Cards"}</span>
                </button>
                <button
                  aria-label={ko ? "목록 보기" : "List view"}
                  aria-pressed={view === "list"}
                  onClick={() => setView("list")}
                >
                  <List size={17} />
                  <span>{ko ? "리스트" : "List"}</span>
                </button>
              </div>
            </div>
          </div>
          <div
            className={`archive-projects ${view === "grid" ? "archive-grid" : "archive-list"} ${curated ? "is-curated" : ""}`}
          >
            {shown.map((project) => {
              const featured = isFeatured(project.id);
              const lead = curated && project.id === featuredIds[0];
              return (
                <button
                  key={project.id}
                  className={`archive-project ${featured ? `is-featured featured-${project.id}` : ""}`}
                  onClick={() => openProject(project.id)}
                >
                  <ProjectMedia
                    project={project}
                    sizes={
                      view === "list"
                        ? "160px"
                        : lead
                          ? "(max-width: 700px) 100vw, 66vw"
                          : "(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                    }
                  />
                  {featured && (
                    <span className="featured-badge mono">
                      {ko ? "대표 프로젝트" : "FEATURED"}
                    </span>
                  )}
                  <span className="archive-content">
                    <span className="archive-meta">
                      <span>{project.company}</span>
                      <span>{project.period}</span>
                    </span>
                    <span className="archive-name">
                      <strong>{project.name}</strong>
                    </span>
                    <span className="archive-description">
                      {featured
                        ? featuredTaglines[project.id][ko ? 0 : 1]
                        : project.description
                            .split("\n")[0]
                            .replace(/^•\s*/, "")}
                    </span>
                    <span className="archive-card-bottom">
                      <span className="archive-outcome">{project.metric}</span>
                      <span className="archive-open">
                        <ArrowUpRight size={20} />
                      </span>
                    </span>
                  </span>
                </button>
              );
            })}
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
              {expanded ? <Minus size={16} /> : <Plus size={16} />}
            </button>
          )}
        </section>
        <section id="about" className="about-section">
          <div className="section-shell">
            <div className="section-heading" data-reveal>
              <div>
                <p className="eyebrow">
                  <span className="section-number">02 /</span> THE PERSON BEHIND
                  THE PRODUCTS
                </p>
                <h2>
                  Many hats.
                  <br />
                  <span className="muted-heading">One curious mind.</span>
                </h2>
              </div>
              <span className="about-asterisk" aria-hidden="true">
                ✳
              </span>
            </div>
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
                  className="text-link"
                  onClick={downloadResume}
                  disabled={exporting}
                >
                  {exporting ? (
                    <LoaderCircle className="spin" size={16} />
                  ) : (
                    <Download size={16} />
                  )}
                  {exporting
                    ? ko
                      ? "PDF 만드는 중…"
                      : "Creating PDF…"
                    : ko
                      ? "포트폴리오 PDF 받기"
                      : "Download portfolio PDF"}
                </button>
              </div>
            </div>
            <div className="journey" data-reveal>
              <div className="journey-top">
                <span className="eyebrow">
                  NOT A STRAIGHT LINE. A CONTINUOUS EVOLUTION.
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
                    <span className="mono">{item.years}</span>
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
                    <span>CHAPTER</span>
                  </div>
                  <div className="chapter-copy">
                    <span className="eyebrow">{activeEra.years}</span>
                    <h3>{ko ? activeEra.ko : activeEra.en}</h3>
                    <p>{ko ? activeEra.koText : activeEra.enText}</p>
                    <div className="tag-list">
                      {activeEra.stack.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="chapter-projects">
                    <span className="eyebrow">
                      {ko ? "이 시기의 프로젝트" : "PROJECTS FROM THIS CHAPTER"}
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
            <div className="principles" data-reveal>
              <div>
                <Code2 size={23} />
                <span className="mono">01 / THINK IN SYSTEMS</span>
                <h3>{ko ? "깊이 이해하고" : "Understand deeply."}</h3>
                <p>
                  {ko
                    ? "구현을 알아야 더 나은 질문을 할 수 있습니다."
                    : "Understanding how things work leads to better questions."}
                </p>
              </div>
              <div>
                <Search size={23} />
                <span className="mono">02 / STAY CLOSE TO PEOPLE</span>
                <h3>{ko ? "사람에서 출발하고" : "Start with people."}</h3>
                <p>
                  {ko
                    ? "지표 너머, 실제로 쓰는 사람의 맥락을 봅니다."
                    : "Behind every metric is a person with a real context."}
                </p>
              </div>
              <div>
                <Sparkles size={23} />
                <span className="mono">03 / NEVER STOP MAKING</span>
                <h3>{ko ? "직접 만들어 검증합니다" : "Make it real."}</h3>
                <p>
                  {ko
                    ? "가장 좋은 아이디어는 실행하며 발견합니다."
                    : "The best ideas often show up in the making."}
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          id="contact"
          className="contact-section section-shell"
          data-reveal
        >
          <div className="contact-top">
            <p className="eyebrow">
              <span className="section-number">03 /</span> NEXT CHAPTER,
              TOGETHER
            </p>
            <span className="availability mono">
              <i />
              OPEN TO OPPORTUNITIES
            </span>
          </div>
          <div className="contact-heading">
            <h2>
              Have a good
              <br />
              <span>
                what if<span className="orange-period">?</span>
              </span>
            </h2>
            <a
              className="contact-circle"
              href={`mailto:${contact.email}`}
              aria-label={ko ? "이메일 보내기" : "Send an email"}
            >
              <ArrowUpRight />
            </a>
          </div>
          <div className="contact-details">
            <p>
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
            <div className="contact-links">
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
        </section>
      </main>
      <footer className="site-footer">
        <a className="footer-signature" href="#home">
          Sei Hee.
        </a>
        <span className="mono">
          © {new Date().getFullYear()} SEI HEE HAN
          <span className="footer-note">
            BUILT WITH INTENTION. ALWAYS IN PROGRESS.
          </span>
        </span>
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
            className="motion-toggle mono"
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
            {reducedMotion ? <Play size={13} /> : <Pause size={13} />}MOTION{" "}
            {reducedMotion ? "OFF" : "ON"}
          </button>
          <a
            href="#home"
            className="back-top"
            aria-label={ko ? "맨 위로" : "Back to top"}
          >
            <ArrowUp size={18} />
          </a>
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
