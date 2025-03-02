<script setup lang="ts">
defineEmits<{
  (e: 'submit'): void
}>()
</script>

<template>
  <form class="flex flex-col gap-5" @submit.prevent="$emit('submit')">
    <slot />
  </form>
</template>

<style scoped></style>
