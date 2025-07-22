# Configuration

Vue Flip provides extensive configuration options to customize your flip animations.

## Flip Manager Configuration

The `useFlip()` composable accepts a configuration object with the following options:

```typescript
interface FlipConfig {
  // GSAP Flip configuration
  flipConfig?: FlipConfig
  // Plugin system configuration
  plugins?: FlipPlugin[]
  // Default animation duration
  duration?: number
  // Default easing function
  ease?: string | EaseFunction
  // Whether to enable reduced motion support
  respectReducedMotion?: boolean
}
```

## FlipElement Configuration

The `FlipElement` component accepts these props:

```vue
<template>
  <FlipElement
    ease="power2.out"
    flip-id="unique-id"
    :duration="0.5"
    :respect-reduced-motion="true"
  >
    <!-- Your content -->
  </FlipElement>
</template>
```

## Plugin Configuration

Each plugin can be configured when registered:

```typescript
import { useFlip } from '@vue-gsap-flip/core'
import { VueFlipRouterPlugin } from '@vue-gsap-flip/vue-router'

const flipManager = useFlip({
  plugins: [
    VueFlipRouterPlugin.configure({
      // Plugin-specific options
    })
  ]
})
```

## Global Configuration

You can set global defaults in your main app file:

```typescript
import { createFlipManager } from '@vue-gsap-flip/core'
import { createApp } from 'vue'

const app = createApp(App)

// Configure global defaults
createFlipManager({
  duration: 0.5,
  ease: 'power2.out',
  respectReducedMotion: true
})

app.mount('#app')
```

## Related Documentation

- **[Flip Manager](./flip-manager)** - Learn about the core flip manager
- **[FlipElement Component](./flip-element)** - Understand the Vue component
- **[Plugin System](./plugin-system)** - Explore the extensible plugin architecture
