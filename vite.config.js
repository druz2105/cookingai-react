import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'

export default defineConfig({
  base: "/",
  plugins: [react()],
  preview: {
    port: 8080,
    strictPort: true,
  },
  server: {
    port: 8080,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:8080",
    allowedHosts: ['cookingai-react.fly.dev'], // 👈 Add this line
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  }
})
