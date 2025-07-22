# Overview

## What is it?

The router plugin is a Vue Flip plugin that integrates with Vue Router to provide intelligent page transition animations. It allows you to control when flip animations should occur based on route changes, route names, and route parameters with advanced matching capabilities.

## Why does it exist?

### Seamless Navigation Experience

Modern web applications need smooth transitions between pages to provide a native app-like experience. The router plugin enables you to create sophisticated page transitions that respond to navigation patterns with precise control.

### Advanced Route-Based Animation Control

Instead of animating every element on every route change, the router plugin allows you to:
- Define which routes should trigger animations using exact strings or RegExp patterns
- Specify which routes can animate from which other routes with complex matching
- Control animations based on route parameters with array support
- Create complex navigation patterns with flexible parameter matching
- Use RegExp patterns for dynamic route matching

### Performance Optimization

By controlling when animations occur, you can:
- Prevent unnecessary animations on route changes that don't need them
- Reduce visual noise and improve user experience
- Optimize performance by only animating when it makes sense
- Use sophisticated matching to create precise animation triggers

## Key Features

- **Advanced Route Matching**: Support for string and RegExp route names
- **Complex Parameter Matching**: Parameters can be strings or arrays with sophisticated matching logic
- **Array Parameter Support**: Route parameters can be arrays for flexible matching
- **Conditional Animations**: Only animate when specific route transitions occur
- **Automatic Cleanup**: Automatically cleans up orphaned elements on route changes
- **TypeScript Support**: Full TypeScript support with type augmentation
- **Vue Router Integration**: Seamless integration with Vue Router 4
- **Route Transition Tracking**: Tracks both current and previous routes for precise control

## Behavior

When a route change occurs:

1. **Route Evaluation**: The plugin checks if the current route matches any configured animation rules using advanced matching
2. **Parameter Validation**: Validates route parameters with support for arrays and complex matching
3. **Transition Validation**: Checks if the route transition (from → to) is allowed
4. **Conditional Animation**: Animations only occur when all conditions are met
5. **Cleanup**: Orphaned elements are automatically cleaned up when routes don't match

## Use Cases

- **E-commerce**: Animate product cards when navigating between category pages with parameter matching
- **Blog**: Smooth transitions between article lists and individual posts with RegExp patterns
- **Dashboard**: Animate widgets when switching between dashboard views with complex parameter matching
- **Portfolio**: Create sophisticated transitions between project showcases with array parameters
- **Navigation**: Animate navigation elements based on current route context and parameters
- **Dynamic Routes**: Use RegExp patterns for routes with dynamic segments
