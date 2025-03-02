export type AddressSuggestionResponse = {
  suggestions: AddressSuggestion[]
}

export type AddressSuggestion = {
  value: string
  unrestricted_value: string
}

export type OrganizationSuggestionResponse = {
  suggestions: OrganizationSuggestion[]
}

export type OrganizationSuggestion = {
  value: string
  data: {
    address: {
      value: string
    }
  }
}

export async function fetchDadataAddress(
  query: string,
): Promise<AddressSuggestionResponse> {
  const data = await fetch(
    `https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${import.meta.env.VITE_DADATA_API_KEY}`,
      },
      method: 'POST',
      body: JSON.stringify({ query }),
    },
  )

  return await data.json()
}

export async function fetchDadataOrganizations(
  query: string,
): Promise<OrganizationSuggestionResponse> {
  const data = await fetch(
    `https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${import.meta.env.VITE_DADATA_API_KEY}`,
      },
      method: 'POST',
      body: JSON.stringify({ query }),
    },
  )

  return await data.json()
}
