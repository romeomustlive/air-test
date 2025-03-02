<script setup lang="ts">
import clsx from 'clsx'

defineProps<{
  rounded?: boolean
  disabled?: boolean
}>()
</script>

<template>
  <button
    :class="
      clsx(
        rounded ? 'rounded-2xl' : 'rounded-md',
        'bg-primary text-white px-4 py-2  cursor-pointer disabled:opacity-50',
      )
    "
    :disabled="disabled"
  >
    <slot />
  </button>
</template>
