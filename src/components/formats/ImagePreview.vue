<script setup>
const props = defineProps({
  image: String,
  radius: Number,
  bgColor: String,
  safezone: Boolean,
  size: String,
  safezoneRatio: Number,
})

const emit = defineEmits(['update:image'])
</script>

<template>
  <div class="aspect-square w-32 border lg:w-40">
    <img
      :style="{
        borderRadius: radius <= 20 ? `${radius}%` : `${radius / 1.7}%`,
        backgroundColor: `${bgColor}`,
      }"
      :src="image"
      :sizes="size"
      :safezone="safezone"
      :safezoneRatio="safezoneRatio"
      alt="Preview"
      class="h-full w-full object-contain p-2"
    />
  </div>
</template>

<style scoped></style>
