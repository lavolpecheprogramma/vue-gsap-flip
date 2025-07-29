import { defineNuxtModule, addPlugin, createResolver, addImports, addTemplate } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {
  directive: boolean
  plugins: { name: string, from: string }[]
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@vue-gsap-flip/nuxt',
    configKey: 'vueGsapFlip',
  },
  // Default configuration options of the Nuxt module
  defaults: {
    directive: true,
    plugins: [],
  },
  setup(options) {
    const resolver = createResolver(import.meta.url)

    addTemplate({
      filename: 'vue-gsap-flip.config.mjs',
      getContents: () => `
      ${options.plugins.map(({ name, from }) => `import { ${name} } from '${from}'`).join('\n')}
      export const plugins = [${options.plugins.map(plugin => plugin.name).join(',')}]
      export const directive = ${options.directive}
      `,
    })

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))

    // Register auto-loaded components
    const names = [
      'useFlip',
      'FlipElement',
    ]

    names.forEach(name =>
      addImports({ name, as: name, from: '@vue-gsap-flip/core' }),
    )
  },
})
