import type { FlipElementConfig, FlipManager, VueFlipPlugin } from '@vue-gsap-flip/core'

export const VueFlipReducedMotionPlugin: VueFlipPlugin = {
  name: 'VueFlipReducedMotion',

  install (flipManager: FlipManager) {
    if (typeof window === 'undefined') return () => {}
    const mm = window.matchMedia('(prefers-reduced-motion: reduce)')
    let isReducedMotion = mm.matches === true

    function detachMiddleware (_id: string, _el: Element, config: FlipElementConfig) {
      return !isReducedMotion || config.respectReducedMotion === false
    }

    function attachMiddleware (_id: string, _el: Element, config: FlipElementConfig) {
      return !isReducedMotion || config.respectReducedMotion === false
    }

    mm.addEventListener('change', e => (isReducedMotion = e.matches))

    flipManager.addDetachMiddleware(detachMiddleware)
    flipManager.addAttachMiddleware(attachMiddleware)

    return () => {
      flipManager.removeDetachMiddleware(detachMiddleware)
      flipManager.removeAttachMiddleware(attachMiddleware)
    }
  }
}
