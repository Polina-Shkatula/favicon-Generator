<script setup>
defineProps({
  bgColor: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update:bgColor'])

const updateBgColor = (newBgColor) => {
  emit('update:bgColor', newBgColor)
}
</script>

<template>
  <div class="my-4 max-w-full">
    <label class="text-md flex items-center gap-2">
      Background Color:
      <input
        type="color"
        :value="bgColor"
        @input="updateBgColor($event.target.value)"
        class="h-8 w-14"
      />
    </label>
  </div>
</template>

<style scoped></style>
