import type { FlipElementConfig, FlipManager, VueFlipPlugin } from '@vue-gsap-flip/core'
import { deepMerge } from '@vue-gsap-flip/core'
import type { Router } from 'vitepress'
import { shallowRef, watch } from 'vue'

import type { RouteConfig } from './types'

function isAllowedRoute (permission: RouteConfig, route: string) {
  return permission.name === route
}

export const VueFlipVitepressRouterPlugin: VueFlipPlugin = {
  name: 'VueFlipRouter',

  install (flipManager: FlipManager, config: unknown) {
    const nextRoute = shallowRef<string>()
    const prevRoute = shallowRef<string>()

    function needFlip (config: FlipElementConfig) {
      // no route configured, continue
      if (!config.routes) return true
      // no route to flip, stop execution
      if (!nextRoute.value) return false
      const configMatch = config.routes.find(route => isAllowedRoute(route, nextRoute.value!))
      // routes are configured but no route match, stop execution
      if (!configMatch) return false

      if (configMatch.from) {
        const prevRouteMatch = configMatch.from.find(route => isAllowedRoute(route, prevRoute.value!))
        if (!prevRouteMatch) return false
      }
      if (configMatch.config) {
        config = deepMerge<FlipElementConfig>(config, configMatch.config)
      }
      return true
    }

    function detachMiddleware (_id: string, _el: Element, config: FlipElementConfig) {
      return needFlip(config)
    }

    // Add middleware to the flip manager
    flipManager.addDetachMiddleware(detachMiddleware)

    // Watch for route changes and clean up orphan elements
    const router = (config as { router: Router }).router
    const stopWatcher = watch(router.route, (route, _prevRoute) => {
      prevRoute.value = nextRoute.value
      nextRoute.value = route.path
      for (const [id, data] of flipManager.store.entries()) {
        if (needFlip(data.config)) continue
        if (data.clone) document.body.removeChild(data.clone)
        flipManager.store.delete(id)
      }
    }, { deep: 3 })

    // Return uninstall function
    return () => {
      flipManager.addDetachMiddleware(detachMiddleware)
      stopWatcher()
    }
  }
}
