<script setup lang="ts">
import clsx from 'clsx'

defineProps<{
  block?: boolean
  rounded?: boolean
  disabled?: boolean
}>()
</script>

<template>
  <button
    :class="
      clsx(
        rounded ? 'rounded-4xl' : 'rounded-md',
        block ? 'w-full' : '',
        'bg-primary text-white px-10 py-3 cursor-pointer disabled:opacity-50',
      )
    "
    :disabled="disabled"
  >
    <slot />
  </button>
</template>
