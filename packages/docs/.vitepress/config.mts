import { dirname, resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vitepress'

const __dirname = dirname(fileURLToPath(import.meta.url))
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Vue Flip',
  description: 'A Vue 3 library for creating smooth flip animations using GSAP\'s Flip plugin',
  base: '/vue-gsap-flip/',
  vite: {
    resolve: {
      alias: process.env.CI
        ? {}
        : { '@vue-gsap-flip/core': resolve(__dirname, '../core/src') }
    },
    plugins: [
      UnoCSS() as any
    ],
    server: {
      allowedHosts: [
        '.trycloudflare.com'
      ]
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'GitHub', link: 'https://github.com/your-username/vue-gsap-flip' }
    ],

    sidebar: [

      {
        text: 'Getting Started',
        items: [
          { text: 'Introduction', link: '/getting-started/' },
          { text: 'Installation', link: '/getting-started/installation' },
          { text: 'Quick Start', link: '/getting-started/quick-start' }
        ]
      },
      {
        text: '@vue-gsap-flip/core',
        items: [
          { text: 'Overview', link: '/core/' },
          { text: 'Flip Manager', link: '/core/flip-manager' },
          { text: 'FlipElement Component', link: '/core/flip-element' },
          { text: 'Plugin System', link: '/core/plugin-system' },
          { text: 'Type augmentation', link: '/core/type-augmentation' }
        ]
      },
      {
        text: '@vue-gsap-flip/reduced-motion',
        items: [
          { text: 'Quick start', link: '/reduced-motion/' },
          { text: 'Overview', link: '/reduced-motion/overview' },
          { text: 'How it works', link: '/reduced-motion/how-it-works' },
          { text: 'Usage', link: '/reduced-motion/usage' }
        ]
      },
      {
        text: '@vue-gsap-flip/vue-router',
        items: [
          { text: 'Quick start', link: '/router/' },
          { text: 'Overview', link: '/router/overview' },
          { text: 'How it works', link: '/router/how-it-works' },
          { text: 'Usage', link: '/router/usage' }
        ]
      },
      {
        text: '@vue-gsap-flip/debug',
        items: [
          { text: 'Quick start', link: '/debug/' }
        ]
      }
    ],
    // '/router/': [
    //   {
    //     text: '@vue-gsap-flip/reduced-motion',
    //     items: [
    //       { text: 'Overview', link: '/reduced-motion/' }
    //     ]
    //   }
    // ],
    // '/router/': [
    //   {
    //     text: '@vue-gsap-flip/vue-router',
    //     items: [
    //       { text: 'Overview', link: '/router/' }
    //     ]
    //   }
    // ],
    // '/advanced/': [
    //   {
    //     text: 'Advanced Topics',
    //     items: [
    //       { text: 'Custom Plugin Development', link: '/advanced/' }
    //     ]
    //   }
    // ],
    // '/api/': [
    //   {
    //     text: 'API Reference',
    //     items: [
    //       { text: 'Core Package', link: '/api/core' },
    //       { text: 'Router Package', link: '/api/router' },
    //       { text: 'Types', link: '/api/types' }
    //     ]
    //   }
    // ],
    // '/examples/': [
    //   {
    //     text: 'Examples',
    //     items: [
    //       { text: 'Basic Usage', link: '/examples/basic' },
    //       { text: 'Router Integration', link: '/examples/router' },
    //       { text: 'Custom Guards', link: '/examples/guards' },
    //       { text: 'Plugin System', link: '/examples/plugins' }
    //     ]
    //   }
    // ]
    // },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-username/vue-gsap-flip' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present Vue Flip'
    }
  }
})
