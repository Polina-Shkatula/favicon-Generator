<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  fallbackRoute: {
    type: String,
    required: false,
  },
})

const router = useRouter()

const goBack = () => {
  router.push(props.fallbackRoute)
}
</script>

<template>
  <button @click="goBack" class="rounded-full bg-blue-200 px-4 py-3 text-white hover:bg-blue-500">
    <i class="fas fa-arrow-left"></i>
  </button>
</template>

<style scoped></style>
