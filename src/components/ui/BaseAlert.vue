<script setup lang="ts">
defineProps<{
  message: string
}>()
</script>

<template>
  <div class="bg-red-100 text-red-700 p-8 rounded-lg">
    <p v-if="message">{{ message }}</p>
    <p v-if="$slots.default"><slot /></p>
  </div>
</template>

<style scoped></style>
