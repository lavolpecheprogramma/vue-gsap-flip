# Nuxt Module

Auto-register vue-gsap-flip components and directives in Nuxt 3.

## Quick Start

```bash
npm install @vue-gsap-flip/nuxt @vue-gsap-flip/core gsap
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@vue-gsap-flip/nuxt']
})
```

## Features

- **Auto-registration**: `FlipElement`, `useFlip`, and `v-flip` directive
- **Plugin system**: Custom FLIP plugins support
- **Zero config**: Works out of the box
- **TypeScript**: Full type support

## What it registers

The module automatically registers these components globally:

- `FlipElement` - FLIP animation component
- `useFlip` - FLIP state management composable
- `v-flip` - FLIP animation directive

## Configuration

### Basic Config

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@vue-gsap-flip/nuxt'],
  vueGsapFlip: {
    directive: true,
    plugins: []
  }
})
```

### Options

#### `directive`

**Type**: `boolean`
**Default**: `true`

Enable/disable the `v-flip` directive registration.

```ts
vueGsapFlip: {
  directive: false // Disable directive registration
}
```

#### `plugins`

**Type**: `Array<{name: string, from: string}>`
**Default**: `[]`

Register FLIP plugins with the module.

```ts
vueGsapFlip: {
  plugins: [
    { name: 'MyPlugin', from: '@/plugins/my-plugin' },
    { name: 'VueFlipReducedMotionPlugin', from: '@vue-gsap-flip/reduced-motion' },
    { name: 'VueFlipDebugPlugin', from: '@vue-gsap-flip/debug' }
  ]
}
```
Important: not use the vue-router plugin, the module provide this functionality yet.

## Requirements

- Nuxt 3
- Vue 3
- GSAP 3.13.0+
