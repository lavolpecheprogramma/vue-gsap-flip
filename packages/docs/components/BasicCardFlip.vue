<script setup>
import { FlipElement } from '@vue-gsap-flip/core'
import { ref } from 'vue'

const isExpanded = ref(false)

function toggleCard () {
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <div class="example">
    <button class="btn mb-2" @click="toggleCard">Toggle Card</button>
    <FlipElement
      id="card"
      :config="{
        flipVars: { duration: 0.3 },
        flipStateVars: { props: 'borderRadius,backgroundColor' }
      }"
      :trigger="isExpanded"
      v-slot="{ setEl }"
    >
      <div
        :ref="setEl"
        :class="{ 'card': !isExpanded, 'card--expanded': isExpanded }"
      />
    </FlipElement>
  </div>
</template>

<style scoped>
.example {
  width: 100%;
}

.card {
  background-color: white;
  border-radius: 8px;
  width: 100px;
  height: 100px;
}

.card--expanded {
  border-radius: 200px;
  margin-left: 50%;
  height: 200px;
  width: 50%;
  background-color: red;
}
</style>
