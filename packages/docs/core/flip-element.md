# FlipElement Component

The `FlipElement` component is the primary way to create flip animations in Vue Flip. It provides a clean, declarative API for wrapping your content and handling flip animations automatically.

## Basic Usage

```vue
<script setup>
import { FlipElement } from '@vue-gsap-flip/core'
</script>

<template>
  <FlipElement id="my-element" v-slot="{ setEl }">
    <div :ref="setEl" class="my-content">
      <!-- Your content here -->
    </div>
  </FlipElement>
</template>
```

## Props

### `id` (required)

A unique identifier for the element that enables flip animations between different states or components. When you want to animate between two elements (like a card and its expanded view, or items in different lists), use the same `id` on both elements. This tells Vue Flip that these elements represent the same logical item and should animate smoothly between their different positions or appearances.

### `config`

Configuration options for the flip animation. This object is passed to the underlying flip manager.

The `config` prop controls the animation behavior:

```typescript
interface FlipElementConfig {
  clone?: boolean // Whether to clone the element during flip
  flipStateVars?: Flip.FlipStateVars // GSAP Flip state variables
  flipVars?: Flip.FromToVars // GSAP Flip animation variables
}
```
For the flipStateVars check the [gsap docs](https://gsap.com/docs/v3/Plugins/Flip/static.getState()/#configuration), for the FromToVars check the [gsap docs](https://gsap.com/docs/v3/Plugins/Flip/static.from())

### `enabled`

Controls whether the flip animation is enabled for this element. Defaults to `true`.

### `trigger`

The `trigger` prop is optional and enables you to trigger a flip animation arbitrarily, like in this example.
An usage example is a ref that changes a class and triggers the animation.

## Events

### `@attached`

Emitted when the element is successfully attached and the flip animation is applied. The event includes the target element as a parameter.

```vue
<template>
  <FlipElement
    id="my-element"
    @attached="(el) => console.log('Element attached:', el)"
    v-slot="{ setEl }"
  >
    <div :ref="setEl">Content</div>
  </FlipElement>
</template>
```

### `@detached`

Emitted when the element is detached and the flip state is captured. The event includes the target element as a parameter.

```vue
<template>
  <FlipElement
    id="my-element"
    @detached="(el) => console.log('Element detached:', el)"
    v-slot="{ setEl }"
  >
    <div :ref="setEl">Content</div>
  </FlipElement>
</template>
```

## Slots

### Default Slot

The default slot provides a `setEl` function that you must use to reference your element.

**Important**: Always use the `setEl` function as the `ref` on the element you want to animate.

## Best Practices

### Unique IDs

Always use unique IDs for each FlipElement:

```vue
<!-- Good -->
<FlipElement v-for="item in items" :id="`item-${item.id}`" v-slot="{ setEl }">
  <div :ref="setEl">{{ item.name }}</div>
</FlipElement>

<!-- Bad -->
<FlipElement v-for="item in items" id="item" v-slot="{ setEl }">
  <div :ref="setEl">{{ item.name }}</div>
</FlipElement>
```

### Event Handling

Use the event callbacks to track animation states:

```vue
<script setup>
function handleAttached (el) {
  console.log('Animation completed for element:', el)
  // You can access the element properties here
}

function handleDetached (el) {
  console.log('Element detached:', el)
  // Useful for cleanup or tracking
}
</script>

<template>
  <FlipElement
    id="my-element"
    @attached="handleAttached"
    @detached="handleDetached"
    v-slot="{ setEl }"
  >
    <div :ref="setEl" class="card">
      <h3>{{ title }}</h3>
      <p>{{ content }}</p>
    </div>
  </FlipElement>
</template>
```

## Next Steps

- **[Flip Manager](./flip-manager)** - Understand the underlying flip manager
- **[Plugin System](./plugin-system)** - Explore the extensible plugin architecture
