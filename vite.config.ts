import {vitePlugin as remix} from '@remix-run/dev'
import {installGlobals} from '@remix-run/node'
import {vercelServerlessPreset} from '@resolid/remix-plugins/vercel-serverless'
import {defineConfig} from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

installGlobals()

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    remix({
      presets: [
        vercelServerlessPreset({
          regions: 'iad1',
          cleanUrls: true,
          cacheFiles: [
            'favicon.svg',
            'apple-touch-icon.png',
            'manifest.webmanifest',
          ],
          cacheFolders: ['icons', 'images'],
        }),
      ],
    }),
    tsconfigPaths(),
  ],
  optimizeDeps: {
    exclude: ['@resvg/resvg-js'],
  },
})
