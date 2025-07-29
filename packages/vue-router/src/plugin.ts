import type { FlipElementConfig, FlipManager, VueFlipPlugin } from '@vue-gsap-flip/core'
import { deepMerge } from '@vue-gsap-flip/core'
import { shallowRef, watch } from 'vue'
import type { RouteLocationNormalizedGeneric } from 'vue-router'
import { useRouter } from 'vue-router'

import type { RouteConfig } from './types'

function isAllowedRoute (permission: RouteConfig, route: RouteLocationNormalizedGeneric) {
  const isSameRouteName = permission.name instanceof RegExp
    ? permission.name.test(route.name as string)
    : permission.name === route.name

  if (!isSameRouteName) return false
  return !permission.params || (route.params && Object.entries(permission.params).every(([key, configParam]) => {
    const routeParam = route.params[key]
    if (Array.isArray(routeParam) && Array.isArray(configParam)) {
      return configParam.every(param => routeParam.includes(param))
    } else if (Array.isArray(routeParam)) {
      return routeParam.includes(configParam as string)
    } else if (Array.isArray(configParam)) {
      // configuration define an array of params, but the route doesn't have an array
      return false
    } else {
      return routeParam === configParam
    }
  }))
}

export const VueFlipRouterPlugin: VueFlipPlugin = {
  name: 'VueFlipRouter',

  install (flipManager: FlipManager) {
    const router = useRouter()
    const nextRoute = shallowRef<RouteLocationNormalizedGeneric>()
    const prevRoute = shallowRef<RouteLocationNormalizedGeneric>()

    router.beforeResolve((to, from) => {
      nextRoute.value = to
      prevRoute.value = from
    })

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
    const stopWatcher = watch(nextRoute, () => {
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
