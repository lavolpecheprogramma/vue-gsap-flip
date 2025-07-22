// @ts-expect-error import
import type { FlipElementConfigAugmentation } from '@vue-gsap-flip/core'
// generic type
import type { BaseFlipElementConfig } from '@vue-gsap-flip/core'

export interface RouteFlipConfig {
  from?: string[]
}

export interface RouteConfig {
  config?: BaseFlipElementConfig
  name: string | RegExp
}

export interface RouterFlipElementConfig {
  routes?: (RouteConfig & { from?: RouteConfig[] })[]
}

// Extend the core type augmentation interface
declare module '@vue-gsap-flip/core' {
  interface FlipElementConfigAugmentation extends RouterFlipElementConfig {}
}
