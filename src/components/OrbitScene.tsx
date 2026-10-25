"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  RotateCcw,
  MoveUpRight,
  Orbit,
  Dna,
  Waves,
} from "lucide-react";

type Shape = "orbit" | "helix" | "wave";
const labels = [
  {
    id: "esports",
    title: "OP.GG",
    caption: "PRODUCT & GROWTH",
    angle: -2.3,
    color: "#a9bee8",
  },
  {
    id: "kimpga",
    title: "KIMPGA",
    caption: "BUILT → ACQUIRED",
    angle: 0.1,
    color: "#d8e3b9",
  },
  {
    id: "f1",
    title: "F1 BOXBOX",
    caption: "SIDE PROJECT",
    angle: 2,
    color: "#ee7658",
  },
];

export default function OrbitScene({
  onProject,
  reducedMotion,
  locale,
}: {
  onProject: (id: string) => void;
  reducedMotion: boolean;
  locale: "ko" | "en";
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rotation = useRef({ x: -0.15, y: 0.35, targetX: -0.15, targetY: 0.35 });
  const drag = useRef({ active: false, x: 0, y: 0 });
  const [shape, setShape] = useState<Shape>("orbit");
  const shapeRef = useRef<Shape>("orbit");
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    shapeRef.current = shape;
  }, [shape]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    let frame = 0;
    let width = 600;
    let height = 600;
    let visible = true;
    let last = 0;
    let time = 0;
    let needsDraw = true;
    let previousShape: Shape | null = null;
    const points = Array.from({ length: 1050 }, (_, index) => {
      const y = 1 - (index / 1049) * 2;
      const r = Math.sqrt(1 - y * y);
      const a = index * Math.PI * (3 - Math.sqrt(5));
      return {
        x: Math.cos(a) * r,
        y,
        z: Math.sin(a) * r,
        sx: Math.cos(a) * r,
        sy: y,
        sz: Math.sin(a) * r,
        index,
      };
    });
    const resize = new ResizeObserver(([entry]) => {
      width = entry.contentRect.width;
      height = entry.contentRect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      needsDraw = true;
    });
    resize.observe(container);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(container);
    const render = (now: number) => {
      frame = requestAnimationFrame(render);
      if (!visible || document.hidden) {
        last = now;
        return;
      }
      const delta = Math.min((now - last) / 1000, 0.04);
      last = now;
      if (!reducedMotion) time += delta;
      const rot = rotation.current;
      if (
        reducedMotion &&
        !needsDraw &&
        previousShape === shapeRef.current &&
        Math.abs(rot.targetX - rot.x) < 0.0001 &&
        Math.abs(rot.targetY - rot.y) < 0.0001
      )
        return;
      needsDraw = false;
      previousShape = shapeRef.current;
      if (!drag.current.active && !reducedMotion) rot.targetY += delta * 0.12;
      rot.x += (rot.targetX - rot.x) * (reducedMotion ? 1 : 0.08);
      rot.y += (rot.targetY - rot.y) * (reducedMotion ? 1 : 0.08);
      context.clearRect(0, 0, width, height);
      const radius = Math.min(width, height) * 0.31;
      const cx = width * 0.5;
      const cy = height * 0.49;
      const project = (x: number, y: number, z: number) => {
        const rx = x * Math.cos(rot.y) + z * Math.sin(rot.y);
        const rz = z * Math.cos(rot.y) - x * Math.sin(rot.y);
        const ry = y * Math.cos(rot.x) - rz * Math.sin(rot.x);
        const depth = y * Math.sin(rot.x) + rz * Math.cos(rot.x);
        const perspective = 3.8 / (3.8 - depth);
        return {
          x: cx + rx * radius * perspective,
          y: cy + ry * radius * perspective,
          depth,
          perspective,
        };
      };
      // A projected particle sculpture, rendered locally without external assets.
      const projected = points
        .map((point) => {
          let x = point.sx,
            y = point.sy,
            z = point.sz;
          if (shapeRef.current === "helix") {
            const angle = point.index * 0.063 + time * 0.2;
            const strand = point.index % 2 ? Math.PI : 0;
            x = Math.cos(angle + strand) * 0.65;
            z = Math.sin(angle + strand) * 0.65;
            y = (point.index / 1050 - 0.5) * 2.6;
          } else if (shapeRef.current === "wave") {
            x = ((point.index % 35) / 34 - 0.5) * 2.4;
            z = (Math.floor(point.index / 35) / 29 - 0.5) * 2.4;
            y = Math.sin(x * 3 + time) * Math.cos(z * 2 + time * 0.5) * 0.35;
          }
          const blend = reducedMotion ? 1 : 1 - Math.exp(-delta * 5);
          point.x += (x - point.x) * blend;
          point.y += (y - point.y) * blend;
          point.z += (z - point.z) * blend;
          return { ...project(point.x, point.y, point.z), index: point.index };
        })
        .sort((a, b) => a.depth - b.depth);
      projected.forEach((point) => {
        const front = (point.depth + 1.5) / 3;
        const accent = point.index % 17 === 0;
        context.fillStyle = accent
          ? `rgba(230,86,45,${0.3 + front * 0.7})`
          : `rgba(51,65,57,${0.1 + front * 0.72})`;
        context.beginPath();
        context.arc(
          point.x,
          point.y,
          Math.max(0.6, point.perspective * (accent ? 2.25 : 1.25)),
          0,
          Math.PI * 2,
        );
        context.fill();
      });
      for (let ring = 0; ring < 3; ring++) {
        context.beginPath();
        for (let i = 0; i <= 160; i++) {
          const a = (i / 160) * Math.PI * 2;
          const tilt = 0.35 + ring * 0.8;
          const r = 1.2 + ring * 0.15;
          const p = project(
            Math.cos(a) * r,
            Math.sin(a) * Math.sin(tilt) * r,
            Math.sin(a) * Math.cos(tilt) * r,
          );
          if (i === 0) context.moveTo(p.x, p.y);
          else context.lineTo(p.x, p.y);
        }
        context.strokeStyle =
          ring === 1 ? "rgba(230,86,45,.55)" : "rgba(68,79,64,.13)";
        context.lineWidth = ring === 1 ? 1 : 0.7;
        context.stroke();
        const a = time * 0.18 + ring * 2;
        const p = project(
          Math.cos(a) * (1.2 + ring * 0.15),
          Math.sin(a) * Math.sin(0.35 + ring * 0.8) * (1.2 + ring * 0.15),
          Math.sin(a) * Math.cos(0.35 + ring * 0.8) * (1.2 + ring * 0.15),
        );
        context.fillStyle = ring === 1 ? "#e6562d" : "#4b5749";
        context.beginPath();
        context.arc(p.x, p.y, ring === 1 ? 5 : 3, 0, Math.PI * 2);
        context.fill();
      }
    };
    frame = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      observer.disconnect();
    };
  }, [reducedMotion]);

  return (
    <div className="universe">
      <div className="universe-top mono">
        <span>
          <span className="tiny-cross">+</span> A SMALL UNIVERSE OF IDEAS
        </span>
        <span>FIG. 001</span>
      </div>
      <div
        ref={containerRef}
        className={`orbit-stage ${dragging ? "is-dragging" : ""}`}
      >
        <div className="orbit-guides" aria-hidden="true">
          <i />
          <i />
          <span className="guide-cross one">+</span>
          <span className="guide-cross two">+</span>
        </div>
        <canvas
          ref={canvasRef}
          tabIndex={0}
          role="img"
          aria-label={
            locale === "ko"
              ? "인터랙티브 입자 조형. 드래그하거나 방향키로 회전하세요. Home 키로 초기화합니다."
              : "Interactive particle sculpture. Drag or use arrow keys to rotate. Home to reset."
          }
          onPointerDown={(event) => {
            event.currentTarget.setPointerCapture(event.pointerId);
            drag.current = { active: true, x: event.clientX, y: event.clientY };
            setDragging(true);
          }}
          onPointerMove={(event) => {
            if (!drag.current.active) return;
            rotation.current.targetY +=
              (event.clientX - drag.current.x) * 0.008;
            rotation.current.targetX +=
              (event.clientY - drag.current.y) * 0.006;
            drag.current.x = event.clientX;
            drag.current.y = event.clientY;
          }}
          onPointerUp={() => {
            drag.current.active = false;
            setDragging(false);
          }}
          onPointerCancel={() => {
            drag.current.active = false;
            setDragging(false);
          }}
          onLostPointerCapture={() => {
            drag.current.active = false;
            setDragging(false);
          }}
          onKeyDown={(event) => {
            if (
              [
                "ArrowLeft",
                "ArrowRight",
                "ArrowUp",
                "ArrowDown",
                "Home",
              ].includes(event.key)
            )
              event.preventDefault();
            if (event.key === "ArrowLeft") rotation.current.targetY -= 0.3;
            if (event.key === "ArrowRight") rotation.current.targetY += 0.3;
            if (event.key === "ArrowUp") rotation.current.targetX -= 0.3;
            if (event.key === "ArrowDown") rotation.current.targetX += 0.3;
            if (event.key === "Home") {
              rotation.current.targetX = -0.15;
              rotation.current.targetY = 0.35;
            }
          }}
        />
        {labels.map((item, index) => (
          <button
            key={item.id}
            className={`orbit-label orbit-label-${index}`}
            onClick={() => onProject(item.id)}
          >
            <span
              className="orbit-label-icon"
              style={{ background: item.color }}
            >
              {index === 0 ? "O" : index === 1 ? "K" : "F₁"}
            </span>
            <span>
              <strong>{item.title}</strong>
              <small>{item.caption}</small>
            </span>
            <ArrowUpRight size={14} />
          </button>
        ))}
        <span className="orbit-coordinate mono">
          37°33′ N<br />
          126°58′ E
        </span>
        <div className="orbit-hint mono">
          <MoveUpRight size={12} />
          {locale === "ko" ? "드래그하여 탐험하기" : "DRAG TO EXPLORE"}
        </div>
      </div>
      <div className="universe-bottom">
        <div
          className="shape-switch"
          aria-label={locale === "ko" ? "조형 선택" : "Sculpture shape"}
        >
          {(
            [
              { id: "orbit", label: "Orbit", Icon: Orbit },
              { id: "helix", label: "Helix", Icon: Dna },
              { id: "wave", label: "Wave", Icon: Waves },
            ] as const
          ).map(({ id, label, Icon }) => (
            <button
              key={id}
              aria-pressed={shape === id}
              onClick={() => setShape(id)}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>
        <button
          className="icon-button reset-orbit"
          aria-label={locale === "ko" ? "회전 초기화" : "Reset rotation"}
          onClick={() => {
            rotation.current.targetX = -0.15;
            rotation.current.targetY = 0.35;
          }}
        >
          <RotateCcw size={15} />
        </button>
      </div>
    </div>
  );
}
