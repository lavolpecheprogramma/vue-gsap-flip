# Development Guide

This guide explains how to develop and contribute to the Vue Flip Animation Library monorepo.

## Project Structure

```
vue-gsap-flip/
├── packages/
│   ├── core/                 # Core flip animation functionality
│   │   ├── src/
│   │   │   ├── composables/  # useFlipManager
│   │   │   ├── components/   # FlipElement
│   │   │   └── types.ts      # Core types
│   │   ├── package.json
│   │   ├── vite.config.ts
│   │   └── tsconfig.json
│   └── router/               # Vue Router integration
│       ├── src/
│       │   ├── composables/  # useRouterFlipManager
│       │   └── types.ts      # Router-specific types
│       ├── package.json
│       ├── vite.config.ts
│       └── tsconfig.json
├── examples/                 # Usage examples
├── docs/                     # Documentation
├── scripts/                  # Build scripts
└── package.json              # Root package.json with workspaces
```

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build all packages:**
   ```bash
   npm run build
   ```

3. **Type check all packages:**
   ```bash
   npm run type-check
   ```

## Development Workflow

### Core Package Development

The core package (`@vue-gsap-flip/core`) contains the basic flip animation functionality without any router dependencies.

**Key files:**
- `packages/core/src/composables/useFlipManager.ts` - Main flip manager logic
- `packages/core/src/components/FlipElement.vue` - Vue component for flip animations
- `packages/core/src/types.ts` - Core type definitions

**To develop the core package:**
```bash
cd packages/core
npm run build
npm run type-check
```

### Router Package Development

The router package (`@vue-gsap-flip/vue-router`) extends the core functionality with Vue Router integration.

**Key files:**
- `packages/router/src/composables/useRouterFlipManager.ts` - Router-specific flip manager
- `packages/router/src/types.ts` - Router-specific type definitions

**To develop the router package:**
```bash
cd packages/router
npm run build
npm run type-check
```

## Package Dependencies

### Core Package Dependencies
- **Peer Dependencies:** `vue`, `gsap`
- **Dev Dependencies:** `@vitejs/plugin-vue`, `@vueuse/core`, `typescript`, `vite`, `vite-plugin-dts`

### Router Package Dependencies
- **Peer Dependencies:** `vue`, `gsap`, `vue-router`
- **Dependencies:** `@vue-gsap-flip/core` (workspace dependency)
- **Dev Dependencies:** Same as core + `vue-router`

## Building and Testing

### Build Commands

```bash
# Build all packages
npm run build

# Build specific package
cd packages/core && npm run build
cd packages/router && npm run build

# Type check all packages
npm run type-check
```

### Testing the Build

After building, you can test the packages by:

1. **Core Package Test:**
   ```bash
   cd packages/core
   npm link
   # In a test project
   npm link @vue-gsap-flip/core
   ```

2. **Router Package Test:**
   ```bash
   cd packages/router
   npm link
   # In a test project
   npm link @vue-gsap-flip/vue-router
   ```

## Adding New Features

### Adding to Core Package

1. Create your feature in `packages/core/src/`
2. Export it from `packages/core/src/index.ts`
3. Update types in `packages/core/src/types.ts`
4. Build and test

### Adding to Router Package

1. Create your feature in `packages/router/src/`
2. Export it from `packages/router/src/index.ts`
3. Update types in `packages/router/src/types.ts`
4. Build and test

### Adding New Packages

1. Create a new directory in `packages/`
2. Add `package.json` with appropriate dependencies
3. Add build configuration (`vite.config.ts`, `tsconfig.json`)
4. Update root `package.json` workspaces if needed
5. Add to build script in `scripts/build.js`

## Publishing

### Publishing Core Package

```bash
cd packages/core
npm publish
```

### Publishing Router Package

```bash
cd packages/router
npm publish
```

**Note:** Make sure to build both packages before publishing, as the router package depends on the core package.

## Troubleshooting

### Common Issues

1. **Build fails with module not found errors:**
   - Make sure all dependencies are installed: `npm install`
   - Check that workspace dependencies are correctly configured

2. **TypeScript errors:**
   - Run `npm run type-check` to see all errors
   - Make sure types are properly exported from index files

3. **Vue component not working:**
   - Check that `@vitejs/plugin-vue` is configured in vite.config.ts
   - Ensure the component is properly exported from index.ts

### Development Tips

1. **Use workspace dependencies:** When one package depends on another, use `workspace:*` in package.json
2. **Keep types consistent:** Make sure types are properly shared between packages
3. **Test both packages:** Always test both core and router functionality
4. **Update documentation:** Keep README.md and examples up to date

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Build and test all packages
5. Submit a pull request

## License

MIT
