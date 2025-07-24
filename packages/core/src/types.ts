export interface BaseFlipElementConfig {
  clone?: boolean
  flipStateVars?: Flip.FlipStateVars
  flipVars?: Flip.FromToVars
}

export interface FlipElementProps {
  id: string
  enabled?: boolean
  trigger?: unknown
  config?: FlipElementConfig
}

// Type augmentation system for plugins
export interface FlipElementConfigAugmentation {
  // This interface can be extended by plugins to augment FlipElementConfig
}

// The final config type that gets augmented by plugins
export type FlipElementConfig = BaseFlipElementConfig & FlipElementConfigAugmentation

export interface FlipManager {
  detach: (id: string, el: HTMLElement, config: FlipElementConfig) => void
  attach: (id: string, el: HTMLElement, config: FlipElementConfig) => gsap.core.Timeline | undefined
  store: Map<string, { state: Flip.FlipState, clone: Node | undefined, config: FlipElementConfig }>
  clearStore: () => void
  addDetachMiddleware: (middleware: DetachMiddleware) => void
  addAttachMiddleware: (middleware: AttachMiddleware) => void
  removeDetachMiddleware: (middleware: DetachMiddleware) => void
  removeAttachMiddleware: (middleware: AttachMiddleware) => void
  setDefault: (config: FlipElementConfig) => void
  getDefault: () => FlipElementConfig
  registerPlugin: (plugin: VueFlipPlugin, options?: unknown) => void
  unregisterPlugin: (plugin: VueFlipPlugin) => void
}

// Middleware types - return false to prevent the operation
export interface DetachMiddleware {
  (id: string, el: HTMLElement, config: FlipElementConfig): boolean | void
}

export interface AttachMiddleware {
  (id: string, el: HTMLElement, config: FlipElementConfig): boolean | void
}

export interface FlipManagerMiddleware {
  detachMiddleware: DetachMiddleware[]
  attachMiddleware: AttachMiddleware[]
}

export interface VueFlipPlugin {
  name: string
  install: (flipManager: FlipManager, options: unknown) => () => void
}
