# @vue-gsap-flip/core

Core FLIP animation functionality for Vue.js with GSAP integration.

This package provides the fundamental components and utilities for creating smooth FLIP animations in Vue 3 applications using GSAP's Flip plugin.

## Features

- **FlipElement Component**: A Vue component that handles FLIP animations
- **useFlip Composable**: Vue 3 Composition API composable for managing FLIP states
- **v-flip Directive**: Vue directive for easy FLIP animation integration
- **FlipManager**: Core animation management system
- **TypeScript Support**: Full TypeScript definitions included

## Installation

```bash
npm install @vue-gsap-flip/core gsap
```

## Quick Start

```vue
<script setup>
import { FlipElement } from '@vue-gsap-flip/core'
import { ref } from 'vue'

const isExpanded = ref(false)
</script>

<template>
  <div class="example">
    <button @click="isExpanded.value = !isExpanded.value">Toggle</button>
    <FlipElement
      id="card"
      :trigger="isExpanded"
      v-slot="{ setEl }"
    >
      <div
        :ref="setEl"
        class="card"
        :class="{ '--expanded': isExpanded }"
      />
    </FlipElement>
  </div>
</template>
```

Or with directive

```vue
<script setup>
import { ref } from 'vue'

const isExpanded = ref(false)
</script>

<template>
  <div class="example">
    <button @click="isExpanded.value = !isExpanded.value">Toggle</button>
    <div
      v-flip="card"
      v-flip:trigger="isExpanded"
      class="card"
      :class="{ '--expanded': isExpanded }"
    />
  </div>
</template>
```

## Documentation

For detailed documentation, examples, and advanced usage, visit:

**[📖 Full Documentation](https://lavolpecheprogramma.github.io/vue-gsap-flip/)**

## License

MIT
