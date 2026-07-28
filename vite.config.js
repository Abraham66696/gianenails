import { defineConfig } from 'vite'
import { copyFileSync, existsSync, mkdirSync } from 'fs'
import { resolve } from 'path'

const staticScripts = [
  'supabase-config.js',
  'auth.js',
  'appointments.js',
  'storage.js',
  'web.js'
]

function copyClassicScripts() {
  return {
    name: 'copy-classic-scripts',
    closeBundle() {
      const distDir = resolve(__dirname, 'dist')
      mkdirSync(distDir, { recursive: true })

      staticScripts.forEach((fileName) => {
        const source = resolve(__dirname, fileName)
        if (existsSync(source)) {
          copyFileSync(source, resolve(distDir, fileName))
        }
      })
    }
  }
}

export default defineConfig({
  root: '.',
  plugins: [copyClassicScripts()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  },
  server: {
    port: 5173,
    open: true
  }
})
