import extractorSvelte from '@unocss/extractor-svelte'
import { colorResolver } from '@unocss/preset-mini/utils'
import {
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default {
  presets: [
    presetUno(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        big: 'Vast Shadow',
        big1: 'Holtwood One SC',
        sans: 'Michroma',
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  safelist: [],
  rules: [
    [
      /^text-stroked-(.+)$/,
      (...a) =>
        Object.assign(colorResolver('--stroke-color', 'text-stroked')(...a), {
          'text-shadow':
            '-3px -3px var(--stroke-color),' +
            '-3px  3px var(--stroke-color),' +
            '3px -3px var(--stroke-color),' +
            '3px  3px var(--stroke-color)',
        }),
      { autocomplete: 'text-stroked-$colors' },
    ],
  ],
  shortcuts: [
    {
      screen: 'w-screen h-screen',
      full: 'w-full h-full',
      'max-full': 'max-w-full max-h-full',
      'max-screen': 'max-w-screen max-h-screen',
    },
    [/^ofade-([\d]*)$/, ([, c]) => `transition-opacity duration-${c}`],
  ],
  extractors: [extractorSvelte],
}
