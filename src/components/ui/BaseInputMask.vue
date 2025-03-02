<script setup lang="ts">
import { MaskInput } from 'vue-3-mask'

defineProps<{
  name: string
  label: string
  mask: string
  error?: string
}>()

const model = defineModel<string>({ required: true })
</script>

<template>
  <div class="flex flex-col gap-1 w-full">
    <div class="form-field">
      <div>
        <label class="label" :for="name">
          {{ label }}
        </label>
        <MaskInput :id="name" v-model="model" :mask="mask" class="input" />
      </div>
    </div>
    <span v-if="error" class="text-red-500 text-sm">{{ error }}</span>
  </div>
</template>

<style scoped></style>
