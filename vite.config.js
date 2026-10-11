import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2022',
    // three.js is lazy-loaded with the 3D scenes and is expected to be large
    chunkSizeWarningLimit: 1000,
  },
})
