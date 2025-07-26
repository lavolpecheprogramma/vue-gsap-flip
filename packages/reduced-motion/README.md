#  @vue-gsap-flip/reduced-motion

A Vue Flip plugin that respects the user's motion preferences by checking `window.matchMedia("(prefers-reduced-motion: reduce)")`.

## Features

- **Automatic Detection**: Automatically detects if the user prefers reduced motion
- **Configurable**: Allows individual elements to override the global preference
- **Accessibility**: Ensures animations respect user accessibility settings
- **TypeScript Support**: Full TypeScript support with type augmentation

## Installation

```bash
npm install  @vue-gsap-flip/reduced-motion
```

## Usage

### Basic Usage

```vue
<script setup lang="ts">
import { FlipElement, useFlip } from '@vue-gsap-flip/core'
import { VueFlipReducedMotionPlugin } from '@vue-gsap-flip/reduced-motion'

// Register the plugin
const flipManager = useFlip()
flipManager.registerPlugin(VueFlipReducedMotionPlugin)
</script>

<template>
  <FlipElement
    id="my-element"
    :config="{
      clone: true,
      respectReducedMotion: true // This will respect user's motion preferences
    }"
  >
    <div>Content that respects reduced motion</div>
  </FlipElement>
</template>
```

### Override Reduced Motion

You can force animations to always play regardless of user preferences:

```vue
<template>
  <FlipElement
    id="important-animation"
    :config="{
      clone: true,
      respectReducedMotion: false // This will always animate
    }"
  >
    <div>This will always animate</div>
  </FlipElement>
</template>
```

## Configuration

The plugin adds a `respectReducedMotion` property to the `FlipElementConfig`:

- `true` (default): Respects user's motion preferences
- `false`: Always animates regardless of user preferences
- `undefined`: Uses the default behavior (respects preferences)

## How It Works

The plugin uses `window.matchMedia("(prefers-reduced-motion: reduce)")` to detect if the user has enabled reduced motion in their system settings. When reduced motion is preferred:

1. **Detach animations** are prevented (elements don't animate out)
2. **Attach animations** are prevented (elements don't animate in)
3. Elements appear/disappear instantly

This ensures that users who are sensitive to motion or have vestibular disorders can use your application comfortably.

## Browser Support

This plugin works in all modern browsers that support:
- `window.matchMedia`
- CSS `prefers-reduced-motion` media query

## TypeScript

The plugin automatically extends the `FlipElementConfig` type with the `respectReducedMotion` property:

```typescript
import type { FlipElementConfig } from '@vue-gsap-flip/core'
import '@vue-gsap-flip/reduced-motion' // This triggers the type augmentation

const config: FlipElementConfig = {
  clone: true,
  respectReducedMotion: true // Now available in TypeScript
}
```

## Documentation

For detailed documentation, examples, and advanced usage, visit:

**[📖 Full Documentation](https://lavolpecheprogramma.github.io/vue-gsap-flip/reduced-motion/)**

## License

MIT
