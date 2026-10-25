# Sei Hee Han — Ideas into impact.

An interactive portfolio for a developer turned product manager. Built with Next.js 16, React 19, TypeScript, and a custom Canvas particle sculpture.

The visual language pairs warm paper, editorial typography, olive tones, and orange accents. The project gallery uses the original local screenshots and brand images for all 20 projects. No 3D engine, animation framework, or remote visual assets are required for the interactive scene.

## Getting Started

Install dependencies and start the development server:

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Interactions

- Drag the particle sculpture or focus it and use arrow keys; Home resets its rotation. Orbit, Helix, and Wave morph between three shapes.
- Open projects from the sculpture, featured images, archive, or career chapters. Detail dialogs include a full-size image link.
- Browse large image cards by default, or switch to a spacious image-and-text list. Filter all 20 projects and expand the archive.
- Press Ctrl+K or Cmd+K to search projects, companies, and skills. Arrow keys select results, Enter opens a project, and Escape closes dialogs.
- Explore four career chapters with tabs, arrow controls, or keyboard navigation.
- Switch Korean/English and save a motion preference. System reduced-motion preferences are respected.
- Download a portfolio PDF, copy the contact email, or open an email draft.

## Content and implementation

- `src/lib/i18n.ts`: existing bilingual project descriptions and source content.
- `src/lib/portfolio.ts`: project identifiers, categories, images, career chapters, and verified contact links.
- `src/components/Portfolio.tsx`: page composition, archive, timeline, preferences, and contact actions.
- `src/components/OrbitScene.tsx`: projected 3D particles, pointer capture, keyboard controls, and shape morphing. Rendering pauses its work outside the viewport or when the document is hidden; pixel density is capped at 2.
- `src/components/PortfolioDialogs.tsx`: native modal dialogs with focus trapping and Escape support.
- `src/components/ProjectMedia.tsx`: original imagery shared by featured cards, the archive, and dialogs; source aspect ratios are preserved.
- `src/lib/export-resume.ts`: dynamically loaded PDF export with page breaks at project boundaries.
- `src/app/portfolio.css`: responsive design, hover depth, reduced motion, and print styles.
- `src/app/projects.css`: image-led cards and list layouts, including portrait screenshots and mobile layouts.

Readable UI text has a 14px minimum, with 16–18px body text, generous line spacing, and stronger secondary-text contrast. Mobile career tabs use two columns to preserve readable labels. Fonts use Next.js font optimization plus the existing Pretendard CDN stylesheet.

## Validation

```bash
npm run lint
npm run build
npx playwright install chromium
npm run test:e2e
```

The browser suite covers sculpture interaction, project dialogs, filtering, layout changes, keyboard search, career navigation, persistent preferences, PDF file output, mobile navigation, and reduced motion. Tests start a local server on port 3100, or reuse an existing one outside CI. Set `PLAYWRIGHT_EXECUTABLE_PATH` to use an already-installed Chromium binary.

Production: `npm run build` followed by `npm start`. The home page is statically prerendered; interactivity hydrates on the client.

For deployment outside Vercel, set `NEXT_PUBLIC_SITE_URL` to the site's canonical origin so share-image URLs resolve correctly. Vercel production/preview domains are detected automatically; local development defaults to `http://localhost:3000`.
