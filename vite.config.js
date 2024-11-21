import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/frontend/' : '/',
  plugins: [
    vue(),
    VueDevTools(),
  ],
  define: {
    'import.meta.env.VITE_APP_API_URL': JSON.stringify(process.env.VITE_APP_API_URL)
  },
  optimizeDeps: {
    include: ['jwt-decode'],
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer,
      ],
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})