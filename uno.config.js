import { defineConfig, presetUno, presetIcons } from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      // scale: 1.2,
      // collections: {
      //   custom: {

      //   },
      //   ri: () => import('@iconify-json/ri/icons.json').then(i => i.default as any),
      // }
    })
  ]
});
