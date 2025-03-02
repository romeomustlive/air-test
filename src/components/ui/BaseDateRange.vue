<script setup lang="ts">
import { format, parse } from 'date-fns'

const props = defineProps<{
  name: string
  label: string
  minLabel: string
  maxLabel: string
  min?: Date
  max?: Date
  modelValue: { min: Date | null; max: Date | null }
  error?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: { min: Date | null; max: Date | null }): void
}>()

function handleMinChange(event: Event) {
  const value = (event.target as HTMLInputElement).value

  emit('update:modelValue', {
    ...props.modelValue,
    min: value ? parse(value, 'yyyy-MM-dd', new Date()) : null,
  })
}

function handleMaxChange(event: Event) {
  const value = (event.target as HTMLInputElement).value

  emit('update:modelValue', {
    ...props.modelValue,
    max: value ? parse(value, 'yyyy-MM-dd', new Date()) : null,
  })
}

function handleMinBlur() {
  emit('update:modelValue', {
    ...props.modelValue,
    min: validatedMinValue(props.modelValue.min),
  })
}

function handleMaxBlur() {
  emit('update:modelValue', {
    ...props.modelValue,
    max: validatedMaxValue(props.modelValue.max),
  })
}

function validatedMinValue(value: Date | null) {
  if (props.min && value && value < props.min) {
    return props.min
  }
  if (props.max && value && value > props.max) {
    return props.max
  }

  return value
}

function validatedMaxValue(value: Date | null) {
  if (props.modelValue.min && value && value < props.modelValue.min) {
    return props.modelValue.min
  }
  if (props.min && value && props.min > value) {
    return props.min
  }
  if (props.max && value && props.max < value) {
    return props.max
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
          <span class="label block flex-1">{{ minLabel }}</span>
          <div class="w-[6.3rem]">
            <input
              :id="name"
              type="date"
              class="input w-2"
              style="direction: rtl"
              :value="
                modelValue.min ? format(modelValue.min, 'yyyy-MM-dd') : ''
              "
              @change="handleMinChange"
              @blur="handleMinBlur"
            />
          </div>
        </div>
        <div class="form-field flex-1 w-full flex gap-2">
          <span class="label block flex-1">{{ maxLabel }}</span>
          <div class="w-[6.3rem]">
            <input
              :id="name"
              type="date"
              class="input w-2"
              style="direction: rtl"
              :value="
                modelValue.max ? format(modelValue.max, 'yyyy-MM-dd') : ''
              "
              @change="handleMaxChange"
              @blur="handleMaxBlur"
            />
          </div>
        </div>
      </div>
      <span v-if="error" class="text-red-500 text-sm">{{ error }}</span>
    </div>
  </div>
</template>
