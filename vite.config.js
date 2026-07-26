import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      input: './web.html'
    }
  },
  server: {
    port: 5173,
    open: true
  }
})
