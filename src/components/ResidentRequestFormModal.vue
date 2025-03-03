<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { computed, ref } from 'vue'
import { z } from 'zod'

import AddressInput from '@/components/ui/AddressInput.vue'
import BaseAlert from '@/components/ui/BaseAlert.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseDateRange from '@/components/ui/BaseDateRange.vue'
import BaseForm from '@/components/ui/BaseForm.vue'
import BaseInputMask from '@/components/ui/BaseInputMask.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import BaseNumberRange from '@/components/ui/BaseNumberRange.vue'
import BaseSelect from '@/components/ui/BaseSelect.vue'
import OrganizationInput from '@/components/ui/OrganizationInput.vue'

import { residentRequestSchema } from '@/composables/use-resident-request'
import { useResidentRequest } from '@/composables/use-resident-request'

import type { OrganizationSuggestion } from '@/api/dadata'

const emit = defineEmits<{
  (e: 'close'): void
}>()

const types = ref([
  'Складские помещения',
  'Производственные помещения',
  'Офисные помещения',
  'Торговые помещения',
  'Другие',
])

const { isLoading, sendResidentRequest, error } = useResidentRequest()

const { errors, defineField, handleSubmit, setFieldValue } = useForm<
  z.infer<typeof residentRequestSchema>
>({
  initialValues: {
    organizationName: '',
    phone: '',
    type: types.value[0],
    address: '',
    areaRange: {
      min: 0,
      max: 0,
    },
    dateRange: {
      min: null,
      max: null,
    },
  },
  validationSchema: toTypedSchema(residentRequestSchema),
})

const [organizationName] = defineField('organizationName')
const [phone] = defineField('phone')
const [type] = defineField('type')
const [address] = defineField('address')
const [areaRange] = defineField('areaRange')
const [dateRange] = defineField('dateRange')

const isDisabled = computed(() => {
  return !!Object.keys(errors.value).length
})

function updateOrganizationName(value: OrganizationSuggestion) {
  setFieldValue('organizationName', value.value)
  setFieldValue('address', value.data.address.value)
}

const onSubmit = handleSubmit(async (values) => {
  await sendResidentRequest(values)
  if (error.value) return
  emit('close')
})
</script>

<template>
  <BaseModal title="Заполните заявку, чтобы стать резидентом">
    <BaseAlert v-if="error" :message="error" class="mb-5" />
    <BaseForm>
      <OrganizationInput
        :model-value="organizationName"
        name="organizationName"
        :error="errors.organizationName"
        @update:model-value="updateOrganizationName"
      />
      <BaseInputMask
        v-model="phone"
        name="phone"
        label="Контактный телефон"
        mask="+7 (###) ###-##-##"
        :error="errors.phone"
      />
      <BaseSelect
        v-model="type"
        name="type"
        label="Тип помещения"
        :items="types"
        :error="errors.type"
      />
      <AddressInput
        v-model="address"
        name="address"
        label="Адрес"
        :error="errors.address"
      />
      <BaseNumberRange
        v-model="areaRange"
        name="areaRange"
        label="Площадь помещения"
        min-label="От"
        max-label="До"
        :min="0"
        :max="1000"
        :error="errors.areaRange"
      />
      <BaseDateRange
        v-model="dateRange"
        name="dateRange"
        label="Срок действия договора"
        min-label="От"
        max-label="До"
        :error="errors.dateRange"
      />
      <BaseButton
        rounded
        :disabled="isDisabled || isLoading"
        class="mt-5"
        @click="onSubmit"
      >
        Отправить
      </BaseButton>
    </BaseForm>
  </BaseModal>
</template>
