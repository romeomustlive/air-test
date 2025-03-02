import { ref } from 'vue'

import {
  type OrganizationSuggestion,
  fetchDadataOrganization,
} from '@/api/dadata'

import { debounce } from '@/utils/debounce'

export function useFetchOrganization() {
  const result = ref<OrganizationSuggestion[]>([])
  const isLoading = ref(false)

  const fetchOrganizations = debounce(async (value: string) => {
    isLoading.value = true
    const data = await fetchDadataOrganization(value)
    result.value = data.suggestions
    isLoading.value = false
  }, 400)

  return { result, isLoading, fetchOrganizations }
}
