import { residentRequestSchema } from '@/composables/use-resident-request'
import { z } from 'zod'

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
