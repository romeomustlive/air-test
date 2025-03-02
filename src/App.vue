<script setup lang="ts">
import { ModalsContainer, useModal } from 'vue-final-modal'

import ResidentRequestFormModal from '@/components/ResidentRequestFormModal.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const { open, close } = useModal({
  component: ResidentRequestFormModal,
  attrs: {
    onClose: () => {
      close()
    },
  },
})
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <ModalsContainer />
    <BaseButton @click="() => open()">Заполнить заявку</BaseButton>
  </div>
</template>

<style scoped></style>
