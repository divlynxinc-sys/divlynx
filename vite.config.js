import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vendor code changes far less often than site code. Splitting it into its own
// chunks lets returning visitors keep it cached across deploys.
function vendorChunk(id) {
  if (!id.includes('node_modules')) return undefined
  if (/[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id)) return 'react'
  if (/[\\/]node_modules[\\/](react-router|react-router-dom)[\\/]/.test(id)) return 'router'
  if (/[\\/]node_modules[\\/](framer-motion|motion-dom|motion-utils)[\\/]/.test(id)) return 'motion'
  return 'vendor'
}

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  build: {
    target: 'es2020',
    cssMinify: true,
    // The SSR build feeds the prerenderer and must stay a single entry.
    rollupOptions: isSsrBuild ? {} : { output: { manualChunks: vendorChunk } },
  },
}))
