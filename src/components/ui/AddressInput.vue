<script setup lang="ts">
import { useFetchAddress } from '@/composables/use-fetch-address'
import { computed, ref, watch } from 'vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseListbox from '@/components/ui/listbox/BaseInputListboxOptions.vue'
import BaseListboxItem from '@/components/ui/listbox/BaseInputListboxOptionsItem.vue'
import BaseInputListbox from '@/components/ui/listbox/BaseInputListbox.vue'

defineProps<{
  label: string
  modelValue: string
  error?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const { result, fetchAddress } = useFetchAddress()

const isOpenOptions = ref(false)

const items = computed(() => {
  return result.value?.map((item) => item.value) || []
})

function handleClickItem(item: string) {
  emit('update:modelValue', item)

  isOpenOptions.value = false
}

watch(items, (newValue) => {
  if (newValue.length) {
    isOpenOptions.value = true
  } else {
    isOpenOptions.value = false
  }
})
</script>

<template>
  <BaseInputListbox>
    <BaseInput
      :placeholder="label"
      :model-value="modelValue"
      :error="error"
      class="w-full"
      @update:model-value="fetchAddress"
    />

    <BaseListbox v-if="isOpenOptions">
      <BaseListboxItem
        v-for="item in items"
        :key="item"
        @click="handleClickItem(item)"
      >
        {{ item }}
      </BaseListboxItem>
    </BaseListbox>
  </BaseInputListbox>
</template>

<style scoped></style>
