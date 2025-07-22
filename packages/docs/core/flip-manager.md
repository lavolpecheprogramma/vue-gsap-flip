# Flip Manager

The flip manager is the core orchestrator of Vue Flip. It provides a simple API for managing flip animations using GSAP's Flip plugin under the hood.

## Overview

The flip manager is accessed through the `useFlip()` composable or directly imported from the package and provides methods for:

- **Detaching** elements from their current position
- **Attaching** elements to their new position with animation
- **Managing** the internal store of element states
- **Configuring** default settings
- **Registering** plugins and middleware

## Basic Usage

```vue
<script setup>
import { useFlip } from '@vue-gsap-flip/core'

const flipManager = useFlip()
</script>
```
or

```vue
<script setup>
import { flipManager } from '@vue-gsap-flip/core'
</script>
```

## Core Methods

### `detach(id, element, config)`

Detaches an element from its current position and stores its state for later animation.

```javascript
// Detach an element
flipManager.detach('my-element', elementRef, {
  clone: true,
  flipVars: {
    duration: 0.5,
    ease: 'power2.out'
  }
})
```

**What it does:**
1. Runs detach middleware (can be prevented by returning `false`)
2. Applies the flip ID to the element
3. Captures the current state using the underlying animation engine
4. Removes the flip ID
5. Optionally clones the element if `config.clone` is true
6. Stores the state, clone, and config in the internal store

### `attach(id, element, config)`

Animates an element to its new position using the stored state.

```javascript
// Attach an element
await flipManager.attach('my-element', elementRef, {
  clone: true,
  flipVars: {
    duration: 0.5,
    ease: 'power2.out'
  }
})
```

**What it does:**
1. Runs attach middleware (can be prevented by returning `false`)
2. Restores element visibility if it was detached
3. Retrieves stored state from the store
4. Applies the flip ID for the animation engine
5. Captures the current state
6. Fits the element to the stored state
7. Animates to the new state using the underlying animation engine
8. Cleans up cloned elements and attributes

### `clearStore()`

Cleans up all stored element states and removes any cloned elements.

```javascript
flipManager.clearStore()
```

## Configuration Management

### `setDefault(config)`

Sets the default configuration for all flip operations.

```javascript
flipManager.setDefault({
  clone: true,
  flipVars: {
    duration: 0.4,
    ease: 'power1.inOut'
  }
})
```

### `getDefault()`

Gets the current default configuration.

```javascript
const defaultConfig = flipManager.getDefault()
console.log(defaultConfig)
```

## Middleware System

The flip manager supports middleware that can intercept and modify flip operations.

### Detach Middleware

```javascript
function detachMiddleware (id, element, config) {
  console.log('Detaching element:', id)

  // Prevent detach for certain elements
  if (id.startsWith('disabled-')) {
    return false
  }

  // Modify config
  config.clone = true
}

flipManager.addDetachMiddleware(detachMiddleware)
```

### Attach Middleware

```javascript
function attachMiddleware (id, element, config) {
  console.log('Attaching element:', id)

  // Prevent attach for certain elements
  if (id.startsWith('disabled-')) {
    return false
  }

  // Modify config
  config.flipVars.duration = 0.3
}

flipManager.addAttachMiddleware(attachMiddleware)
```

### Removing Middleware

```javascript
// Remove specific middleware
flipManager.removeDetachMiddleware(detachMiddleware)
flipManager.removeAttachMiddleware(attachMiddleware)
```

## Plugin System

### `registerPlugin(plugin)`

Registers a plugin with the flip manager.

```javascript
const myPlugin = {
  name: 'my-plugin',
  install: (flipManager) => {
    // Plugin initialization
    console.log('Plugin installed')

    // Return cleanup function
    return () => {
      console.log('Plugin uninstalled')
    }
  }
}

flipManager.registerPlugin(myPlugin)
```

### `unregisterPlugin(plugin)`

Unregisters a plugin from the flip manager.

```javascript
flipManager.unregisterPlugin(myPlugin)
```

## Internal Store

The flip manager maintains an internal store of element states:

```javascript
// Access the store directly
const store = flipManager.store

// Check if an element is stored
if (store.has('my-element')) {
  const data = store.get('my-element')
  console.log('Stored state:', data.state)
  console.log('Stored clone:', data.clone)
  console.log('Stored config:', data.config)
}
```

## Best Practices

### Use comprensible IDs

```javascript
// Good
flipManager.detach('user-card-123', element)

// Bad
flipManager.detach('id', element)
```

### Configure Defaults

```javascript
// Set defaults once at app startup
flipManager.setDefault({
  clone: true,
  flipVars: {
    duration: 0.4,
    ease: 'power1.inOut'
  }
})
```

## Animation Engine

Vue Flip is built on top of GSAP's Flip plugin. For detailed information about the underlying animation engine and its capabilities, see:

- [GSAP Flip Plugin Documentation](https://gsap.com/docs/v3/Plugins/Flip)
- [GSAP Flip Examples](https://gsap.com/docs/v3/Plugins/Flip/FlipExamples)
- [GSAP Easing Documentation](https://gsap.com/docs/v3/Eases)

## Next Steps

- **[FlipElement Component](./flip-element)** - Learn about the Vue component wrapper
- **[Configuration](./configuration)** - Explore all configuration options
- **[Plugin System](./plugin-system)** - Understand the extensible plugin architecture
