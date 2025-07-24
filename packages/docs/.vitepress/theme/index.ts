import { flipManager, vFlip } from '@vue-gsap-flip/core'
import { VueFlipDebugPlugin } from '@vue-gsap-flip/debug'
import { VueFlipReducedMotionPlugin } from '@vue-gsap-flip/reduced-motion'
import { VueFlipVitepressRouterPlugin } from '@vue-gsap-flip/vitepress-router'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import 'virtual:uno.css'

export default {
  ...DefaultTheme,
  enhanceApp ({ app, router }) {
    app.directive('flip', vFlip)
    flipManager.registerPlugin(VueFlipReducedMotionPlugin)
    flipManager.registerPlugin(VueFlipVitepressRouterPlugin, { router })
    flipManager.registerPlugin(VueFlipDebugPlugin)
  }
} as Theme
