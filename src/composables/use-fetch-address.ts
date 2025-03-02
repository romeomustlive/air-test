import { ref } from 'vue'

import { type AddressSuggestion, fetchDadataAddress } from '@/api/dadata'

import { debounce } from '@/utils/debounce'

export function useFetchAddress() {
  const result = ref<AddressSuggestion[]>([])
  const isLoading = ref(false)

  const fetchAddress = debounce(async (value: string) => {
    isLoading.value = true
    const data = await fetchDadataAddress(value)
    result.value = data.suggestions
    isLoading.value = false
  }, 400)

  return { result, isLoading, fetchAddress }
}
