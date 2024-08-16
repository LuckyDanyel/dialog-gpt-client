import path from 'path';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: 'http://localhost:5173/dialog',
  plugins: [vue()],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src'),
    }
  },  
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@src/assets/variables.scss";`
      }
    }
  }
})
