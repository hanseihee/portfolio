"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowDownLeft, ArrowUpRight, Search, X } from "lucide-react";
import type { Project } from "@/lib/portfolio";

export function ProjectDialog({
  project,
  onClose,
  locale,
}: {
  project: Project | null;
  onClose: () => void;
  locale: "ko" | "en";
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (project) ref.current?.showModal();
    else ref.current?.close();
  }, [project]);
  return (
    <dialog
      ref={ref}
      className="project-dialog"
      onClose={onClose}
      aria-labelledby="project-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) ref.current?.close();
      }}
    >
      {project && (
        <div className="project-dialog-inner">
          <div className="dialog-top">
            <span className="eyebrow">PROJECT NOTES / {project.period}</span>
            <button
              className="icon-button"
              onClick={onClose}
              aria-label={locale === "ko" ? "프로젝트 닫기" : "Close project"}
            >
              <X size={21} />
            </button>
          </div>
          <div
            className="project-dialog-art"
            style={{ background: project.color }}
          >
            <span className="dialog-art-word" aria-hidden="true">
              {project.id.toUpperCase()}.
            </span>
            {project.image && (
              <Image
                src={`/images/${project.image}`}
                alt={project.name}
                width={700}
                height={420}
                className="project-screenshot"
              />
            )}
            <span className="art-index mono">
              SEI HEE HAN · SELECTED EXPERIENCE
            </span>
          </div>
          <div className="dialog-content">
            <div className="dialog-meta mono">
              <span>{project.company}</span>
              <span>{project.role}</span>
            </div>
            <h2 id="project-title">{project.name}</h2>
            <p className="dialog-metric">
              <ArrowDownLeft size={22} />
              {project.metric}
            </p>
            <div className="dialog-details">
              <h3>
                {locale === "ko" ? "만든 것과 배운 것" : "What went into it"}
              </h3>
              <ul>
                {project.description
                  .split("\n")
                  .filter(Boolean)
                  .map((line, index) => (
                    <li key={index}>{line.replace(/^[•\-]\s*/, "")}</li>
                  ))}
              </ul>
            </div>
            <div className="tag-list">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            {project.link && (
              <a
                className="button button-dark"
                href={project.link}
                target="_blank"
                rel="noreferrer"
              >
                {locale === "ko" ? "프로젝트 방문" : "Visit project"}
                <ArrowUpRight size={18} />
              </a>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}

export function SearchDialog({
  open,
  onClose,
  projects,
  onProject,
  locale,
}: {
  open: boolean;
  onClose: () => void;
  projects: Project[];
  onProject: (id: string) => void;
  locale: "ko" | "en";
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const results = projects.filter((p) =>
    `${p.name} ${p.company} ${p.tags.join(" ")}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  useEffect(() => {
    if (open) {
      ref.current?.showModal();
      input.current?.focus();
    } else ref.current?.close();
  }, [open]);
  useEffect(() => {
    ref.current
      ?.querySelector(".search-result.is-selected")
      ?.scrollIntoView({ block: "nearest" });
  }, [selected, query]);
  const choose = (id: string) => {
    onClose();
    onProject(id);
  };
  return (
    <dialog
      ref={ref}
      className="search-dialog"
      aria-label={locale === "ko" ? "프로젝트 검색" : "Search projects"}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="search-dialog-inner">
        <div className="search-input-wrap">
          <Search size={21} />
          <input
            ref={input}
            value={query}
            placeholder={
              locale === "ko"
                ? "프로젝트, 기술, 회사를 검색하세요"
                : "Search projects, skills, companies…"
            }
            aria-label={locale === "ko" ? "검색어" : "Search query"}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelected(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelected((v) => Math.min(v + 1, results.length - 1));
              }
              if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelected((v) => Math.max(v - 1, 0));
              }
              if (e.key === "Enter" && results[Math.max(selected, 0)]) {
                e.preventDefault();
                choose(results[Math.max(selected, 0)].id);
              }
            }}
          />
          <button
            className="escape-key"
            onClick={onClose}
            aria-label={locale === "ko" ? "검색 닫기" : "Close search"}
          >
            ESC
          </button>
        </div>
        <div className="search-results">
          <p className="eyebrow">
            {locale === "ko" ? "프로젝트 탐색" : "EXPLORE THE ARCHIVE"}{" "}
            <span>{results.length}</span>
          </p>
          {results.map((p, i) => (
            <button
              key={p.id}
              className={`search-result ${selected === i ? "is-selected" : ""}`}
              onClick={() => choose(p.id)}
            >
              <span className="result-marker" style={{ background: p.color }}>
                {p.name.charAt(0)}
              </span>
              <span>
                <strong>{p.name}</strong>
                <small>
                  {p.company} · {p.period}
                </small>
              </span>
              <ArrowUpRight size={17} />
            </button>
          ))}
          {results.length === 0 && (
            <p className="empty-state">
              {locale === "ko"
                ? "검색 결과가 없습니다. 다른 키워드를 입력해 보세요."
                : "No projects found. Try another keyword."}
            </p>
          )}
        </div>
        <div className="search-footer mono">
          <span>↑ ↓ {locale === "ko" ? "이동" : "NAVIGATE"}</span>
          <span>↵ {locale === "ko" ? "열기" : "OPEN"}</span>
          <span>ESC {locale === "ko" ? "닫기" : "CLOSE"}</span>
        </div>
      </div>
    </dialog>
  );
}
