import { presetWind } from '@unocss/preset-wind3'
import transformerDirectives from '@unocss/transformer-directives'
import { defineConfig } from 'unocss'

export default defineConfig({
  safelist: [
    'button',
    'overflow-hidden'
  ],
  shortcuts: {
    btn: 'bg-blue-500 hover:bg-blue-700 c-white px-4 py-2 rounded-1 cursor-pointer'
  },
  blocklist: [
    'container',
    /^h[1-6]$/,
    /^p\d+$/
  ],
  presets: [
    // @ts-expect-error types for unocss are not right
    presetWind()
  ],
  transformers: [
    transformerDirectives()
  ]
})
