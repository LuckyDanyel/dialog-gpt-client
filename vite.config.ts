import { fileURLToPath, URL } from "url";
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: 'http://localhost:5173/dialog',
  plugins: [vue()],
  resolve: {
    alias: [ { find: '@src', replacement: fileURLToPath(new URL('./src', import.meta.url)) } ]
  },  
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@src/assets/variables.scss";`
      }
    }
  }
})
