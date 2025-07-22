<script setup lang="ts">
import { unrefElement } from '@vueuse/core'
import type { ComponentPublicInstance } from 'vue'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

import { useFlip } from '../composable/useFlip'
import { mergeDefaultConfig } from '../core'
import type { FlipElementConfig } from '../types'

export interface FlipElementProps {
  id: string
  enabled?: boolean
  trigger?: unknown
  config?: FlipElementConfig
}

const props = withDefaults(defineProps<FlipElementProps>(), {
  enabled: true,
  config: () => ({})
})
const emit = defineEmits(['attached', 'detached'])
const { detach, attach } = useFlip()
const el = ref<HTMLElement | ComponentPublicInstance>()
const mounted = ref(false)
const config = computed(() => mergeDefaultConfig(props.config))
const targetEl = computed(() => unrefElement(el) as HTMLElement | undefined)
function setEl (node: HTMLElement | ComponentPublicInstance) {
  el.value = node
}

function runDetach (target: HTMLElement | undefined) {
  if (!target) return
  detach(props.id, target, config.value)
  emit('detached')
}

async function runAttach (target: HTMLElement | undefined) {
  if (!target) return
  await attach(props.id, target, config.value)
  emit('attached')
}

watch(
  [targetEl, mounted, () => props.enabled],
  async ([target, mounted, enabled], [prevTarget, prevMounted, prevEnabled]) => {
    if (prevTarget && prevMounted && prevEnabled) {
      runDetach(prevTarget)
    }
    if (!target || !mounted) return
    if (!enabled) {
      runDetach(target)
    } else {
      await runAttach(target)
    }
  },
  { flush: 'sync' }
)

watch([targetEl, () => props.trigger], ([el, trigger]) => {
  if (trigger === undefined || !mounted.value) return
  runDetach(el)
}, { flush: 'pre', deep: 2 })

watch([targetEl, () => props.trigger], async ([el, trigger]) => {
  if (trigger === undefined || !mounted.value) return
  await runAttach(el)
}, { flush: 'post', deep: 2 })

onMounted(() => (mounted.value = true))
onBeforeUnmount(() => {
  mounted.value = false
  runDetach(unrefElement(el) as HTMLElement)
})
defineExpose({ setEl })
</script>

<template>
  <slot :set-el />
</template>
