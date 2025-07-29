<script setup>
import DirectiveBasicCardFlip from '../components/DirectiveBasicCardFlip.vue'
</script>
# vFlip directive

The `vFlip` directive is another way to create flip animations in Vue Flip. It provides a clean, declarative API **without** wrapping your content and handling flip animations automatically.

All options are the same as [Flip element](./flip-element) but applied directly on the DOM element that you want to flip.

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

## Advanced Usage with Event Callbacks

The directive supports event callbacks for tracking animation states:

```vue
<script setup>
function handleAttached (el) {
  console.log('Element attached:', el)
  // Animation completed
}

function handleDetached (el) {
  console.log('Element detached:', el)
  // Element state captured
}
</script>

<template>
  <div
    v-flip="'my-element'"
    v-flip:@attached="handleAttached"
    v-flip:@detached="handleDetached"
    v-flip:config="{ clone: true }"
    v-flip:enabled="enabled"
    v-flip:trigger="myTrigger"
  >
    <!-- Your content here -->
  </div>
</template>
```

## Directive Arguments

The directive supports various arguments for configuration:

| Argument | Type | Description |
|----------|------|-------------|
| `id` | `string` | Unique identifier for the element |
| `enabled` | `boolean` | Controls whether flip is enabled |
| `trigger` | `any` | Trigger value for manual animation |
| `config` | `FlipElementConfig` | Animation configuration object |
| `on-attached` or `@attached` | `(el: Element) => void` | Callback when element is attached |
| `on-detached` or `@detached` | `(el: Element) => void` | Callback when element is detached |

## Examples
This example is the same as FlipElement but using the directive.

<DirectiveBasicCardFlip />
::: details Demo code
<<< ../components/DirectiveBasicCardFlip.vue
:::

## Next Steps

- **[Flip Manager](./flip-manager)** - Understand the underlying flip manager
- **[Plugin System](./plugin-system)** - Explore the extensible plugin architecture
