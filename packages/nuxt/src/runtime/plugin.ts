import { defineNuxtPlugin } from '#app'
import type { VueFlipPlugin } from '@vue-gsap-flip/core'
import { flipManager, vFlip } from '@vue-gsap-flip/core'
// @ts-expect-error import is not typed
import { directive, plugins } from '#build/vue-gsap-flip.config.mjs'

const registeredPlugins: string[] = []

export default defineNuxtPlugin((nuxtApp) => {
  // Register directive globally if enabled
  if (directive) {
    nuxtApp.vueApp.directive('flip', vFlip)
  }

  // Register plugins if provided
  if (plugins.length > 0) {
    plugins.forEach((plugin: VueFlipPlugin) => {
      if (!registeredPlugins.includes(plugin.name)) {
        flipManager.registerPlugin(plugin)
        registeredPlugins.push(plugin.name)
      }
    })
  }
})
