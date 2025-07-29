import type { Directive } from 'vue'

import { attach, detach } from '../core'
import type { FlipElementProps } from '../types'

type VFlipElementProps = FlipElementProps & {
  'mounted': boolean
  'el': Element | null
  'on-attached'?: (el: VFlipElement) => void
  'on-detached'?: (el: VFlipElement) => void
}

export type VFlipElement = Element & {
  _vflip?: VFlipElementProps
}

function runDetach (el: VFlipElement) {
  if (!el?._vflip) return
  detach(el._vflip.id, el, el._vflip.config)
  el._vflip['on-detached']?.(el)
}

async function runAttach (el: VFlipElement) {
  if (!el?._vflip) return
  await attach(el._vflip.id, el, el._vflip.config)
  el._vflip['on-attached']?.(el)
}

export const vFlip: Directive<Element, any> = {
  created: (el: VFlipElement, { arg, value }) => {
    if (!el._vflip) el._vflip = { el, enabled: true, mounted: false } as VFlipElementProps
    if (!arg) {
      el._vflip!.id = value
    } else {
      // @ts-expect-error type mismatch
      el._vflip![arg] = value
    }
  },
  mounted: async (el: VFlipElement, { arg }) => {
    if (arg || !el._vflip) return
    el._vflip.mounted = true
    await runAttach(el)
  },
  beforeUpdate: (el: VFlipElement, { arg, value, oldValue }) => {
    if (!el._vflip || !el._vflip.mounted || !el._vflip.enabled) return
    // programmatically handling animation according to "trigger" or "enabled" arg (which is supposed to be a mutable ref)
    if ((arg === 'trigger' || arg === 'enabled') && value !== oldValue) {
      runDetach(el)
    }
  },
  updated: async (el: VFlipElement, { arg, value, oldValue }) => {
    if (!el._vflip || !el._vflip.mounted) return

    if (!arg) {
      el._vflip!.id = value
    } else {
      // @ts-expect-error type mismatch
      el._vflip![arg] = value
    }

    if (arg === 'trigger' && el._vflip.enabled && value !== oldValue) {
      await runAttach(el)
    } else if (arg === 'enabled' && el._vflip.mounted && value && !oldValue) {
      await runAttach(el)
    }
  },
  beforeUnmount: (el: VFlipElement, { arg }) => {
    if (arg || !el._vflip) return
    runDetach(el)
    el._vflip.mounted = false
  }
}
