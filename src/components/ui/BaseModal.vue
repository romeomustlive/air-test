<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'

defineProps<{
  title?: string
}>()
</script>

<template>
  <VueFinalModal
    class="flex justify-center items-center"
    content-class="flex flex-col mx-4 p-10 bg-white w-[50rem]"
  >
    <h4 v-if="title" class="text-2xl font-semibold pb-10">
      {{ title }}
    </h4>
    <slot />
  </VueFinalModal>
</template>

<style scoped></style>
