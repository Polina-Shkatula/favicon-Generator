<script setup>
import { ref } from 'vue'
import ImagePreview from './ImagePreview.vue'
import CornerRadius from './CornerRadius.vue'
import BackgroundSelect from './BackgroundSelect.vue'
import BaseButton from '../common/BaseButton.vue'
import { truncateText } from '@/composables/utils'

defineProps({
  radius: Number,
  bgColor: String,
  image: String,
  title: String,
  size: String,
  safezone: Boolean,
  safezoneRatio: Number,
})

const fileInput = ref(null)

// set events for sending changes to Editor
const emit = defineEmits(['update:radius', 'update:bgColor', 'update:image'])

const updateRadius = (newRadius) => emit('update:radius', newRadius)
const updateBgColor = (newBgColor) => emit('update:bgColor', newBgColor)
const updateImage = (newImage) => emit('update:image', newImage)

const setFile = () => {
  fileInput.value.click()
}

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      const base64Image = e.target.result
      emit('update:image', base64Image)
    }
    reader.readAsDataURL(file)
  }
}
</script>

<template>
  <div class="relative rounded-lg bg-white p-4 shadow-md">
    <h2 class="mb-4 text-lg font-semibold md:text-xl">{{ truncateText(title, 30) }}</h2>
    <div class="grid gap-4 md:grid-cols-2">
      <div class="flex flex-col">
        <CornerRadius :radius="radius" @update:radius="updateRadius" />
        <BackgroundSelect :bgColor="bgColor" @update:bgColor="updateBgColor" />
        <BaseButton @click="setFile">Change Image</BaseButton>
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          class="hidden"
          @change="handleFileChange"
        />
      </div>
      <div
        class="flex items-center justify-center border-l-0 border-gray-100 md:border-l-2 md:px-8 lg:px-12"
      >
        <ImagePreview
          :image="image"
          :radius="radius"
          :bgColor="bgColor"
          :safezone="safezone"
          :size="size"
          :safezoneRatio="safezoneRatio"
          @update:image="updateImage"
        />
      </div>
    </div>
  </div>
</template>
