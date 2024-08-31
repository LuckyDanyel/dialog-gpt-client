import path from 'path';
import { defineConfig, loadEnv } from 'vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import vue from '@vitejs/plugin-vue'
import { createHash } from 'crypto';
import autoprefixer from 'autoprefixer'

export default defineConfig(({ mode }) => {

  const hash = createHash('sha256')
    .update(Date.now().toString())
    .digest('hex')
    .slice(0, 8);

  const buildId = `dialog-widget-${hash}`;
  const styleId = `styles-dialog-${buildId}`;

  const env = loadEnv('./env', process.cwd(), '');
  const domain = env.VITE_DOMAIN_CLIENT;

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
    publicDir: 'dist',
    build: {
      rollupOptions: {
        input: {
          main: './src/main.ts',
        },
        output: [
          {
            dir: 'dist',
            entryFileNames: '[name].js',
            chunkFileNames: '[name].js',
            assetFileNames: 'assets/[name]-[hash].[ext]',
          },
        ],
      },
    },
    resolve: {
      alias: {
        '@src': path.resolve(__dirname, './src'),
      }
    },  
    css: {

      postcss: {
        plugins: [autoprefixer({ })],
      },
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@src/assets/variables.scss";`
        }
      }
    }
  }
})
