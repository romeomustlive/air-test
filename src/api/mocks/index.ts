import { z } from 'zod'

import { residentRequestSchema } from '@/composables/use-resident-request'

export function createResidentRequestMock(
  data: z.infer<typeof residentRequestSchema>,
) {
  console.log(data)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
      })
    }, 1000)
  })
}
