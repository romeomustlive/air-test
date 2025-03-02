import { createResidentRequestMock } from '@/api/mocks'
import { z } from 'zod'
import { ref } from 'vue'

export const residentRequestSchema = z.object({
  organizationName: z.string().min(1, 'Обязательное поле'),
  phone: z
    .string()
    .min(1, 'Обязательное поле')
    .refine((value) => {
      return /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(value)
    }, 'Неверный формат номера телефона'),
  type: z.string().min(1, 'Обязательное поле'),
  address: z.string().min(1, 'Обязательное поле'),
  areaRange: z.object({
    min: z.number().min(0, 'Минимальная площадь не может быть меньше 0'),
    max: z.number().min(0, 'Максимальная площадь не может быть меньше 0'),
  }),
  dateRange: z
    .object({
      min: z.date().nullable(),
      max: z.date().nullable(),
    })
    .refine((data) => data.min !== null || data.max !== null, {
      message: 'Обязательное поле',
      path: ['min', 'max'],
    }),
})

export function useResidentRequest() {
  const isLoading = ref(false)

  async function sendResidentRequest(
    data: z.infer<typeof residentRequestSchema>,
  ) {
    isLoading.value = true
    await createResidentRequestMock(data)
    isLoading.value = false
  }
  return {
    isLoading,
    sendResidentRequest,
  }
}
