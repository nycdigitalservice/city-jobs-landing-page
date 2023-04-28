import { resolve } from 'path'
import { defineConfig } from 'vite';
import UnoCSS from 'unocss/vite';
import postcssPresetEnv from 'postcss-preset-env';
import postcssSelectorNamespace from 'postcss-selector-namespace';
import posthtmlPlugin from './vite-plugin-posthtml';
import posthtmlExtend from 'posthtml-extend';

export default defineConfig({
  root: resolve(__dirname, 'src'),
  build: {
    outDir: resolve(__dirname, 'dist'),
  },
  css: {
    // postcss: '../',
    postcss: {
      plugins: [
        postcssPresetEnv({
          stage: 2,
          features: {
            'nesting-rules': true,
            'custom-selectors': true
          }
        }),
        postcssSelectorNamespace({
          namespace: '#jobs-2023'
        })
      ]
    }
  },
  plugins: [
    posthtmlPlugin({
      // options: {
      //   type: null,
      // },
      plugins: [
        posthtmlExtend({
          root: resolve(__dirname, 'src')
        })
      ]
    }),
    UnoCSS(),
  ],
  optimizeDeps: {
    include: ['axe-core']
  }
});
