import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true
    })
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'VueFlipReducedMotion',
      fileName: 'index',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: ['vue', 'gsap', '@vue-gsap-flip/core'],
      output: {
        globals: {
          'vue': 'Vue',
          'gsap': 'gsap',
          '@vue-gsap-flip/core': 'VueFlipCore'
        }
      }
    }
  }
})
