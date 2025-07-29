<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue'
import { computed, onBeforeUnmount, onMounted, ref, toValue, watch } from 'vue'

import { useFlip } from '../composable/useFlip'
import { mergeDefaultConfig } from '../core'
import type { FlipElementProps } from '../types'

const props = withDefaults(defineProps<FlipElementProps>(), {
  enabled: true,
  config: () => ({})
})
const emit = defineEmits(['attached', 'detached'])
const { detach, attach } = useFlip()
const el = ref<Element | ComponentPublicInstance | null>()
const mounted = ref(false)

const config = computed(() => mergeDefaultConfig(props.config))
const targetEl = computed(() => {
  const _el = toValue(el.value)
  return (_el as ComponentPublicInstance)?.$el || _el
})

function setEl (node: Element | ComponentPublicInstance | null) {
  el.value = node
}

function runDetach (target: Element | undefined) {
  if (!target) return
  detach(props.id, target, config.value)
  emit('detached', target)
}

async function runAttach (target: Element | undefined) {
  if (!target) return
  await attach(props.id, target, config.value)
  emit('attached', target)
}

watch(
  [targetEl, mounted, () => props.enabled],
  async ([target, mounted, enabled], [prevTarget, prevMounted, prevEnabled]) => {
    if (!target || !mounted) {
      if (prevTarget && prevMounted && prevEnabled) {
        runDetach(prevTarget)
      }
      return
    }
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
onBeforeUnmount(() => (mounted.value = false))
defineExpose({ setEl })
</script>

<template>
  <slot :set-el />
</template>
