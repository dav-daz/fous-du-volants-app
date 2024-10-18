import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/styles/main.scss";`,
         api: 'modern-compiler'
      }
    },
    postcss: {
      plugins: [
        autoprefixer()
      ]
    }
  }
}))