import path from 'path';
import { defineConfig } from 'vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import vue from '@vitejs/plugin-vue'
import { createHash } from 'crypto';
console.log(process.env)
const isProd = process.env.NODE_ENV;
const isDev = !isProd;
const domain = process.env.VITE_CHAT_GPT_DOMAIN_CLIENT;
// https://vitejs.dev/config/
export default defineConfig(({}) => {

  const hash = createHash('sha256')
    .update(Date.now().toString())
    .digest('hex')
    .slice(0, 8);

  const buildId = `dialog-widget-${hash}`;
  const styleId = `styles-${buildId}`;

  return {
    define: {
      'import.meta.env.BUILD_ID': JSON.stringify(buildId),
      'import.meta.env.STYLE_ID': JSON.stringify(styleId),
    },
    base: `${domain}/dialog`,
    plugins: [
      vue(),
      cssInjectedByJsPlugin({ styleId: buildId }),
    ],
    build: {
      rollupOptions: {
        output: {
          entryFileNames: `assets/js/main.js`,
          chunkFileNames: `assets/[ext]/[name]-[hash].js`,
          assetFileNames: `assets/[ext]/[name]-[hash].[ext]`,
        },
      },
    },
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
  }
})
