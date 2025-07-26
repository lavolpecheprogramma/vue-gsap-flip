# @vue-gsap-flip/vue-router

Vue Router integration for vue-gsap-flip animations.

This package provides seamless integration between Vue Router and vue-gsap-flip, enabling smooth page transitions and route-based animations.

## Features

- **Route Transitions**: Smooth animations between Vue Router pages
- **Navigation Guards**: Automatic animation handling during navigation
- **State Preservation**: Maintains element states during route changes
- **Seamless Integration**: Works with existing Vue Router setup

## Installation

```bash
npm install @vue-gsap-flip/vue-router vue-router
```

## Usage

<script setup lang="ts">
import { flipManager } from '@vue-gsap-flip/core'
import { VueFlipRouterPlugin } from '@vue-gsap-flip/vue-router'

flipManager.registerPlugin(VueFlipRouterPlugin)
</script>

This plugin add the possibility to customize how and when an element have to flip based on the route changing.

```vue
<template>
  <FlipElement
    id="my-element"
    :config="{
      clone: true,
      routes: [
        // only on the about page
        { name: 'about' },
        // only on the credits page if locale is 'it'
        { name: 'credits', params: { locale: 'it' } },
        // only on product detail with id 123 and coming from product-list page
        {
          name: 'product-detail',
          params: { id: '123' },
          from: [
            { name: 'product-list' }
          ]
        },
        // all pages named with list-.. and coming from product list
        {
          name: /^list-.*$/,
          from: [
            { name: 'product-list' }
          ]
        }
      ]
    }"
  >
    <div>Content that animates on specific routes</div>
  </FlipElement>
</template>
```

## Documentation

For detailed documentation, examples, and advanced usage, visit:

**[📖 Full Documentation](https://lavolpecheprogramma.github.io/vue-gsap-flip/router/)**

## License

MIT
