# Reduced Motion Plugin

## Documentation

- **[Overview](./overview.md)** - What the plugin is and why it exists
- **[How It Works](./how-it-works.md)** - Technical implementation and mechanics
- **[Usage](./usage.md)** - How to use the plugin

## Quick Start

```bash
npm install @vue-gsap-flip/reduced-motion
```

```vue
<script setup lang="ts">
import { useFlip } from '@vue-gsap-flip/core'
import { VueFlipReducedMotionPlugin } from '@vue-gsap-flip/reduced-motion'

const flipManager = useFlip()
flipManager.registerPlugin(VueFlipReducedMotionPlugin)
</script>
```
