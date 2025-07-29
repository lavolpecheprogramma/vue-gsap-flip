# How It Works

The reduced motion plugin operates through a simple but effective mechanism that integrates seamlessly with Vue Flip's middleware system.

## Technical Implementation

### 1. Media Query Detection

The plugin uses the `window.matchMedia` API to detect if the user has enabled reduced motion in their system settings:

```typescript
const mm = window.matchMedia('(prefers-reduced-motion: reduce)')
let isReducedMotion = mm.matches === true
```

This creates a media query listener that checks the current state of the user's motion preferences.

### 2. Middleware Integration

The plugin registers middleware functions with the Flip Manager that intercept animation requests:

```typescript
function detachMiddleware (_id: string, _el: Element, config: FlipElementConfig) {
  return isReducedMotion && config.respectReducedMotion === false
}

function attachMiddleware (_id: string, _el: Element, config: FlipElementConfig) {
  return isReducedMotion && config.respectReducedMotion === false
}
```

These middleware functions:
- Intercept both attach and detach animation requests
- Check if reduced motion is preferred by the user
- Check if the specific element is configured to respect reduced motion
- Return `true` to prevent the animation when conditions are met

### 3. Dynamic Response

The plugin listens for changes to the user's motion preferences:

```typescript
mm.addEventListener('change', e => (isReducedMotion = e.matches))
```

This means if a user changes their system settings while using your application, the plugin will immediately respond to the new preference without requiring a page reload.

### 4. Plugin Registration

When the plugin is registered with the Flip Manager:

```typescript
flipManager.addDetachMiddleware(detachMiddleware)
flipManager.addAttachMiddleware(attachMiddleware)
```

The middleware functions are added to the Flip Manager's middleware chain, allowing them to intercept all animation requests.

## Configuration Logic

The plugin adds a `respectReducedMotion` property to the `FlipElementConfig`:

| Value | Behavior |
|-------|----------|
| `true` (default) | Respects user's motion preferences |
| `false` | Always animates regardless of user preferences |
| `undefined` | Uses the default behavior (respects preferences) |

### Override Logic

The middleware logic works as follows:

```typescript
// For detach animations
return isReducedMotion && config.respectReducedMotion === false

// For attach animations
return isReducedMotion && config.respectReducedMotion === false
```

This means:
- If `isReducedMotion` is `false` (user doesn't prefer reduced motion), animations always play
- If `isReducedMotion` is `true` but `respectReducedMotion` is `false`, animations still play (override)
- If `isReducedMotion` is `true` and `respectReducedMotion` is `true` or `undefined`, animations are prevented

## Type Augmentation

The plugin automatically extends TypeScript types through module augmentation:

```typescript
// In types.ts
export interface ReducedMotionFlipElementConfig {
  respectReducedMotion?: boolean
}

declare module '@vue-gsap-flip/core' {
  interface FlipElementConfigAugmentation extends ReducedMotionFlipElementConfig {}
}
```

This ensures that the `respectReducedMotion` property is available in TypeScript when using the plugin.

## Cleanup

The plugin returns a cleanup function when installed:

```typescript
return () => {
  flipManager.removeDetachMiddleware(detachMiddleware)
  flipManager.removeAttachMiddleware(attachMiddleware)
}
```

This allows the plugin to be properly uninstalled if needed, removing the middleware functions from the Flip Manager.

## Performance Considerations

- The media query listener is lightweight and only triggers when system preferences change
- Middleware functions are simple boolean checks with minimal performance impact
- No polling or continuous monitoring is required
- The plugin only activates when reduced motion is actually preferred
