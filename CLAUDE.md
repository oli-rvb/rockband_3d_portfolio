# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server (with `--host` so it's reachable on the LAN).
- `npm run build` — production build to `dist/`.
- `npm run preview` — serve the built `dist/` for local verification.
- `npm run lint` — ESLint over `.js`/`.jsx` (config: `.eslintrc.cjs`, ignores `dist` and `public` — the latter holds the vendored, unlintable Draco decoder). Configured with `--max-warnings 0`, so warnings fail the lint step.

There is no test runner configured in this project.

## Environment

Contact form uses EmailJS and reads three Vite env vars (must be prefixed `VITE_APP_` to be exposed to the client):

- `VITE_APP_EMAILJS_SERVICE_ID`
- `VITE_APP_EMAILJS_TEMPLATE_ID`
- `VITE_APP_EMAILJS_PUBLIC_KEY`

Copy `.env.example` to `.env` and fill them in. `.env` is gitignored.

## Architecture

Single-page React 18 app built with Vite + Tailwind, using `@react-three/fiber` (R3F) and `@react-three/drei` for 3D (drei's `useAnimations` drives the glTF animations; `@react-spring/three` is still in `package.json` but no longer imported). Routing is `react-router-dom` v6 with four routes wired in `src/App.jsx`: `/` (Home, eager) and `/about`, `/projects`, `/contact` (each `lazy()`-loaded, wrapped in a top-level `<Suspense fallback={null}>`).

### 3D scene loading pipeline (Home page)

The Home page (`src/pages/Home.jsx`) is the centerpiece and demonstrates a non-trivial loading pattern that other pages mostly don't use. Read these together to understand it:

1. `vite.config.js` — an inline `preloadHomeModels()` plugin injects `<link rel="preload" as="fetch" crossorigin="anonymous">` tags into `<head>` (via `transformIndexHtml`) for every model listed in its `HOME_MODELS` array plus the two Draco decoder files, so the browser starts fetching them alongside the JS bundle. **Adding a model to Home means adding its basename to `HOME_MODELS`.**
2. `src/utils/draco.js` — `DRACO_DECODER_PATH` points at the self-hosted decoder in `public/draco` (copied from `three/examples/jsm/libs/draco/gltf`), so decoding never depends on a third-party CDN. Every `useGLTF()` call passes it as the second argument, and every model file also calls `useGLTF.preload(<scene>, DRACO_DECODER_PATH)` at module scope so fetching starts at import time, before the component even mounts.
3. `src/components/SceneLoader.jsx` — full-screen overlay shown over the Canvas. It reads `useProgress()` from drei itself (a zustand store bound to `THREE.DefaultLoadingManager`, so it works even though the component renders outside the `<Canvas>`) and takes no props. Hides itself ~300 ms after progress hits 100 and `active` goes false. There is no separate progress-tracking component.
4. Models are split across multiple `<Suspense>` boundaries inside the Canvas so critical models (Sky, Island) block first and secondary models (Plane, OttoVibing) stream in afterwards.

The Canvas runs `frameloop="demand"`: nothing re-renders unless something calls `invalidate()` (from `useThree()`). R3F invalidates on its own for mount/prop changes/resize, but any ongoing animation must invalidate explicitly — Island does it every frame while dragging or coasting (stops scheduling once damped speed hits exactly 0), Plane/OttoVibing do it once after `play()`/`stop()`.

### Island as a stage-driven controller

`src/models/Island.jsx` is the main interactive model. It loads the GLB scene with `useGLTF` and renders it as a single `<primitive object={scene} />` (the GLB uses `EXT_mesh_gpu_instancing` for repeated props — trees, rocks, grass, amps, stacks — so there's no per-node gltfjsx mesh tree to hand-maintain; shadow flags are set once via `scene.traverse()` instead: everything gets `receiveShadow`, everything casts except the ground node `ile` (avoids self-shadow acne), and `InstancedMesh`es get `frustumCulled = false` since GLTFLoader doesn't compute an instance-aware bounding sphere). It also drives Home's UI: pointer/touch drag rotates the island, and the current rotation maps to a `currentStage` (1–4) that Home uses to swap the `HomeInfo` card with a fade transition. Stage detection is quarter-circle based (each 90° slice of the normalized rotation maps to a fixed stage via `stageMapping`) — there is no `stageRangeSize` knob any more; adjust the quarter-circle mapping directly if stage boundaries need to move.

### Models and assets

- `src/models/*.jsx` — one component per `.glb`. They `useGLTF(<scene>, DRACO_DECODER_PATH)` from drei and import their `.glb` from `src/assets/3d/`. Vite is configured (`vite.config.js`) with `assetsInclude: ['**/*.glb']` so glTF imports return URLs.
- `src/assets/icons` and `src/assets/images` re-export icon/image URLs through index files; `src/constants/index.js` consumes those re-exports to build the skills/experiences/projects data used by About and Projects.

#### Optimizing models (glTF-Transform)

When a model is re-exported from Blender, re-run it through [`@gltf-transform/cli`](https://gltf-transform.dev/) before committing. Commands actually used for the current assets:

```bash
# Sky: bake the 2048x1024 starfield PNG to WebP (lossy is fine, it's a background texture)
npx @gltf-transform/cli@4 webp in.glb out.glb --quality 90

# Island: batch repeated props into GPU instances, halve texture resolution, WebP (lossless — it has readable text/UI-like detail), then Draco-compress geometry
npx @gltf-transform/cli@4 instance in.glb tmp.glb
npx @gltf-transform/cli@4 resize tmp.glb tmp.glb --width 2048 --height 2048
npx @gltf-transform/cli@4 webp tmp.glb tmp.glb --lossless true
npx @gltf-transform/cli@4 draco tmp.glb out.glb

# Plane: WebP (lossy) then Draco
npx @gltf-transform/cli@4 webp in.glb tmp.glb --quality 85
npx @gltf-transform/cli@4 draco tmp.glb out.glb
```

`instance` preserves node names for anything not batched (e.g. Island's ground node `ile` and the 4 skinned musician meshes); batched nodes come back as unnamed `InstancedMesh`es once loaded by three's `GLTFLoader`.

After changing any file under `src/assets/3d/`, regenerate `bluesuburbhour.zip` from a fresh `npm run build` before shipping — it's a committed production snapshot, not derived automatically.

### Debug GUI

`src/hooks/useGUI.jsx` wraps `lil-gui` in a `useEffect`. Several call sites (e.g. the commented-out block in `OttoVibing.jsx`) use it to tweak light/object transforms live. Keep these blocks commented out in committed code, and keep the `useGUI` import itself commented out or removed alongside them — an unused import fails lint, and an active block will throw at mount if the ref it reads is undefined.

### Styling

Tailwind with a small custom palette (`gray.200`, `black.500`, `blue.500`) and two custom font families (`worksans`, `poppins`) defined in `tailwind.config.js`. Global CSS lives in `src/index.css` (includes the `fade-card`/`fade-in`/`fade-out` classes used by Home's stage transition).

## Repo notes

- `dist/` is committed in the working tree but gitignored — don't hand-edit it; regenerate with `npm run build`.
- `GIT_GUIDE.md` and `SECURITY_GUIDE.md` are user-facing onboarding docs (in French/English) — they are not engineering specs and shouldn't be treated as source of truth for architecture decisions.
