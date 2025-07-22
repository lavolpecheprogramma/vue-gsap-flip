// @ts-expect-error import
import type { FlipElementConfigAugmentation } from '@vue-gsap-flip/core'
// generic type
import type { BaseFlipElementConfig } from '@vue-gsap-flip/core'
import type { RouteLocationNormalizedGeneric } from 'vue-router'

export interface RouteFlipConfig {
  from?: Pick<RouteLocationNormalizedGeneric, 'name' | 'params'>[]
  params?: RouteLocationNormalizedGeneric['params']
}

export interface RouteConfig {
  config?: BaseFlipElementConfig
  name: string | RegExp
  params?: RouteLocationNormalizedGeneric['params']
}

export interface RouterFlipElementConfig {
  routes?: (RouteConfig & { from?: RouteConfig[] })[]
}

// Extend the core type augmentation interface
declare module '@vue-gsap-flip/core' {
  interface FlipElementConfigAugmentation extends RouterFlipElementConfig {}
}
