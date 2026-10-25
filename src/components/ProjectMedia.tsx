import Image from "next/image";
import type { CSSProperties } from "react";
import type { Project } from "@/lib/portfolio";

const portraitImages = new Set([
  "esports-opgg.webp",
  "duo-opgg.png",
  "oguogu.webp",
  "youngohaja.png",
  "b2b-messenger.png",
]);

const imageBackgrounds: Record<string, string> = {
  "esports-opgg.webp": "#080808",
  "kimpga.png": "#201e1e",
  "f1-boxbox.png": "#000000",
  "pickmiju.png": "#101126",
  "gme-remit.jpg": "#df0025",
  "couple-diary.jpg": "#182126",
};

export default function ProjectMedia({
  project,
  className = "",
  sizes = "(max-width: 700px) 100vw, 50vw",
}: {
  project: Project;
  className?: string;
  sizes?: string;
}) {
  return (
    <span
      className={`project-media ${portraitImages.has(project.image ?? "") ? "project-media-portrait" : "project-media-landscape"} ${className}`}
      style={
        {
          "--media-background":
            imageBackgrounds[project.image ?? ""] ?? "#e9ece5",
        } as CSSProperties
      }
    >
      {project.image ? (
        <Image
          src={`/images/${project.image}`}
          alt={project.name}
          fill
          sizes={sizes}
          className="project-original-image"
        />
      ) : (
        <span className="project-media-fallback">{project.name}</span>
      )}
    </span>
  );
}
