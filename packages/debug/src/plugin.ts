import type { FlipElementConfig, FlipManager, VueFlipPlugin } from '@vue-gsap-flip/core'

export const VueFlipDebugPlugin: VueFlipPlugin = {
  name: 'VueFlipDebug',

  install (flipManager: FlipManager) {
    const debugMiddleware = (id: string, el: HTMLElement, config: FlipElementConfig) => {
      console.group(`🔄 [VueFlipDebug] Detaching: ${id}`)
      console.log('Element:', el)
      console.log('Config:', config)
      console.groupEnd()

      return true
    }

    const completeMiddleware = (id: string, el: HTMLElement, config: FlipElementConfig) => {
      console.group(`✅ [VueFlipDebug] Attaching: ${id}`)
      console.log('Element:', el)
      console.log('Config:', config)
      console.groupEnd()
      return true
    }

    flipManager.addDetachMiddleware(debugMiddleware)
    flipManager.addAttachMiddleware(completeMiddleware)

    return () => {
      flipManager.removeDetachMiddleware(debugMiddleware)
      flipManager.removeAttachMiddleware(completeMiddleware)
    }
  }
}
