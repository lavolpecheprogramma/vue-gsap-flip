import type { Directive } from 'vue'

import { attach, detach } from '../core'
import type { FlipElementConfig, FlipElementProps } from '../types'

type VFlipElementProps = FlipElementProps & {
  mounted: boolean
  el: HTMLElement | null
}

export type VFlipElement = HTMLElement & {
  _vflip?: VFlipElementProps
}

function runDetach (el: VFlipElement) {
  if (!el?._vflip) return
  detach(el._vflip.id, el, el._vflip.config)
}

async function runAttach (el: VFlipElement) {
  if (!el?._vflip) return
  await attach(el._vflip.id, el, el._vflip.config)
}

export const vFlip: Directive<HTMLElement, any> = {
  created: (el: VFlipElement, { arg, value }) => {
    if (!el._vflip) el._vflip = { el, enabled: true, mounted: false } as VFlipElementProps
    if (!arg) {
      el._vflip.id = value as string
    }
    if (arg === 'id') el._vflip.id = value as string
    if (arg === 'enabled') el._vflip.enabled = value as boolean
    if (arg === 'trigger') el._vflip.trigger = value
    if (arg === 'config') el._vflip.config = value as FlipElementConfig
  },
  mounted: async (el: VFlipElement, { arg }) => {
    if (arg || !el._vflip) return
    el._vflip.mounted = true
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
    // @ts-expect-error type mismatch
    el._vflip![arg] = value

    if (arg === 'trigger' && el._vflip.enabled && value !== oldValue) {
      await runAttach(el)
    } else if (arg === 'enabled' && el._vflip.mounted && value && !oldValue) {
      await runAttach(el)
    }
  },
  unmounted: (el: VFlipElement, { arg }) => {
    if (arg || !el._vflip) return
    el._vflip.mounted = false
    runDetach(el)
  }
}
