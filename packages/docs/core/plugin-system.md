# Plugin System

Vue Flip includes a powerful plugin system that allows you to extend functionality and add custom behavior to flip animations.

## Overview

The plugin system provides a way to:
- Add custom middleware and interceptors
- Extend configuration options
- Add route-based animations
- Implement custom animation logic
- Add debugging and monitoring capabilities

## Creating a Plugin

A plugin is an object that implements the `VueFlipPlugin` interface:

```typescript
interface VueFlipPlugin {
  name: string
  install: (flipManager: FlipManager) => () => void
}
```

### Basic Plugin Structure

```typescript
const MyPlugin: VueFlipPlugin = {
  name: 'my-plugin',

  install (flipManager) {
    // Plugin installation logic here

    // Return cleanup function
    return () => {
      // Cleanup logic here
    }
  }
}
```

## Plugin Registration

Register plugins with the flip manager:

```vue
<script setup>
import { useFlip } from '@vue-gsap-flip/core'

const flipManager = useFlip()

// Register a plugin
flipManager.registerPlugin(MyPlugin)

// Unregister a plugin
flipManager.unregisterPlugin({ name: 'my-plugin' })
</script>
```

## Built-in Plugins

### Router Plugin

The router plugin provides route-based flip animations:

```vue
<script setup>
import { useFlip } from '@vue-gsap-flip/core'
import { VueFlipRouterPlugin } from '@vue-gsap-flip/vue-router'

const flipManager = useFlip()

// Register the router plugin
flipManager.registerPlugin(VueFlipRouterPlugin)
</script>
```

## Creating Custom Plugins

### Middleware Plugin

Create a plugin that adds custom middleware:

```typescript
const MiddlewarePlugin: VueFlipPlugin = {
  name: 'middleware-plugin',

  install (flipManager) {
    // Create middleware functions
    const detachMiddleware = (id: string, el: HTMLElement, config: FlipElementConfig) => {
      console.log(`Detaching element: ${id}`)
      return true // Allow the operation
    }

    const attachMiddleware = async (id: string, el: HTMLElement, config: FlipElementConfig) => {
      console.log(`Attaching element: ${id}`)
      return true // Allow the operation
    }

    // Add middleware to the flip manager
    flipManager.addDetachMiddleware(detachMiddleware)
    flipManager.addAttachMiddleware(attachMiddleware)

    // Return cleanup function
    return () => {
      flipManager.removeDetachMiddleware(detachMiddleware)
      flipManager.removeAttachMiddleware(attachMiddleware)
    }
  }
}
```

## Plugin Best Practices

### 1. Always Return Cleanup Function

```typescript
const GoodPlugin: VueFlipPlugin = {
  name: 'good-plugin',
  install (flipManager) {
    // Add functionality
    const middleware = (id, el, config) => true
    flipManager.addDetachMiddleware(middleware)

    // Return cleanup function
    return () => {
      flipManager.removeDetachMiddleware(middleware)
    }
  }
}
```

### 2. Use Descriptive Names

```typescript
// Good
const PerformanceMonitoringPlugin = { name: 'performance-monitoring' }

// Avoid
const Plugin1 = { name: 'plugin1' }
```

### 3. Handle Errors Gracefully

```typescript
const RobustPlugin: VueFlipPlugin = {
  name: 'robust',
  install (flipManager) {
    const middleware = (id: string, el: HTMLElement, config: FlipElementConfig) => {
      try {
        // Your middleware logic
        return true
      } catch (error) {
        console.error('Plugin error:', error)
        return false // Prevent operation on error
      }
    }

    flipManager.addDetachMiddleware(middleware)

    return () => {
      flipManager.removeDetachMiddleware(middleware)
    }
  }
}
```

## Plugin Configuration

Plugins can extend the configuration interface through TypeScript module augmentation:

```typescript
// In your plugin
declare module '@vue-gsap-flip/core' {
  interface FlipElementConfigAugmentation {
    myPluginOption?: boolean
  }
}

const MyPlugin: VueFlipPlugin = {
  name: 'my-plugin',
  install (flipManager) {
    const middleware = (id: string, el: HTMLElement, config: FlipElementConfig) => {
      if (config.myPluginOption) {
        // Handle plugin-specific configuration
        console.log('My plugin option enabled')
      }
      return true
    }

    flipManager.addDetachMiddleware(middleware)

    return () => {
      flipManager.removeDetachMiddleware(middleware)
    }
  }
}
```

## Next Steps

- **[Router Integration](../router/)** - Learn about the built-in router plugin
- **[Configuration](../core/configuration)** - Understand configuration options
- **[Core Documentation](../core/)** - See plugin examples in action
