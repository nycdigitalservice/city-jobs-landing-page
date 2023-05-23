import { resolve } from 'path'
import { defineConfig } from 'vite';
import UnoCSS from 'unocss/vite';
import postcssPresetEnv from 'postcss-preset-env';
import postcssSelectorNamespace from 'postcss-selector-namespace';
import posthtmlPlugin from './vite-plugin-posthtml';
import posthtmlExtend from 'posthtml-extend';
import copy from 'rollup-plugin-copy';
import { fileURLToPath } from 'node:url';

const cardId = fileURLToPath(
          new URL(
            'src/js/components/NYCEventCard.js',
            import.meta.url
          )
        )

// console.log(cardId, import.meta.url);

const config = defineConfig({
  root: resolve(__dirname, 'src'),
  server: {
    watch: {
      ignored: ['!**/src/public/assets/**/**']
    }
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
    // target: 'es2015',
    minify: false,
    cssMinify: false,
    cssCodeSplit: false,
    modulePreload: false,
    rollupOptions: {
      output: {
        // assetFileNames: "[name].[ext]",
        format: 'iife',
        // globals: {
        //   [cardId]: 'globalVariable',
        // }
      },
      // external: [
      //   cardId
      // ],
      plugins: [
        copy({
          targets: [
            {
              src: resolve(__dirname, 'src/js/components'),
              dest: resolve(__dirname, 'dist/assets/home/js/pages/jobs/2023'),
            },
          ],
          hook: 'writeBundle'
        })
      ]
    },
  },
  css: {
    postcss: {
      plugins: [
        postcssPresetEnv({
          // autoprefixer: { grid: "autoplace" },
          // browsers: 'dead',
          stage: 2,
          features: {
            'nesting-rules': true,
            'custom-selectors': true,
            // 'custom-properties': { preserve: false },
            'custom-properties': true,
            'clamp': true,
            'gap-properties': true,
            'logical-properties-and-values': true
          }
        }),
        postcssSelectorNamespace({
          selfSelector: ':--jobs',
          ignoreRoot: true,
          rootSelector: ':root',
          namespace: '#jobs-2023'
        })
      ]
    }
  },
  plugins: [
    posthtmlPlugin({
      plugins: [
        posthtmlExtend({
          root: resolve(__dirname, 'src')
        })
      ]
    }),
    UnoCSS(),
  ],
});

export default config;
