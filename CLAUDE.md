# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server (with `--host` so it's reachable on the LAN).
- `npm run build` — production build to `dist/`.
- `npm run preview` — serve the built `dist/` for local verification.
- `npm run lint` — ESLint over `.js`/`.jsx`. Configured with `--max-warnings 0`, so warnings fail the lint step.

There is no test runner configured in this project.

## Environment

Contact form uses EmailJS and reads three Vite env vars (must be prefixed `VITE_APP_` to be exposed to the client):

- `VITE_APP_EMAILJS_SERVICE_ID`
- `VITE_APP_EMAILJS_TEMPLATE_ID`
- `VITE_APP_EMAILJS_PUBLIC_KEY`

Copy `.env.example` to `.env` and fill them in. `.env` is gitignored.

## Architecture

Single-page React 18 app built with Vite + Tailwind, using `@react-three/fiber` (R3F) and `@react-three/drei` for 3D, plus `@react-spring/three` for animation. Routing is `react-router-dom` v6 with four routes wired in `src/App.jsx`: `/` (Home), `/about`, `/projects`, `/contact`.

### 3D scene loading pipeline (Home page)

The Home page (`src/pages/Home.jsx`) is the centerpiece and demonstrates a non-trivial loading pattern that other pages mostly don't use. Read these together to understand it:

1. `src/utils/preload.js` — `preloadModels()` injects `<link rel="prefetch">` tags for every `.glb` so the browser begins fetching before R3F asks for them. Called from a `useEffect` on Home mount.
2. `src/components/ProgressTracker.jsx` — a renderless R3F child that reads `useProgress()` from drei and lifts `{ progress, active }` up via callback prop. Must live **inside** the `<Canvas>`.
3. `src/components/SceneLoader.jsx` — full-screen overlay shown over the Canvas, driven by the lifted progress state. Hides itself ~300 ms after progress hits 100 and `active` goes false.
4. Models are split across multiple `<Suspense>` boundaries inside the Canvas so critical models (Sky, Island) block first and secondary models (Plane, OttoVibing) stream in afterwards.

When changing the loading flow, keep ProgressTracker inside `<Canvas>` (it needs the R3F context) and keep SceneLoader outside it.

### Island as a stage-driven controller

`src/models/Island.jsx` is the main interactive model. It is large (~2k lines, gltfjsx-generated mesh tree at the bottom) and also drives Home's UI: pointer/touch drag rotates the island, and the current rotation maps to a `currentStage` (1–4) that Home uses to swap the `HomeInfo` card with a fade transition. The `stageRangeSize` constant near the top of the file widens/narrows the rotation ranges that trigger each stage — adjust that rather than the per-stage thresholds when stages feel too sticky or too sensitive.

### Models and assets

- `src/models/*.jsx` — one component per `.glb`, generated/derived from gltfjsx. They `useGLTF(<scene>)` from drei and import their `.glb` from `src/assets/3d/`. Vite is configured (`vite.config.js`) with `assetsInclude: ['**/*.glb']` so glTF imports return URLs.
- `src/assets/icons` and `src/assets/images` re-export icon/image URLs through index files; `src/constants/index.js` consumes those re-exports to build the skills/experiences/projects data used by About and Projects.

### Debug GUI

`src/hooks/useGUI.jsx` wraps `lil-gui` in a `useEffect`. Several call sites (e.g. the commented-out block in `Home.jsx`) use it to tweak light/object transforms live. Keep these blocks commented out in committed code — they reference refs that may be undefined and will throw at mount otherwise.

### Styling

Tailwind with a small custom palette (`gray.200`, `black.500`, `blue.500`) and two custom font families (`worksans`, `poppins`) defined in `tailwind.config.js`. Global CSS lives in `src/index.css` (includes the `fade-card`/`fade-in`/`fade-out` classes used by Home's stage transition).

## Repo notes

- `dist/` is committed in the working tree but gitignored — don't hand-edit it; regenerate with `npm run build`.
- `GIT_GUIDE.md` and `SECURITY_GUIDE.md` are user-facing onboarding docs (in French/English) — they are not engineering specs and shouldn't be treated as source of truth for architecture decisions.
