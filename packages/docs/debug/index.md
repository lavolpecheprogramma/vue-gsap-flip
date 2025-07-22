# @vue-gsap-flip/debug

A simple debugging plugin that logs flip animation events to the console.

## Quick Start

```bash
npm install @vue-gsap-flip/debug
```

```vue
<script setup lang="ts">
import { useFlip } from '@vue-gsap-flip/core'
import { VueFlipDebugPlugin } from '@vue-gsap-flip/debug'

const flipManager = useFlip()
// Important: The debug plugin should be registered LAST, after all other plugins
flipManager.registerPlugin(VueFlipDebugPlugin)
</script>
```

## Try it now

**This plugin is already installed in this documentation site.** Open your browser's developer console and trigger any flip animation on this page to see the debug output.

## Documentation

This plugin provides debugging capabilities for Vue Flip animations. It logs all flip animation events to the console, making it easier to debug animation issues and understand the animation flow.

**Important**: The debug plugin should always be registered **last**, after all other plugins. This ensures that it can properly intercept and log all animation events from other plugins.

## Usage

The debug plugin is automatically enabled in this documentation site. Open your browser's developer console and trigger any flip animation to see the debug output.
