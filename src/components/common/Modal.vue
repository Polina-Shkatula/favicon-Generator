<script setup>
import { useProjectStore } from '@/stores/projectStore'
import { useImageProcessing } from '@/composables/useImageProcessing'
import { generateSingleFormatZip } from '@/composables/useZip'
import FormatSetting from '@/components/formats/FormatSetting.vue'
import BaseButton from './BaseButton.vue'

const props = defineProps({
  project: Object,
  setting: Object,
  projectIndex: Number,
  formatIndex: Number,
})

const projectStore = useProjectStore()
const { generateFavicon } = useImageProcessing()

const emit = defineEmits(['closeModal', 'downloadFormat', 'updateSetting'])

const closeModal = () => emit('closeModal')

// updating settings: radius, bg, image
const updateSetting = (key, value) => {
  emit('updateSetting', {
    projectIndex: props.projectIndex,
    formatIndex: props.formatIndex,
    key,
    value,
  })
}

// saving changes to local storage only for the selected format
const saveChanges = () => {
  const updatedSetting = projectStore.projects[props.projectIndex].settings[props.formatIndex]
  projectStore.projects[props.projectIndex].settings[props.formatIndex] = updatedSetting
  projectStore.saveProjects()
  emit('closeModal')
}

const downloadFormat = async () => {
  try {
    const currentProject = projectStore.projects[props.projectIndex]
    const favicons = await generateFavicon(currentProject.settings)
    await generateSingleFormatZip(favicons, currentProject.projectTitle, props.formatIndex)
    saveChanges()
  } catch (error) {
    console.error('Error while processing images:', error)
  }
}
</script>

<template>
  <div
    v-if="setting"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
  >
    <div class="w-full max-w-2xl space-y-6 rounded-lg bg-white p-6 shadow-lg">
      <div class="flex items-center justify-between border-b pb-2">
        <h3 class="text-lg font-semibold md:text-xl">Edit Setting</h3>
        <BaseButton @click="closeModal" class="text-sm">Cancel</BaseButton>
      </div>

      <FormatSetting
        :setting="setting"
        :title="setting.title"
        :radius="setting.radius"
        :bgColor="setting.bgColor"
        :image="setting.image"
        :size="setting.size"
        :safezone="setting.safeZone"
        :safezoneRatio="setting.safeZoneRatio"
        @update:radius="(newRadius) => updateSetting('radius', newRadius)"
        @update:bgColor="(newBgColor) => updateSetting('bgColor', newBgColor)"
        @update:image="(newImage) => updateSetting('image', newImage)"
      />
      <div class="flex justify-end gap-4">
        <BaseButton @click="saveChanges" class="px-8 text-base">Save</BaseButton>
        <BaseButton @click="downloadFormat" class="text-base">Download</BaseButton>
      </div>
    </div>
  </div>
</template>
