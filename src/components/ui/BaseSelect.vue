<script setup lang="ts" generic="T extends string | string[]">
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/vue'
import { CheckIcon, ChevronDownIcon } from '@heroicons/vue/20/solid'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    label: string
    items: string[]
    multiple?: boolean
    placeholder?: string
    error?: string
  }>(),
  {
    multiple: false,
    placeholder: 'Выберите один или несколько вариантов',
  },
)

const model = defineModel<T>({ required: true })

const labelValues = computed(() => {
  return props.multiple && Array.isArray(model.value)
    ? model.value.join(', ')
    : model.value
})

const hasValue = computed(() => {
  return props.multiple && Array.isArray(model.value)
    ? model.value.length > 0
    : !!model.value
})
</script>

<template>
  <Listbox v-model="model" :multiple="multiple" class="w-full">
    <div class="relative">
      <ListboxButton
        class="form-field text-left w-full relative cursor-pointer"
      >
        <div>
          <span class="label">{{ label }}</span>

          <span class="input block truncate">
            {{ hasValue ? labelValues : placeholder }}
          </span>

          <span
            class="text-gray-500 text-sm absolute right-5 top-1/2 -translate-y-1/2"
          >
            <ChevronDownIcon class="w-5 h-5 text-primary" />
          </span>
        </div>
      </ListboxButton>

      <span v-if="error" class="text-red-500 text-sm">{{ error }}</span>

      <ListboxOptions
        class="absolute top-full left-0 mt-1 max-h-60 overflow-y-auto border-2 border-gray-100 rounded-md bg-white w-full z-10"
      >
        <ListboxOption
          v-for="(item, index) in items"
          v-slot="{ selected }"
          :key="index"
          :value="item"
          class="cursor-pointer py-2 hover:bg-gray-100"
        >
          <li class="flex justify-between items-center px-5 py-2">
            <span class="text-primary font-medium block truncate">
              {{ item }}
            </span>
            <span v-if="selected" class="text-gray-500 text-sm">
              <CheckIcon class="w-4 h-4" />
            </span>
          </li>
        </ListboxOption>
      </ListboxOptions>
    </div>
  </Listbox>
</template>

<style scoped></style>
