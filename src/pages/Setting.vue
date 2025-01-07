<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useProjectStore } from '@/stores/projectStore'
import { useImageProcessing } from '@/composables/useImageProcessing'
import { generateZip } from '@/composables/useZip'
import { truncateText } from '@/composables/utils'
import { ROUTES_PATH } from '@/constants/router'
import FormatSetting from '@/components/formats/FormatSetting.vue'
import EnvSwitcher from '@/components/ui/EnvSwitcher.vue'
import BackButton from '@/components/common/BackButton.vue'
import BaseButton from '@/components/common/BaseButton.vue'

const route = useRoute()
const projectStore = useProjectStore()
const { generateFavicon } = useImageProcessing()

const projectIndex = computed(() => route.params.projectIndex)
const project = computed(() => projectStore.projects[projectIndex.value])

const emit = defineEmits(['updateSett'])

const updateRadius = (settingIndex, newRadius) => {
  projectStore.projects[projectIndex.value].settings[settingIndex].radius = newRadius
  projectStore.saveProjects()
}
const updateBgColor = (settingIndex, newBgColor) => {
  projectStore.projects[projectIndex.value].settings[settingIndex].bgColor = newBgColor
  projectStore.saveProjects()
}
const updateImage = (settingIndex, newImage) => {
  projectStore.projects[projectIndex.value].settings[settingIndex].image = newImage
  projectStore.saveProjects()
}

const updateProject = () => projectStore.saveProjects()

const procImages = async () => {
  try {
    const currentProject = projectStore.projects[projectIndex.value]
    const favicons = await generateFavicon(currentProject.settings)
    await generateZip(favicons)
    updateProject()
  } catch (error) {
    console.error('Error while processing images:', error)
  }
}
</script>

<template>
  <div class="min-h-screen space-y-12 px-4 md:px-8 lg:px-16">
    <header class="flex items-center justify-between space-y-4 py-4 md:space-y-0">
      <div class="flex items-center gap-4">
        <BackButton :fallbackRoute="ROUTES_PATH.PROJECTS" />
        <h1 class="text-2xl font-semibold md:text-3xl">{{ truncateText(project.title, 30) }}</h1>
      </div>
      <EnvSwitcher />
    </header>

    <div class="grid gap-10 md:grid-cols-2 md:gap-12 lg:gap-x-20 2xl:grid-cols-3">
      <FormatSetting
        v-for="(item, index) in project.settings"
        :key="index"
        :title="item.title"
        :radius="item.radius"
        :bgColor="item.bgColor"
        :image="item.image"
        :size="item.size"
        :safezone="item.safeZone"
        :safezoneRatio="item.safeZoneRatio"
        @update:radius="(newRadius) => updateRadius(index, newRadius)"
        @update:bgColor="(newBgColor) => updateBgColor(index, newBgColor)"
        @update:image="(newImage) => updateImage(index, newImage)"
      />
    </div>
    <div>
      <BaseButton class="mb-4" @click="procImages">Download ZIP</BaseButton>
    </div>
  </div>
</template>

<style scoped></style>
