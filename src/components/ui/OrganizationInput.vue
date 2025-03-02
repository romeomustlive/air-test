<script setup lang="ts">
import { ref, watch } from 'vue'

import BaseInput from '@/components/ui/BaseInput.vue'
import BaseInputListbox from '@/components/ui/listbox/BaseInputListbox.vue'
import BaseInputListboxOptions from '@/components/ui/listbox/BaseInputListboxOptions.vue'
import BaseInputListboxOptionsItem from '@/components/ui/listbox/BaseInputListboxOptionsItem.vue'

import { useFetchOrganizations } from '@/composables/use-fetch-organization'

import type { OrganizationSuggestion } from '@/api/dadata'

defineProps<{
  name: string
  modelValue: string
  error?: string
}>()

const { result, fetchOrganizations } = useFetchOrganizations()

const emit = defineEmits<{
  (e: 'update:modelValue', value: OrganizationSuggestion): void
}>()

const isOpenOptions = ref(false)

function handleClickItem(item: OrganizationSuggestion) {
  emit('update:modelValue', item)
  isOpenOptions.value = false
}

watch(result, (newValue) => {
  if (newValue.length) {
    isOpenOptions.value = true
  } else {
    isOpenOptions.value = false
  }
})
</script>

<template>
  <BaseInputListbox class="w-full">
    <BaseInput
      :name="name"
      :model-value="modelValue"
      label="Наименование организации/ИП"
      :error="error"
      @update:model-value="fetchOrganizations"
    />
    <BaseInputListboxOptions v-if="isOpenOptions">
      <BaseInputListboxOptionsItem
        v-for="item in result"
        :key="item.value"
        @click="handleClickItem(item)"
      >
        {{ item.value }}
      </BaseInputListboxOptionsItem>
    </BaseInputListboxOptions>
  </BaseInputListbox>
</template>

<style scoped></style>
