<script setup>
import BasicCardFlip from '../components/BasicCardFlip.vue'
</script>

# Quick Start

Get up and running with Vue Flip in minutes. This guide will walk you through creating your first flip animation.

## Basic Setup

First, install the required packages:

```bash
npm install @vue-gsap-flip/core gsap
```

## Your First Flip Animation

Create a simple flip animation that responds to state changes:
<BasicCardFlip />
::: details Demo code
<<< ../components/BasicCardFlip.vue
:::

## How It Works

1. **`FlipElement`** - The Vue component that wraps elements you want to animate
2. **`id`** - A unique identifier for the element (required)
3. **`config`** - Configuration object for the animation behavior (optional)
3. **`trigger`** - A reactive prop to trigger the animation (optional)
4. **`setEl`** - A function provided by the slot to set the element reference (required)

## Key Concepts

### FlipElement Component

The `FlipElement` component is the main way to create flip animations:

```vue
<template>
  <FlipElement
    id="unique-id"
    :config="animationConfig"
    v-slot="{ setEl }"
  >
    <div :ref="setEl">Your content here</div>
  </FlipElement>
</template>
```

### Element Reference

The `setEl` function is crucial - it tells Vue Flip which element to animate:

```vue
<template #default="{ setEl }">
  <div :ref="setEl">
    This element will flip
  </div>
</template>
```

### Configuration

The `config` prop controls the animation behavior:

```typescript
interface FlipElementConfig {
  clone?: boolean // Whether to clone the element during flip
  flipStateVars?: Flip.FlipStateVars // GSAP Flip state variables
  flipVars?: Flip.FromToVars // GSAP Flip animation variables
}
```

### Trigger

The `trigger` prop is optional and enable you trigger a flip animation arbitrary, like in this example.
An usage example is a ref that change a class and trigger the animation.

## Next Steps

Now that you have the basics, explore:

- **[Flip Manager](../core/flip-manager)** - Learn about the core API
- **[Configuration](../core/configuration)** - Customize your animations
- **[Router Integration](../router/)** - Add route-based animations
