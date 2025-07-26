# @vue-gsap-flip/vitepress-router

VitePress router integration for vue-gsap-flip animations.

This package provides specialized integration for VitePress documentation sites, enabling smooth page transitions and enhanced user experience in documentation.

## Installation

```bash
npm install @vue-gsap-flip/vitepress-router vitepress
```

## Usage

```ts
import { flipManager } from '@vue-gsap-flip/core'
import { VueFlipVitepressRouterPlugin } from '@vue-gsap-flip/vitepress-router'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

export default {
  ...DefaultTheme,
  enhanceApp ({ app, router }) {
    flipManager.registerPlugin(VueFlipVitepressRouterPlugin, { router })
  }
} as Theme
```

## Documentation

For detailed documentation, examples, and advanced usage, visit:

**[📖 Full Documentation](https://lavolpecheprogramma.github.io/vue-gsap-flip/)**

## License

MIT
