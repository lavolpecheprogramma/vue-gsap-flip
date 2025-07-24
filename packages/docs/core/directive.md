<script setup>
import DirectiveBasicCardFlip from '../components/DirectiveBasicCardFlip.vue'
</script>
# vFlip directive

The `vFlip` directive is an other way to create flip animations in Vue Flip. It provides a clean, declarative API **without** wrapping your content and handling flip animations automatically.

All options are the same of [Flip element](./flip-element) but applied directly on the dom element that you want to flip.

## Installation
The common way to install a directive is to attach it directly on the app and make it available everywhere.
For more info check the [vue docs](https://vuejs.org/guide/reusability/custom-directives)

```ts
import { vFlip } from '@vue-gsap-flip/core'

const app = createApp({})

// make v-flip usable in all components
app.directive('flip', vFlip)
```

## Basic Usage

```vue
<script setup>
const enabled = ref(true)
const myTrigger = ref(false)
</script>

<template>
  <div
    v-flip="'my-element'"
    v-flip:config="{ clone: true }"
    v-flip:enabled="enabled"
    v-flip:trigger="myTrigger"
  >
    <!-- Your content here -->
  </div>
</template>
```
## Examples
This example is the same of FlipElement but using the directive.

<DirectiveBasicCardFlip />
::: details Demo code
<<< ../components/DirectiveBasicCardFlip.vue
:::

## Next Steps

- **[Flip Manager](./flip-manager)** - Understand the underlying flip manager
- **[Plugin System](./plugin-system)** - Explore the extensible plugin architecture
