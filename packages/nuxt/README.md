# @vue-gsap-flip/nuxt

Nuxt 3 module for auto-registering vue-gsap-flip components and directives.

## Installation

```bash
npm install @vue-gsap-flip/nuxt @vue-gsap-flip/core gsap
```

## Setup

Add to your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ['@vue-gsap-flip/nuxt']
})
```

## What it does

This module automatically registers:

- ✅ `FlipElement` component globally
- ✅ `useFlip` composable globally  
- ✅ `v-flip` directive globally
- ✅ Supports custom FLIP plugins

## Configuration

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@vue-gsap-flip/nuxt'],
  vueGsapFlip: {
    directive: true, // Enable v-flip directive (default: true)
    plugins: [] // Custom plugins (default: [])
  }
})
```

## Public & Custom Plugins
Register in config:

```ts
vueGsapFlip: {
  plugins: [
    { name: 'MyPlugin', from: '@/plugins/my-plugin' },
    { name: 'VueFlipRouterPlugin', from: '@vue-gsap-flip/vue-router' },
    { name: 'VueFlipReducedMotionPlugin', from: '@vue-gsap-flip/reduced-motion' },
    { name: 'VueFlipDebugPlugin', from: '@vue-gsap-flip/debug' },
  ]
}
```

## Requirements

- Nuxt 3 / 4
- Vue 3
- GSAP 3.13.0+

## License

MIT 
