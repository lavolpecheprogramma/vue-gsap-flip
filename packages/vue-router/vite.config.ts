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
      name: 'vue-gsap-flip-router',
      fileName: 'index',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: ['vue', 'gsap', 'vue-router', '@vue-gsap-flip/core'],
      output: {
        globals: {
          'vue': 'Vue',
          'gsap': 'gsap',
          'vue-router': 'VueRouter',
          '@vue-gsap-flip/core': 'VueFlipCore'
        }
      }
    }
  }
})
