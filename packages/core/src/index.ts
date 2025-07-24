/* eslint-disable */
export * from './types'
export * from './core'
export * from './utils'

export * from './composable/useFlip'
export { default as FlipElement } from './components/FlipElement.vue'
export { vFlip } from './directive/vflip'

// Re-export the config types for convenience
export type { FlipElementConfig, BaseFlipElementConfig } from './types'
