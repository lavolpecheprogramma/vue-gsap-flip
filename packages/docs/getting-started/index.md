# Getting Started

Welcome to Vue Flip! This guide will help you get up and running with smooth flip animations in your Vue 3 applications.

## What is Vue Flip?

Vue Flip is a powerful Vue 3 library for creating smooth flip animations using GSAP's Flip plugin. It provides a clean, intuitive API that makes it easy to add professional-grade flip animations to your Vue applications.

### What is a Flip Animation?

A flip animation is a technique where an element appears to "flip" from one position to another, creating a smooth transition that maintains the element's visual continuity. This is particularly useful for:

- **Layout changes**: When elements move to new positions
- **State transitions**: When content changes but maintains visual continuity
- **Route transitions**: When elements persist across page navigation

### Key Features

- **🚀 Performance**: Built on top of GSAP's Flip plugin for optimal performance
- **🧩 Modular**: Core package with optional router and reduced-motion packages
- **🔌 Extensible**: Plugin system for custom functionality
- **🛡️ Type Safe**: Full TypeScript support
- **📱 Vue 3 Native**: Built with Vue 3 Composition API

## Quick Navigation

- **[Installation](./installation)** - Set up Vue Flip in your project
- **[Quick Start](./quick-start)** - Create your first flip animation

## Architecture Overview

```
Vue Flip
├── Core Package (@vue-gsap-flip/core)
│   ├── FlipManager - core
│   ├── useFlip() - Main composable
│   ├── FlipElement - Vue component
│   ├── vFlip - Vue directive
│   └── Plugin System - Extensible architecture
├── Debug Package (@vue-gsap-flip/debug)
│   └── VueFlipDebugPlugin - Debug middleware
├── Reduced Motion Package (@vue-gsap-flip/reduced-motion)
│   └── VueFlipReducedMotionPlugin - Reduced motion middleware
├── Vitepress-Router Package (@vue-gsap-flip/vitepress-router)
│   └── VueFlipReducedMotionPlugin - Vitepress router integration
└── Vue-Router Package (@vue-gsap-flip/vue-router)
    └── VueFlipRouterPlugin - Vue router integration
```

## When to Use Vue Flip

Vue Flip is perfect for:

- **Dashboard layouts** that change dynamically
- **E-commerce** product grids that reorder
- **Social media** feeds with dynamic content
- **Admin panels** with collapsible sections
- **Portfolio** galleries with filtering
- **Navigation** menus that expand/collapse

## Animation Engine

Vue Flip is built on top of GSAP's Flip plugin, which provides powerful animation capabilities. For detailed information about the underlying animation engine, see:

- [GSAP Flip Plugin Documentation](https://gsap.com/docs/v3/Plugins/Flip)
- [GSAP Flip Examples](https://gsap.com/docs/v3/Plugins/Flip/FlipExamples)
- [GSAP Easing Documentation](https://gsap.com/docs/v3/Eases)

Ready to get started? Begin with the [installation guide](./installation) or jump straight to [quick start](./quick-start) if you're already familiar with Vue 3.
