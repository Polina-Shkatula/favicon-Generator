<script setup>
defineProps({
  radius: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['update:radius'])

const updateRadius = (newRadius) => {
  emit('update:radius', Number(newRadius))
}
</script>

<template>
  <div class="max-w-full">
    <label class="text-md block">
      <span>Corners: {{ radius }}%</span>
      <input
        type="range"
        min="0"
        max="100"
        class="mt-2 w-full md:w-4/5"
        :value="radius"
        @input="updateRadius($event.target.value)"
      />
    </label>
  </div>
</template>

<style scoped></style>
