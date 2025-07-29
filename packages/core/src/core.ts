import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'

import type { AttachMiddleware, DetachMiddleware, FlipElementConfig, VueFlipPlugin } from './types'
import { deepMerge } from './utils'

gsap.registerPlugin(Flip)

const detachMiddleware: DetachMiddleware[] = []
const attachMiddleware: AttachMiddleware[] = []
const plugins = new Map<string, () => void>()
// Default configuration storage
let defaultConfig: FlipElementConfig = {
  clone: false,
  flipVars: {
    duration: 0.4,
    ease: 'power1.inOut'
  }
}

export const store = new Map<string, { state: Flip.FlipState, clone: Node | undefined, config: FlipElementConfig }>()

// Merge default config with element config
export function mergeDefaultConfig (elementConfig: FlipElementConfig): FlipElementConfig {
  return deepMerge(defaultConfig, elementConfig)
}

export function detach (id: string, el: Element, _config: FlipElementConfig = {}) {
  const config = mergeDefaultConfig(_config)
  // Stop execution if middleware returns false
  if (detachMiddleware.some(middleware => middleware(id, el, config) === false)) return
  // apply the flip id
  el.setAttribute('data-flip-id', id)
  // store the current element state
  const state = Flip.getState(el, config.flipStateVars)
  // remove the flip id
  el.removeAttribute('data-flip-id')
  // clone the element if needed
  let clone
  if (config.clone) {
    clone = el.cloneNode(true)
    document.body.appendChild(clone)
    Flip.fit(clone as Element, state)
    el.setAttribute('data-flip-state-alpha', `${(el as HTMLElement).style?.opacity}`)
    el.setAttribute('data-flip-state', 'detached')
    gsap.set(el, { opacity: 0 })
  }
  store.set(id, { state, clone, config })
}

export function attach (id: string, el: Element, _config: FlipElementConfig = {}) {
  // if the element is detached restore the alpha
  if (el.getAttribute('data-flip-state') === 'detached') {
    if ((el as HTMLElement).style) {
      (el as HTMLElement).style.opacity = el.getAttribute('data-flip-state-alpha') || ''
    }
    el.removeAttribute('data-flip-state')
    el.removeAttribute('data-flip-state-alpha')
  }

  // if id is not in the store return
  const data = store.get(id)
  if (!data) return
  store.delete(id)

  const config = mergeDefaultConfig(_config)
  const { clone, state } = data

  // Stop execution if middleware returns false
  if (attachMiddleware.some(middleware => middleware(id, el, config) === false)) return

  // apply the flip id for gsap
  el.setAttribute('data-flip-id', id)
  // store the current element state
  const currentState = Flip.getState(el, config.flipStateVars)
  // apply the start state
  Flip.fit(el, state, { ...config.flipStateVars, duration: 0 })
  // animate to the new state
  return Flip.to(currentState, {
    ...config.flipStateVars,
    ...config.flipVars,
    targets: [el],
    onStart: () => {
      if (clone) document.body.removeChild(clone)
      config.flipVars?.onStart?.()
    },
    onComplete: () => {
      config.flipVars?.onComplete?.()
      el.removeAttribute('data-flip-id')
      el.removeAttribute('style')
    }
  })
}

// Clean up orphan elements
export function clearStore () {
  for (const [id, data] of store.entries()) {
    if (data.clone) document.body.removeChild(data.clone)
    store.delete(id)
  }
}

// Plugin middleware registration methods
export function addDetachMiddleware (middleware: DetachMiddleware) {
  detachMiddleware.push(middleware)
}

export function addAttachMiddleware (middleware: AttachMiddleware) {
  attachMiddleware.push(middleware)
}

export function removeDetachMiddleware (middleware: DetachMiddleware) {
  const index = detachMiddleware.indexOf(middleware)
  if (index > -1) detachMiddleware.splice(index, 1)
}

export function removeAttachMiddleware (middleware: AttachMiddleware) {
  const index = attachMiddleware.indexOf(middleware)
  if (index > -1) attachMiddleware.splice(index, 1)
}

export const flipManager = {
  detach,
  attach,
  store,
  clearStore,
  addDetachMiddleware,
  addAttachMiddleware,
  removeDetachMiddleware,
  removeAttachMiddleware,
  setDefault: (config: FlipElementConfig) => {
    defaultConfig = config
  },
  getDefault: (): FlipElementConfig => {
    return { ...defaultConfig }
  },
  registerPlugin: (plugin: VueFlipPlugin, options?: unknown) => {
    if (plugins.has(plugin.name)) {
      console.warn(`VueFlip: Plugin "${plugin.name}" is already registered`)
      return
    }
    plugins.set(plugin.name, plugin.install(flipManager, options))
  },
  unregisterPlugin: ({ name }: VueFlipPlugin) => {
    if (!plugins.has(name)) {
      console.warn(`VueFlip: Plugin "${name}" is not registered`)
      return
    }
    plugins.get(name)!()
    plugins.delete(name)
  }
}
