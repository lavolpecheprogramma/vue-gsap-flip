<script setup lang="ts">
import { FlipElement } from '@vue-gsap-flip/core'

defineProps<{ type?: 'big' }>()
</script>

<template>
  <FlipElement id="box" v-slot="{ setEl }">
    <div
      :ref="setEl"
      class="bg-blue"
      :class="{
        'w-10 h-10': type !== 'big',
        'w-20 h-20': type === 'big'
      }"
    />
  </FlipElement>
</template>
