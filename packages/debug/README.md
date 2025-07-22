#  @vue-gsap-flip/debug

A simple debugging plugin for vue-gsap-flip that logs animation events to the console.

## Installation

```bash
npm install  @vue-gsap-flip/debug
```

## Usage

```typescript
import { createFlipManager } from '@vue-gsap-flip/core'
import { VueFlipDebugPlugin } from '@vue-gsap-flip/debug'
import { createApp } from 'vue'

const app = createApp(App)
const flipManager = createFlipManager()

// Install the debug plugin
flipManager.use(VueFlipDebugPlugin)

app.use(flipManager)
app.mount('#app')
```

## What it does

The debug plugin adds console logging for flip animations:

- **Animation Start**: Logs when a flip animation begins
- **Animation Complete**: Logs when a flip animation finishes

## Console Output

When animations occur, you'll see:

```
🔄 Flip Animation: my-element-id
  Element: <div class="flip-element">...</div>
  Config: { duration: 300, ease: "power2.out" }
✅ Animation completed: my-element-id
```

## Development Only

This plugin is designed for development use. Remove it in production builds.
