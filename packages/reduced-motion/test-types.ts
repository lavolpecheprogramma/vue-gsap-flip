// This file demonstrates that when the reduced-motion plugin is imported,
// the FlipElementConfig type automatically includes reduced-motion-specific properties

import type { FlipElementConfig } from '@vue-gsap-flip/core'

// Import the reduced-motion types to trigger the module augmentation
import './src/types'

// This should now work without errors - the config type includes reduced-motion properties
const config: FlipElementConfig = {
  clone: true,
  respectReducedMotion: true // This should be available due to type augmentation
}

// Test that we can explicitly disable reduced motion respect
const config2: FlipElementConfig = {
  clone: false,
  respectReducedMotion: false // This should also be available
}

// This should also work - the base FlipElementConfig properties are still available
const basicConfig: FlipElementConfig = {
  clone: true,
  flipVars: {
    duration: 0.5
  }
}

export { basicConfig, config, config2 }
