import { resolve } from 'node:path'
import { defineConfig } from 'vitest/config'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

export default defineConfig({
  plugins: [
    devtools(),
    tanstackRouter({
      autoCodeSplitting: true, // already helps split route-level code
      routesDirectory: './src/routes',
      generatedRouteTree: './src/route-tree.gen.ts',
      enableRouteTreeFormatting: true,
      routeToken: '_layout',
    }),
    viteReact(),
    tailwindcss(),
  ],
  server: {
    watch: {
      ignored: [
        '**/node_modules/**',
        '**/.git/**',
        '**/dist/**',
        '**/build/**',
      ],
      usePolling: true,
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // normalize slashes
            const parts = id.split(/node_modules\//g)

            // last part after the last node_modules is the real pkg path
            const pkgPath = parts[parts.length - 1]

            // handle scoped packages (@scope/name)
            const pkgName = pkgPath.startsWith('@')
              ? pkgPath.split('/').slice(0, 2).join('/')
              : pkgPath.split('/')[0]

            // replace / in scoped names so they are valid filenames
            return pkgName.replace('/', '_').replace(/@/g, '_')
          }
        },
      },
    },
  },
})
