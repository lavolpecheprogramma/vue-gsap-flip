# Usage

## Example

```vue
<template>
  <div>
    <FlipElement
      id="my-element"
      :config="{
        clone: true,
        respectReducedMotion: true // Respects user's motion preferences (default)
      }"
    >
      <div>Content that respects reduced motion</div>
    </FlipElement>
  </div>
</template>
```

## Configuration

The plugin adds a `respectReducedMotion` property to the `FlipElementConfig`:

| Value | Behavior |
|-------|----------|
| `true` (default) | Respects user's motion preferences |
| `false` | Always animates regardless of user preferences |
| `undefined` | Uses the default behavior (respects preferences) |

### Override Reduced Motion

```vue
<template>
  <FlipElement
    id="important-animation"
    :config="{
      clone: true,
      respectReducedMotion: false // This will always animate
    }"
  >
    <div>This will always animate</div>
  </FlipElement>
</template>
```

## TypeScript Support

```typescript
import type { FlipElementConfig } from '@vue-gsap-flip/core'
import '@vue-gsap-flip/reduced-motion' // This triggers the type augmentation

const config: FlipElementConfig = {
  clone: true,
  respectReducedMotion: true // Now available in TypeScript
}
```

## Testing

### Browser Developer Tools

1. Open Chrome DevTools
2. Go to the **Rendering** tab
3. Find **Emulate CSS media feature prefers-reduced-motion**
4. Select **reduce** to simulate reduced motion preference

### System Settings

- **macOS**: System Preferences → Accessibility → Display → Reduce motion
- **Windows**: Settings → Ease of Access → Display → Show animations in Windows
- **iOS**: Settings → Accessibility → Motion → Reduce Motion
- **Android**: Settings → Accessibility → Remove animations

## Best Practices

1. **Default to respecting preferences**: Always set `respectReducedMotion: true` unless you have a compelling reason not to
2. **Test with reduced motion**: Regularly test your application with reduced motion enabled
3. **Provide alternatives**: Consider providing static alternatives for critical animations
4. **Document overrides**: If you override reduced motion for specific elements, document why
