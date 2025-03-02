import { ref } from 'vue'

import {
  type OrganizationSuggestion,
  fetchDadataOrganizations,
} from '@/api/dadata'

import { debounce } from '@/utils/debounce'

export function useFetchOrganizations() {
  const result = ref<OrganizationSuggestion[]>([])
  const isLoading = ref(false)

  const fetchOrganizations = debounce(async (value: string) => {
    isLoading.value = true
    const data = await fetchDadataOrganizations(value)
    result.value = data.suggestions
    isLoading.value = false
  }, 400)

  return { result, isLoading, fetchOrganizations }
}
