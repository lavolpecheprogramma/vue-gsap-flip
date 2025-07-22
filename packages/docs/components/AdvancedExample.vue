<script setup lang="ts">
import { FlipElement, useFlip } from '@vue-gsap-flip/core'
import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'
import { ref } from 'vue'

const manager = useFlip()
const toggle = ref(false)
const transitioning = ref(false)
const config = { clone: true, flipStateVars: { scale: true } }

function onLeave (el: Element, done: () => void) {
  const tl = gsap.timeline({ onComplete: () => done() })
  tl.to(gsap.utils.toArray('.box-text', el), { autoAlpha: 0, duration: 0.5 })
  const data = manager.store.get('box')
  if (data?.clone) {
    tl.to(data.clone, {
      rotate: 360,
      x: window.innerWidth / 2,
      xPercent: -50,
      yPercent: -150,
      duration: 0.5,
      onComplete: () => {
        manager.store.set('box', { ...data, state: Flip.getState(data.clone as HTMLElement, data.config.flipStateVars) })
      }
    })
  }
}

function onEnter (el: Element, done: () => void) {
  const tl = gsap.timeline({ onComplete: () => done() })
  tl.from(gsap.utils.toArray('.box-text', el), { autoAlpha: 0, duration: 0.5 })
}
</script>

<template>
  <div class="w-full">
    <button class="btn mb-2" :disabled="transitioning" @click="toggle = !toggle">Toggle</button>
    <div class="border-solid border-blue">
      <Transition
        mode="out-in"
        :css="false"
        @after-enter="transitioning = false"
        @before-leave="transitioning = true"
        @enter="onEnter"
        @leave="onLeave"
      >
        <div v-if="!toggle" class="grid grid-cols-2">
          <div class="box box-text">
            <p>Step 1</p>
          </div>
          <div class="box">
            <FlipElement id="box" :config="config" v-slot="{ setEl }">
              <div :ref="setEl" class="w-4 h-4 bg-blue" />
            </FlipElement>
          </div>
        </div>
        <div v-else class="grid grid-cols-2">
          <div class="box">
            <FlipElement id="box" :config="config" v-slot="{ setEl }">
              <div :ref="setEl" class="w-30 h-30 bg-blue" />
            </FlipElement>
          </div>
          <div class="box box-text">
            <p>Step 2</p>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.box {
  @apply h-40 p-4 flex items-center justify-center;
}
</style>
