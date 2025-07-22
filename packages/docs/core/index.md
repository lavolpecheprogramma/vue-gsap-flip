<script setup>
import BasicCardFlip from '../components/BasicCardFlip.vue'
import AdvancedExample from '../components/AdvancedExample.vue'
</script>

# @vue-gsap-flip/core

The core package is the foundation of Vue Flip. It provides the essential functionality for creating flip animations in Vue 3 applications.

## What's Included

The core package contains:

- **useFlip()** - The main composable that manages flip animations
- **FlipElement** - Vue component for easy integration
- **Plugin System** - Extensible architecture for custom functionality
- **Type Definitions** - Full TypeScript support

## How It Works

Vue Flip works by leveraging GSAP's Flip plugin under the hood. Here's the basic flow:

1. **State Capture**: Before any changes, Vue Flip captures the current state (position, size, etc.) of elements
2. **DOM Changes**: Your Vue app makes changes to the DOM (reordering, showing/hiding, etc.)
3. **Animation**: Vue Flip animates the elements from their old positions to their new positions
4. **Cleanup**: The animation completes and cleanup occurs

## Core Concepts

### Flip Manager

The flip manager is the central orchestrator that:
- Tracks elements that need to flip
- Manages the animation lifecycle
- Handles plugin integration
- Provides configuration options

### FlipElement Component

A Vue component that:
- Wraps your content
- Provides the `setEl` function for element reference
- Handles the flip animation automatically
- Supports configuration options

### Plugin System

An extensible system that allows you to:
- Add custom middleware
- Modify animation behavior
- Integrate with external libraries
- Create reusable functionality

## Basic Usage
<BasicCardFlip />
::: details Demo code
<<< ../components/BasicCardFlip.vue
:::

## Advanced Usage

For more control, you can use the `useFlip` composable directly:

```vue
<script setup>
import { useFlip } from '@vue-gsap-flip/core'

const flipManager = useFlip()

// Trigger a flip animation
async function triggerFlip () {
  flipManager.detach('CUSTOM-ID', elementRef, { clone: true })
  // Make DOM changes
  // if you want you can animate animate the clone element
  // for example during page transitions
  const data = store.get('CUSTOM-ID')
  await gsap.to(data.clone, { scale: 2 })
  store.set('flip-img', { ...data, state: Flip.getState(data.clone as HTMLElement) })
  // flip to the current position
  flipManager.attach('CUSTOM-ID', elementRef)
}
</script>
```

A real example can be during a vue transition (or a page transition), where we can move the clone during the transition.

<AdvancedExample />
::: details Demo code
<<< ../components/AdvancedExample.vue
:::

## Navigation

- **[Flip Manager](./flip-manager)** - Learn about the core flip manager
- **[FlipElement Component](./flip-element)** - Understand the Vue component
- **[Configuration](./configuration)** - Explore all configuration options
- **[Plugin System](./plugin-system)** - Learn about the extensible plugin architecture

## Next Steps

Ready to dive deeper? Start with the [Flip Manager](./flip-manager) to understand the core concepts, or explore the [Configuration](./configuration) options to customize your animations.
