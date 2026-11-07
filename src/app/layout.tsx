import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Phudu } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import "./portfolio.css";
import "./projects.css";

const phudu = Phudu({
  variable: "--font-phudu",
  subsets: ["latin"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
});

// Resolve the motion preference before first paint so entrance animations
// never flash. Mirrors motionSnapshot() in Portfolio.tsx.
const motionScript = `(function(){var d=document.documentElement,s=null;try{s=localStorage.getItem("portfolio-motion")}catch(e){}var r=s?s==="reduced":window.matchMedia("(prefers-reduced-motion: reduce)").matches;d.dataset.motion=r?"reduced":"full"})()`;

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : "http://localhost:3000"),
  ),
  title: "한세희 · Sei Hee Han — Ideas into impact.",
  description:
    "개발자 출신 프로덕트 매니저 한세희. OP.GG, 김프가, F1 BOXBOX — 기술을 이해하고 사람을 위한 제품을 만듭니다.",
  keywords: ["한세희", "Sei Hee Han", "Product Manager", "portfolio", "OP.GG"],
  authors: [{ name: "Sei Hee Han" }],
  openGraph: {
    title: "Sei Hee Han — Ideas into impact.",
    description:
      "Developer’s mind. Product’s heart. Explore the work of a developer turned product manager.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#02090f",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${phudu.variable} ${instrumentSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
