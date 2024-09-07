import path from 'path';
import { defineConfig, loadEnv } from 'vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import vue from '@vitejs/plugin-vue'
import { createHash } from 'crypto';
import autoprefixer from 'autoprefixer'
import * as variables from './src/assets/variables';


function getVariables (data: [string, string][]) {
  return `${[...data, ...Object.entries(variables)]
    .map(([key, value]) => `$${key}:${value}`)
    .join(';')};`;
}

export default defineConfig(({ mode }) => {

  const hash = createHash('sha256')
    .update(Date.now().toString())
    .digest('hex')
    .slice(0, 8);

  const buildId = `dialog-widget-${hash}`;
  const ROOT_APP_ID = `root-app-id-${buildId}`;
  const styleId = `head-styles-id-${buildId}`;

  const env = loadEnv('./env', process.cwd(), '');
  const domain = env.VITE_DOMAIN_CLIENT;

  return {
    define: {
      'import.meta.env.BUILD_ID': JSON.stringify(buildId),
      'import.meta.env.HEAD_STYLES_ID': JSON.stringify(styleId),
      'import.meta.env.ROOT_APP_ID': JSON.stringify(ROOT_APP_ID),
    },
    base: `${domain}/dialog`,
    plugins: [
      vue(),
      cssInjectedByJsPlugin({ styleId }),
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
          additionalData: `${getVariables([
            ['ROOT_APP_ID', ROOT_APP_ID],
          ])}`,
        }
      }
    }
  }
});
