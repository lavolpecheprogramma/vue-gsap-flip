<script setup>
import PageTransitionExample from '../components/PageTransitionExample.vue'
</script>

# Usage
The router plugin enables smooth page transitions by automatically managing element animations between routes. It handles cleanup of animated elements and provides a declarative way to define when and how animations should occur during navigation.

## Example
Changing the page, you will see this box moving to the new position with a flip animation.

<PageTransitionExample/>
::: details Demo code
<<< ../components/PageTransitionExample.vue
:::
[Change page to see the animation](./transition-example)

## Configuration

The plugin adds a `routes` property to the `FlipElementConfig`:

```typescript
interface RouteConfig {
  name: string | RegExp
  params: RouteLocationNormalizedGeneric['params']
}

interface RouterFlipElementConfig {
  routes?: (RouteConfig & { from?: RouteConfig[] })[]
}
```

### Route Configuration Options

| Property | Type | Description |
|----------|------|-------------|
| `routes` | `(RouteConfig & { from?: RouteConfig[] })[]` | Array of route configurations |
| `name` | `string \| RegExp` | Route name (exact string or RegExp pattern) |
| `params` | `RouteLocationNormalizedGeneric['params']` | Route parameters for matching |
| `from` | `RouteConfig[]` | Array of routes that can animate to this route |

### Route Configuration
In this example we can see an element that will flip during a page transition and on certain pages defined in the routes parameter.

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

## Best Practices

1. **Use Named Routes**: Always use named routes for better control
2. **Be Specific**: Define specific route transitions rather than allowing all routes
3. **Parameter Matching**: Use route parameters for precise control
4. **RegExp Patterns**: Use RegExp patterns for dynamic route matching
5. **Test Navigation**: Test all navigation paths to ensure animations work as expected
6. **Performance**: Only animate when it enhances the user experience

## Troubleshooting

### Animations not working?

1. Make sure the plugin is registered before any FlipElement components are used
2. Check that you're using named routes in your Vue Router configuration
3. Verify that route names in your configuration match your router route names
4. Ensure route parameters match exactly (case-sensitive)
5. Check that the route configuration array format is correct

### TypeScript errors?

1. Make sure you've imported the plugin types: `import '@vue-gsap-flip/vue-router'`
2. Check that your `tsconfig.json` includes the plugin in the compilation
3. Restart your TypeScript language server if using VS Code
