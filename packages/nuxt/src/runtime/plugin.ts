import { addRouteMiddleware, defineNuxtPlugin } from '#app'
import type { FlipElementConfig, VueFlipPlugin } from '@vue-gsap-flip/core'
import { flipManager, vFlip } from '@vue-gsap-flip/core'
import { checkAllowedRoute } from '@vue-gsap-flip/vue-router'
import { directive, plugins } from '#build/vue-gsap-flip.config.mjs'
import { shallowRef, watch } from 'vue'
import type { RouteLocationNormalizedGeneric } from 'vue-router'

const nextRoute = shallowRef<RouteLocationNormalizedGeneric>()
const prevRoute = shallowRef<RouteLocationNormalizedGeneric>()

export const VueFlipNuxtRouterPlugin: VueFlipPlugin = {
  name: 'VueFlipNuxtRouter',
  install() {
    function detachMiddleware(_id: string, _el: Element, config: FlipElementConfig) {
      return checkAllowedRoute(config, nextRoute.value, prevRoute.value)
    }

    flipManager.addDetachMiddleware(detachMiddleware)

    const stopWatcher = watch(nextRoute, (to) => {
      for (const [id, data] of flipManager.store.entries()) {
        if (checkAllowedRoute(data.config, to, prevRoute.value)) continue
        if (data.clone) document.body.removeChild(data.clone)
        flipManager.store.delete(id)
      }
    }, { deep: 3 })

    return () => {
      flipManager.removeDetachMiddleware(detachMiddleware)
      stopWatcher()
    }
  },
}
export default defineNuxtPlugin((nuxtApp) => {
  // Register directive globally if enabled
  if (directive) {
    nuxtApp.vueApp.directive('flip', vFlip)
  }

  addRouteMiddleware('vue-gsap-flip', (to, from) => {
    nextRoute.value = to
    prevRoute.value = from
  }, { global: true })

  if (!flipManager.hasPlugin(VueFlipNuxtRouterPlugin)) {
    flipManager.registerPlugin(VueFlipNuxtRouterPlugin)
  }
  // Register plugins if provided
  if (plugins.length > 0) {
    plugins.forEach((plugin: VueFlipPlugin) => {
      if (!flipManager.hasPlugin(VueFlipNuxtRouterPlugin)) {
        flipManager.registerPlugin(plugin)
      }
    })
  }
})
