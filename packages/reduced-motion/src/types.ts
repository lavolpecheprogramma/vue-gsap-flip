// @ts-expect-error import
import type { FlipElementConfigAugmentation } from '@vue-gsap-flip/core'

export interface ReducedMotionFlipElementConfig {
  respectReducedMotion?: boolean
}

// Extend the core type augmentation interface
declare module '@vue-gsap-flip/core' {
  interface FlipElementConfigAugmentation extends ReducedMotionFlipElementConfig {}
}
