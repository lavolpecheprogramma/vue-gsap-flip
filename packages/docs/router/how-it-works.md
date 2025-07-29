# How It Works

The router plugin operates by integrating with Vue Router and using middleware to control when flip animations should occur based on route conditions.

## Technical Implementation

### 1. Route Integration

The plugin uses Vue Router's `useRouter` composable and the `beforeResolve` hook to track route changes:

```typescript
const router = useRouter()
const nextRoute = shallowRef<RouteLocationNormalizedGeneric>()
const prevRoute = shallowRef<RouteLocationNormalizedGeneric>()

router.beforeResolve((to, from) => {
  nextRoute.value = to
  prevRoute.value = from
})
```

This provides access to both the current and previous route states, allowing the plugin to make decisions based on route transitions.

### 2. Route Evaluation Function

The core logic is in the `needFlip` function that determines whether an animation should occur:

```typescript
function needFlip (config: FlipElementConfig) {
  // no route configured, continue
  if (!config.routes) return true
  // no route to flip, stop execution
  if (!nextRoute.value) return false
  const configMatch = config.routes.find(route => isAllowedRoute(route, nextRoute.value!))
  // routes are configured but no route match, stop execution
  if (!configMatch) return false

  if (configMatch.from) {
    const prevRouteMatch = configMatch.from.find(route => isAllowedRoute(route, prevRoute.value!))
    if (!prevRouteMatch) return false
  }
  return true
}
```

This function:
- Returns `true` if no routes are configured (default behavior)
- Returns `false` if no route is available to flip to
- Finds a matching route configuration for the current route
- Validates the "from" route if specified
- Returns `true` only when all conditions are met

### 3. Route Permission Checking

The `isAllowedRoute` function handles complex route matching:

```typescript
function isAllowedRoute (permission: RouteConfig, route: RouteLocationNormalizedGeneric) {
  const isSameRouteName = permission.name instanceof RegExp
    ? permission.name.test(route.name as string)
    : permission.name === route.name

  if (!isSameRouteName) return false
  return !permission.params || (route.params && Object.entries(permission.params).every(([key, configParam]) => {
    const routeParam = route.params[key]
    if (Array.isArray(routeParam) && Array.isArray(configParam)) {
      return configParam.every(param => routeParam.includes(param))
    } else if (Array.isArray(routeParam)) {
      return routeParam.includes(configParam as string)
    } else if (Array.isArray(configParam)) {
      // configuration define an array of params, but the route doesn't have an array
      return false
    } else {
      return routeParam === configParam
    }
  }))
}
```

This function supports:
- **String and RegExp route names**: Route names can be exact strings or RegExp patterns
- **Complex parameter matching**: Parameters can be strings or arrays with sophisticated matching logic
- **Array parameter support**: Route parameters can be arrays for flexible matching

### 4. Middleware Integration

The plugin registers a single middleware function that intercepts detach animation requests:

```typescript
function detachMiddleware (_id: string, _el: Element, config: FlipElementConfig) {
  return needFlip(config)
}

flipManager.addDetachMiddleware(detachMiddleware)
```

This middleware:
- Intercepts detach animation requests
- Uses the `needFlip` function to determine if animation should proceed
- Returns `true` to allow animation when conditions are satisfied
- Returns `false` to prevent animation when conditions aren't met

### 5. Route Change Watching

The plugin watches for route changes and cleans up orphaned elements:

```typescript
const stopWatcher = watch(() => router.currentRoute.value, () => {
  for (const [id, data] of flipManager.store.entries()) {
    if (needFlip(data.config)) continue
    if (data.clone) document.body.removeChild(data.clone)
    flipManager.store.delete(id)
  }
})
```

This ensures that:
- Elements are cleaned up when routes change
- Orphaned clones are removed from the DOM
- The flip manager store is kept clean

## Configuration Logic

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

### Route Configuration

| Property | Type | Description |
|----------|------|-------------|
| `routes` | `(RouteConfig & { from?: RouteConfig[] })[]` | Array of route configurations |
| `name` | `string \| RegExp` | Route name (exact string or RegExp pattern) |
| `params` | `RouteLocationNormalizedGeneric['params']` | Route parameters for matching |
| `from` | `RouteConfig[]` | Array of routes that can animate to this route |

### Animation Logic

The animation logic works as follows:

1. **No Routes Configured**: Animation always occurs (default behavior)
2. **Route Name Match**: Animation occurs if current route name matches a configured route (string or RegExp)
3. **Parameter Matching**: Animation occurs if route parameters match the configured parameters
4. **From Routes**: Animation occurs if navigating from a route in the `from` array
5. **Complex Matching**: Supports array parameters and RegExp patterns for flexible matching

## Type Augmentation

The plugin automatically extends TypeScript types through module augmentation:

```typescript
declare module '@vue-gsap-flip/core' {
  interface FlipElementConfigAugmentation extends RouterFlipElementConfig {}
}
```

This ensures that the `routes` property is available in TypeScript when using the plugin.

## Cleanup

The plugin returns a cleanup function when installed:

```typescript
return () => {
  flipManager.addDetachMiddleware(detachMiddleware)
  stopWatcher()
}
```

This allows the plugin to be properly uninstalled, removing middleware functions and stopping route watchers.

## Performance Considerations

- Route evaluation is lightweight and only occurs during animation requests
- Route watching uses Vue's reactive system for efficient updates
- Cleanup is automatic and prevents memory leaks
- Middleware functions are simple boolean checks with minimal performance impact
- RegExp patterns are compiled once and reused for efficient matching
