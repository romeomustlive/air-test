import { ref } from 'vue'
import { z } from 'zod'

import { createResidentRequestMock } from '@/api/mocks'

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
  const error = ref<string | null>(null)

  async function sendResidentRequest(
    data: z.infer<typeof residentRequestSchema>,
  ) {
    try {
      isLoading.value = true
      await createResidentRequestMock(data)
      isLoading.value = false
    } catch (e) {
      if (e instanceof Error) {
        error.value = 'Произошла ошибка при отправке запроса:' + e.message
        return
      }
      error.value = 'Произошла ошибка при отправке запроса'
    } finally {
      isLoading.value = false
    }
  }
  return {
    error,
    isLoading,
    sendResidentRequest,
  }
}
