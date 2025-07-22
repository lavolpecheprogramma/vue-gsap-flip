# Type Augmentation System

Vue Flip includes a sophisticated type augmentation system that automatically extends the core types when plugins are installed. This ensures that TypeScript provides the correct type information without requiring manual type imports.

## How It Works

When you import the router plugin, the `FlipElementConfig` type automatically includes router-specific properties for the final user. This is achieved through TypeScript's module augmentation system.

### Core Type System

The core package defines a base `BaseFlipElementConfig` interface and a type augmentation system:

```typescript
// packages/core/src/types.ts
export interface BaseFlipElementConfig {
  clone?: boolean
  flipStateVars?: Flip.FlipStateVars
  flipVars?: Flip.FromToVars
}

// Type augmentation system for plugins
export interface FlipElementConfigAugmentation {
  // This interface can be extended by plugins to augment FlipElementConfig
}

// The final config type that gets augmented by plugins
export type FlipElementConfig = BaseFlipElementConfig & FlipElementConfigAugmentation
```

### Router Plugin Augmentation

The router plugin extends the type augmentation interface:

```typescript
// packages/router/src/types.ts
export interface RouteFlipConfig {
  from?: string[]
  routeParams?: Record<string, string>
}

export interface RouterFlipElementConfig {
  routes?: Record<string, RouteFlipConfig>
}

// Extend the core type augmentation interface
declare module '../../core/src/types' {
  interface FlipElementConfigAugmentation extends RouterFlipElementConfig {}
}
```

## Usage Examples

### Without Router Plugin

```typescript
import { FlipElement } from '@vue-gsap-flip/core'

// Basic config without router features
const config = {
  clone: true,
  flipVars: {
    duration: 0.5
  }
}
```

### With Router Plugin

```typescript
import { FlipElement, useRouterFlipManager } from '@vue-gsap-flip/vue-router'

// Initialize the router plugin
useRouterFlipManager()

// Config automatically includes router properties
const config = {
  clone: true,
  routes: {
    home: { from: ['about', 'contact'] },
    about: { from: ['home'] },
    contact: { from: ['home'] }
  }
}
```

## Benefits

1. **Automatic Type Safety**: When the router plugin is imported, TypeScript automatically knows about router-specific properties.

2. **No Manual Type Imports**: Users don't need to import `RouterFlipElementConfig` explicitly - it's automatically available.

3. **Extensible**: Other plugins can extend the same system to add their own properties.

4. **Backward Compatible**: Existing code continues to work without changes.

## Plugin Development

To create a plugin that extends the type system:

1. Define your plugin-specific interface:

```typescript
export interface MyPluginConfig {
  myProperty?: string
}
```

2. Extend the core augmentation interface:

```typescript
declare module '../../core/src/types' {
  interface FlipElementConfigAugmentation extends MyPluginConfig {}
}
```

3. Import your types file to trigger the augmentation:

```typescript
// In your plugin's index.ts
import './types'

export * from './types'
```

This system ensures that the type system automatically adapts to the plugins that are installed, providing a seamless developer experience.
