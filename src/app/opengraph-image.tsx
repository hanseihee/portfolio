import { ImageResponse } from "next/og";

export const alt =
  "Sei Hee Han — Ideas into impact. Developer’s mind. Product’s heart.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: "#f6f5ef",
        color: "#252b27",
        padding: 65,
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 19,
          letterSpacing: 3,
          justifyContent: "space-between",
        }}
      >
        <span>SEI HEE HAN</span>
        <span style={{ color: "#748266", fontSize: 14 }}>
          PRODUCT BUILDER / SEOUL
        </span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 108,
            fontWeight: 600,
            letterSpacing: -7,
            lineHeight: 1.05,
          }}
        >
          <span>Ideas into</span>
          <span style={{ color: "#e75b37" }}>impact.</span>
        </div>
        <svg width="370" height="370" viewBox="0 0 370 370">
          <circle
            cx="185"
            cy="185"
            r="130"
            stroke="#bcc5ae"
            strokeWidth="1"
            fill="#e9ecdf"
          />
          <ellipse
            cx="185"
            cy="185"
            rx="175"
            ry="68"
            stroke="#e75b37"
            strokeWidth="2"
            fill="none"
            transform="rotate(-35 185 185)"
          />
          <ellipse
            cx="185"
            cy="185"
            rx="155"
            ry="90"
            stroke="#a5b195"
            strokeWidth="1"
            fill="none"
            transform="rotate(45 185 185)"
          />
          <ellipse
            cx="185"
            cy="185"
            rx="50"
            ry="130"
            stroke="#a5b195"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M55 185h260M75 120h220M75 250h220"
            stroke="#bcc5ae"
            strokeWidth="1"
          />
          <circle cx="315" cy="122" r="9" fill="#e75b37" />
          <circle cx="64" cy="259" r="5" fill="#748266" />
        </svg>
      </div>
      <div
        style={{
          display: "flex",
          borderTop: "1px solid #d9dcd2",
          paddingTop: 24,
          fontSize: 16,
          letterSpacing: 1,
          justifyContent: "space-between",
        }}
      >
        <span>DEVELOPER’S MIND. PRODUCT’S HEART.</span>
        <span style={{ color: "#748266" }}>OP.GG · KIMPGA · F1 BOXBOX</span>
      </div>
    </div>,
    size,
  );
}
