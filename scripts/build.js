#!/usr/bin/env node

import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

console.log('🏗️  Building Vue Flip Monorepo...')

// Check if packages exist
const packages = ['core', 'debug', 'vue-router', 'vitepress-router', 'reduced-motion', 'nuxt']
const missingPackages = packages.filter(pkg => !fs.existsSync(path.join(__dirname, '..', 'packages', pkg)))

if (missingPackages.length > 0) {
  console.error(`❌ Missing packages: ${missingPackages.join(', ')}`)
  process.exit(1)
}

// Build each package
packages.forEach((pkg) => {
  console.log(`📦 Building  @vue-gsap-flip/${pkg}...`)
  try {
    execSync('npm run build', {
      cwd: path.join(__dirname, '..', 'packages', pkg),
      stdio: 'inherit'
    })
    console.log(`✅  @vue-gsap-flip/${pkg} built successfully`)
  } catch (error) {
    console.error(`❌ Failed to build  @vue-gsap-flip/${pkg}`)
    process.exit(1)
  }
})

console.log('🎉 All packages built successfully!')
