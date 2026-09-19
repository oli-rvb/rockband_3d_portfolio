import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Models Home needs right away, plus the self-hosted Draco decoder. Listed by basename
// (no extension) so the plugin below can find them in both dev and build modes.
const HOME_MODELS = ['night_sky_hd2', 'ile_flottante_text', 'plane', 'otto_vibing']
const DRACO_FILES = ['draco/draco_wasm_wrapper.js', 'draco/draco_decoder.wasm']

// Injects <link rel="preload" as="fetch"> tags for the models/decoder above, so the browser
// starts fetching them alongside the JS bundle instead of waiting for R3F's Suspense tree to
// mount and request them. as="fetch" + crossorigin="anonymous" makes the browser reuse the
// preloaded response for three's FileLoader fetch (mode cors, credentials same-origin).
function preloadHomeModels() {
  let base = '/'
  return {
    name: 'preload-home-models',
    enforce: 'post',
    configResolved(config) {
      base = config.base
    },
    transformIndexHtml(html, ctx) {
      const hrefs = HOME_MODELS.map((model) => {
        if (ctx.bundle) {
          const asset = Object.values(ctx.bundle).find(
            (a) => a.type === 'asset' && a.name === `${model}.glb`
          )
          return asset ? base + asset.fileName : null
        }
        return `${base}src/assets/3d/${model}.glb`
      }).filter(Boolean)

      hrefs.push(...DRACO_FILES.map((file) => base + file))

      return hrefs.map((href) => ({
        tag: 'link',
        attrs: { rel: 'preload', as: 'fetch', crossorigin: 'anonymous', href },
        injectTo: 'head',
      }))
    },
  }
}

// Third-party code the Home page loads eagerly, split out of the app chunk so an app-code
// deploy only invalidates the small index chunk (hashed files are cached for a year, see
// public/.htaccess). Only list packages Home needs up front: a lazy-route-only dependency
// (the About timeline, emailjs) placed here would join the initial download.
// React and R3F share one chunk on purpose: split apart, Rollup's shared CommonJS helper
// lands in one of them and the two chunks end up importing each other.
const VENDOR_CHUNKS = {
  three: /[\\/]node_modules[\\/]three[\\/]/,
  vendor: /[\\/]node_modules[\\/](react|react-dom|scheduler|react-router|react-router-dom|@remix-run[\\/]router|@react-three[\\/][^\\/]+|three-stdlib)[\\/]/,
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), preloadHomeModels()],
  assetsInclude: ['**/*.glb'],
  base: '/bluesuburbhour/',
  build: {
    // The three chunk is ~650 kB on its own and cannot shrink: R3F imports the whole
    // `three` namespace to build its JSX catalogue, so tree-shaking removes nothing.
    // 700 kB accepts it while still flagging any other chunk that grows unexpectedly.
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks: (id) => Object.keys(VENDOR_CHUNKS).find((name) => VENDOR_CHUNKS[name].test(id)),
      },
    },
  },
})
