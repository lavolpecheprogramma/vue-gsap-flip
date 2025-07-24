<script setup>
import BasicCardFlip from '../components/BasicCardFlip.vue'
import DirectiveBasicCardFlip from '../components/DirectiveBasicCardFlip.vue'
</script>

# Quick Start

Get up and running with Vue Flip in minutes. This guide will walk you through creating your first flip animation.

## Basic Setup

First, install the required packages:

```bash
npm install @vue-gsap-flip/core gsap
```

## Your First Flip Animation
There are two way to create make an element flippable:
- using the [FlipElement](./core/FlipElement) component
- using the [vFlip](./core/directive) directive

In this example we create a simple flip animation that responds to a state changes:

Flip Element example:
<BasicCardFlip />
::: details Demo code
<<< ../components/BasicCardFlip.vue
:::

Directive example:
<DirectiveBasicCardFlip />
::: details Demo code
<<< ../components/BasicCardFlip.vue
:::

### Common Configuration

The `config` prop controls the animation behavior:

```typescript
interface FlipElementConfig {
  clone?: boolean // Whether to clone the element during flip
  flipStateVars?: Flip.FlipStateVars // GSAP Flip state variables
  flipVars?: Flip.FromToVars // GSAP Flip animation variables
}
```
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

## Next Steps

Now that you have the basics, explore:

- **[Flip Manager](../core/flip-manager)** - Learn about the core API
- **[Router Integration](../router/)** - Add route-based animations
