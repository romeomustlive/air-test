<script setup lang="ts"></script>

<template>
  <div
    class="flex justify-between items-center px-5 py-2 hover:bg-gray-100 cursor-pointer"
  >
    <span class="text-primary font-medium block truncate">
      <slot />
    </span>
  </div>
</template>
