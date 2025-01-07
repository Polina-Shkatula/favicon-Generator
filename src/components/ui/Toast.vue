<script setup>
const props = defineProps({
  message: String,
  visible: Boolean,
})

const emit = defineEmits(['confirm', 'cancel'])

const confirm = () => emit('confirm')
const cancel = () => emit('cancel')
</script>

<template>
  <div v-if="visible" class="fixed bottom-6 right-6 z-50 rounded-lg bg-white p-4 shadow-lg">
    <p class="text-gray-800">{{ message }}</p>
    <div class="mt-2 flex justify-end space-x-2">
      <button @click="confirm" class="rounded-md bg-blue-500 px-3 py-1 text-white">Yes</button>
      <button @click="cancel" class="rounded-md bg-gray-300 px-3 py-1 text-gray-800">No</button>
    </div>
  </div>
</template>
