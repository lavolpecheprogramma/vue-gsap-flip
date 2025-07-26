# @vue-gsap-flip/debug

Debug utilities for vue-gsap-flip animations.

This package provides debugging tools and utilities to help you troubleshoot and optimize FLIP animations in your Vue 3 applications.

## Features

- **Animation Debugging**: Visual debugging tools for FLIP animations
- **Performance Monitoring**: Track animation performance and timing
- **State Inspection**: Inspect FLIP states and transitions
- **Development Tools**: Enhanced debugging experience during development

## Installation

```bash
npm install @vue-gsap-flip/debug
```

## Usage

```vue
<script setup lang="ts">
import { flipManager } from '@vue-gsap-flip/core'
import { VueFlipDebugPlugin } from '@vue-gsap-flip/debug'

// Important: The debug plugin should be registered LAST, after all other plugins
flipManager.registerPlugin(VueFlipDebugPlugin)
</script>
```

## Documentation

For detailed documentation, examples, and advanced usage, visit:

**[📖 Full Documentation](https://lavolpecheprogramma.github.io/vue-gsap-flip/)**

## License

MIT
