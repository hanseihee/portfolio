# Sei Hee Han — Ideas into impact.

An interactive portfolio for a developer turned product manager. Built with Next.js 16, React 19, and TypeScript.

The visual language follows a dark creative-studio style: a near-black canvas, crimson-to-violet gradient glows with film grain, condensed uppercase display type (Phudu) over Instrument Sans and Pretendard, and a single orange-red accent. Sections open with a numbered rule (`02 ——— • AT A GLANCE`). The project gallery uses the original local screenshots and brand images for all 20 projects. All motion is CSS plus two small IntersectionObservers; no animation library is required.

## Getting Started

Install dependencies and start the development server:

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Interactions

- Open projects from the hero collage, the featured rows, the card grid, search, or career chapters. Detail dialogs include a full-size image link.
- Browse an image-and-text list by default (featured projects first), or switch to cards, where featured projects become wide rows above the grid. Filter all 20 projects and expand the archive.
- Press Ctrl+K or Cmd+K to search projects, companies, and skills. Arrow keys select results, Enter opens a project, and Escape closes dialogs.
- Explore four career chapters with tabs, arrow controls, or keyboard navigation.
- Switch Korean/English and save a motion preference. System reduced-motion preferences are respected.
- Motion: the hero headline rises letter by letter, section rules draw in, headings reveal per character on scroll, counters count up, images slide in from the sides, featured rows scale in with scroll-driven animations, a keyword ticker loops, and the hero badge rotates. A pre-paint script in `layout.tsx` sets `<html data-motion>` so entrance animations never flash; every animation is scoped to `data-motion="full"`.
- Download a portfolio PDF, copy the contact email, or open an email draft.

## Content and implementation

- `src/lib/i18n.ts`: existing bilingual project descriptions and source content.
- `src/lib/portfolio.ts`: project identifiers, categories, images, career chapters, and verified contact links.
- `src/components/Portfolio.tsx`: page composition, archive, timeline, preferences, contact actions, and the scroll-reveal observer (it writes `data-shown`).
- `src/components/SplitText.tsx`: per-character display copy for staggered reveals; screen readers get the sentence once.
- `src/components/CountUp.tsx`: server-rendered final value that counts up once in view when motion is on.
- `src/components/PortfolioDialogs.tsx`: native modal dialogs with focus trapping and Escape support.
- `src/components/ProjectMedia.tsx`: original imagery shared by featured cards, the archive, and dialogs; source aspect ratios are preserved.
- `src/lib/export-resume.ts`: dynamically loaded PDF export with page breaks at project boundaries.
- `src/app/portfolio.css`: design tokens, sections, dialogs, the motion layer, responsive rules, and print styles.
- `src/app/projects.css`: featured rows, image-led cards and list layouts, including portrait screenshots and mobile layouts.

Readable UI text has a 14px minimum, with 16–18px body text, generous line spacing, and stronger secondary-text contrast. Mobile career tabs use two columns to preserve readable labels. Fonts use Next.js font optimization (Phudu, Instrument Sans) plus the existing Pretendard CDN stylesheet for Korean.

## Validation

```bash
npm run lint
npm run build
npx playwright install chromium
npm run test:e2e
```

The browser suite covers project dialogs, filtering, layout changes, keyboard search, career navigation, persistent preferences, PDF file output, mobile navigation, reduced motion, and scroll reveals with counters. Tests start a local server on port 3100, or reuse an existing one outside CI. Set `PLAYWRIGHT_EXECUTABLE_PATH` to use an already-installed Chromium binary.

Production: `npm run build` followed by `npm start`. The home page is statically prerendered; interactivity hydrates on the client.

For deployment outside Vercel, set `NEXT_PUBLIC_SITE_URL` to the site's canonical origin so share-image URLs resolve correctly. Vercel production/preview domains are detected automatically; local development defaults to `http://localhost:3000`.
