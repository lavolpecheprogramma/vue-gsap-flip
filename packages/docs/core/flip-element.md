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

### Trigger

The `trigger` prop is optional and enable you trigger a flip animation arbitrary, like in this example.
An usage example is a ref that change a class and trigger the animation.

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
## Next Steps

- **[Flip Manager](./flip-manager)** - Understand the underlying flip manager
- **[Plugin System](./plugin-system)** - Explore the extensible plugin architecture
