import { resolve } from 'path'
import { defineConfig, presetUno, presetIcons } from 'unocss';

// const componentPath = `${ resolve(__dirname, 'src') }/public/assets/home/js/pages/jobs/2023/components/NYCReel.js`;

export default defineConfig({
  safelist: 'i-ri:arrow-left-line i-ri:arrow-right-line text-lg w-full flex flex-col no-underline order-first text-xs !mt-0'.split(' '),
  blocklist: ['text-xs'],
  // theme: {
  //   colors: {
  //     primary: {
  //       400: 'hsla(209, 100%, 42%, 1)',
  //       500: 'hsla(208, 100%, 30%, 1)'
  //     }
  //   }
  // },
  presets: [
    presetUno({ variablePrefix: 'nyc-' }),
    presetIcons({
      scale: 1.2,
    })
  ],
});
