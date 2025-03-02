<script setup lang="ts">
defineProps<{
  name: string
  label?: string
  placeholder?: string
  error?: string
}>()

const model = defineModel<string>({ required: true })
</script>

<template>
  <div class="flex flex-col gap-1">
    <div class="form-field">
      <div class="w-full">
        <label v-if="label" :for="name" class="label">
          {{ label }}
        </label>

        <input
          :id="name"
          v-model="model"
          :name="name"
          :placeholder="placeholder"
          type="text"
          class="input placeholder:text-primary placeholder:font-light placeholder:text-sm"
        />
      </div>
    </div>
    <span v-if="error" class="text-red-500 text-sm">{{ error }}</span>
  </div>
</template>

<style scoped></style>
