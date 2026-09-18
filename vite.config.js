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

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), preloadHomeModels()],
  assetsInclude: ['**/*.glb'],
  base: '/bluesuburbhour/'
})
