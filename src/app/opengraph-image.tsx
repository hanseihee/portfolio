import { ImageResponse } from "next/og";

export const alt =
  "Sei Hee Han — Ideas into impact. Developer’s mind. Product’s heart.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function Star({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <path
        d="M50 7v86M7 50h86M19.6 19.6l60.8 60.8M80.4 19.6 19.6 80.4"
        stroke="#fd492e"
        strokeWidth="12"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        backgroundColor: "#02090f",
        backgroundImage:
          "radial-gradient(circle at 0% 0%, #b20e28 0%, transparent 55%), radial-gradient(circle at 45% 40%, #760848 0%, transparent 55%), radial-gradient(circle at 25% 100%, #4212aa 0%, transparent 55%)",
        color: "#fff",
        padding: 65,
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: 2,
          justifyContent: "space-between",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Star size={28} />
          SEI HEE HAN
        </span>
        <span style={{ color: "rgba(255,255,255,0.72)", fontSize: 16 }}>
          PRODUCT BUILDER / SEOUL
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 132,
          fontWeight: 800,
          letterSpacing: -4,
          lineHeight: 0.95,
        }}
      >
        <span>IDEAS</span>
        <span style={{ display: "flex", alignItems: "center" }}>
          <span style={{ display: "flex", marginRight: 24 }}>
            <Star size={104} />
          </span>
          INTO IMPACT
          <span style={{ color: "#fd492e" }}>.</span>
        </span>
      </div>
      <div
        style={{
          display: "flex",
          borderTop: "1px solid rgba(255,255,255,0.22)",
          paddingTop: 24,
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: 1,
          justifyContent: "space-between",
        }}
      >
        <span>DEVELOPER’S MIND. PRODUCT’S HEART.</span>
        <span style={{ color: "rgba(255,255,255,0.72)" }}>
          OP.GG · KIMPGA · F1 BOXBOX
        </span>
      </div>
    </div>,
    size,
  );
}
