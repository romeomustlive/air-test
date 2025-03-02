<script setup lang="ts">
const props = defineProps<{
  name: string
  label: string
  minLabel: string
  maxLabel: string
  error?: string
  min?: number
  max?: number
  modelValue: { min: number; max: number }
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: { min: number; max: number }): void
}>()

function handleMinInput(event: Event) {
  const value = (event.target as HTMLInputElement).value
  emit('update:modelValue', {
    ...props.modelValue,
    min: parseInt(value),
  })
}

function handleMaxInput(event: Event) {
  const value = (event.target as HTMLInputElement).value
  emit('update:modelValue', {
    ...props.modelValue,
    max: parseInt(value),
  })
}

function handleMinBlur() {
  emit('update:modelValue', {
    ...props.modelValue,
    min: validatedMinInputValue(props.modelValue.min),
  })
}

function handleMaxBlur() {
  emit('update:modelValue', {
    ...props.modelValue,
    max: validatedMaxInputValue(props.modelValue.max),
  })
}

function validatedMinInputValue(value: number) {
  if (props.min && value < props.min) {
    return props.min
  }
  if (props.max && value > props.max) {
    return props.max
  }
  return value
}

function validatedMaxInputValue(value: number) {
  if (value < props.modelValue.min) {
    return props.modelValue.min
  }
  if (props.max && value > props.max) {
    return props.max
  }
  if (props.min && value < props.min) {
    return props.min
  }
  return value
}
</script>

<template>
  <div class="flex flex-col w-full gap-2">
    <label class="label" :for="name">
      {{ label }}
    </label>

    <div class="flex flex-col gap-1">
      <div class="flex gap-2">
        <div class="form-field flex-1 w-full flex gap-2">
          <span class="label">{{ minLabel }}</span>
          <input
            :id="name"
            ref="firstInputRef"
            type="number"
            class="input w-2"
            style="direction: rtl"
            :value="modelValue.min"
            @input="handleMinInput"
            @blur="handleMinBlur"
          />
        </div>
        <div class="form-field flex-1 w-full flex gap-2">
          <span class="label">{{ maxLabel }}</span>
          <input
            :id="name"
            type="number"
            class="input"
            style="direction: rtl"
            :value="modelValue.max"
            @input="handleMaxInput"
            @blur="handleMaxBlur"
          />
        </div>
      </div>
      <span v-if="error" class="text-red-500 text-sm">{{ error }}</span>
    </div>
  </div>
</template>

<style scoped></style>
