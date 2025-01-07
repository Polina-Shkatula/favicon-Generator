<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { ROUTES_PATH } from '@/constants/router'
import { useProjectStore } from '@/stores/projectStore'
import { useFaviconSettings } from '@/composables/useFaviconSettings'
import { useImageProcessing } from '@/composables/useImageProcessing'
import { generateZip } from '@/composables/useZip'
import { truncateText, setupScrollListener } from '@/composables/utils'
import { isImage } from '@/validation/validationRules'
import FormatSetting from '@/components/formats/FormatSetting.vue'
import EnvSwitcher from '@/components/ui/EnvSwitcher.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import Toast from '@/components/ui/Toast.vue'

const router = useRouter()
const projectStore = useProjectStore()

const { settings } = useFaviconSettings(projectStore.image)
const { generateFavicon } = useImageProcessing()

const projectTitle = computed(() => projectStore.projectTitle)
const domain = computed(() => projectStore.domain)
const description = computed(() => projectStore.description)

const formatErrors = ref([])
const buttonId = 'expand-button'
let removeScrollListener

const showToast = ref(false)
const toastMessage = ref('Do you want to save your Project?')

const updateRadius = (index, newRadius) => {
  settings[index].radius = newRadius
}
const updateBgColor = (index, newBgColor) => {
  settings[index].bgColor = newBgColor
}
const updateImage = (index, newImage) => {
  settings[index].image = newImage
}

const handleFormatError = (index, message) => {
  formatErrors.value[index] = message
}

const hasValidationErrors = computed(() => {
  return formatErrors.value.some((error) => error)
})

const validateImages = () => {
  let isValid = true

  settings.forEach((setting, index) => {
    const validation = isImage(setting.image)
    if (!validation.valid) {
      handleFormatError(index, validation.error)
      isValid = false
    } else {
      handleFormatError(index, '')
    }
  })
  return isValid
}

const processImages = async () => {
  if (!validateImages()) {
    console.error('Fix validation errors before proceeding.')
    return
  }
  try {
    const favicons = await generateFavicon(settings)
    await generateZip(favicons)
    projectStore.addProject({
      projectTitle: projectTitle.value,
      description: description.value,
      domain: domain.value,
      settings,
      zipLink: 'link-to-zip',
    })
  } catch (error) {
    console.error('Error:', error)
  }

  setTimeout(() => {
    navigateToProjects()
  }, 5000)
}

onMounted(() => {
  removeScrollListener = setupScrollListener(buttonId, 100)
})

onUnmounted(() => {
  if (removeScrollListener) {
    removeScrollListener()
  }
})

const handleToastConfirm = async () => {
  showToast.value = false
  await processImages()
}

const handleToastCancel = () => {
  showToast.value = false
  navigateToProjects()
}

const navigateToProjects = () => {
  router.push(ROUTES_PATH.PROJECTS)
}
</script>

<template>
  <div class="min-h-screen space-y-12 px-4 md:px-8 lg:px-16">
    <header class="flex items-center justify-between py-4">
      <h1 class="text-2xl font-semibold md:text-3xl">
        Project: {{ truncateText(projectTitle, 30) }}
      </h1>
      <EnvSwitcher />
    </header>

    <div class="grid gap-10 md:grid-cols-2 md:gap-12 lg:gap-x-20 2xl:grid-cols-3">
      <FormatSetting
        v-for="(item, index) in settings"
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

    <div class="flex items-center justify-between space-y-4 md:space-y-0">
      <div class="">
        <div v-if="hasValidationErrors" class="text-sm text-red-500">Image is required!</div>
        <BaseButton @click="processImages" class="mb-4">Download ZIP</BaseButton>
      </div>
      <div class="fixed bottom-2 right-6 z-50">
        <button
          class="fixed-button group relative inline-flex h-12 w-12 transform animate-bounce items-center justify-center overflow-hidden rounded-lg bg-blue-400 shadow-lg transition-all duration-300 ease-in-out hover:w-48 hover:bg-blue-300"
          id="expand-button"
          @click="showToast = true"
        >
          <span
            class="icon text-2xl text-white transition-transform duration-300 ease-in-out group-hover:opacity-0"
          >
            ...
          </span>

          <span
            class="text group-hover:opacity-300 absolute text-white opacity-0 transition-opacity duration-300 ease-in-out"
            >Go to Projcet List</span
          >
        </button>
      </div>
    </div>
    <Toast
      :visible="showToast"
      :message="toastMessage"
      @confirm="handleToastConfirm"
      @cancel="handleToastCancel"
    />
  </div>
</template>

<style scoped>
#expand-button {
  @apply transition-all duration-300 ease-in-out;
}
#expand-button.open {
  @apply h-10 w-32 bg-blue-200 md:w-36;
}
#expand-button:hover {
  @apply bg-blue-500;
}
#expand-button span {
  @apply transition duration-300 ease-linear;
}
#expand-button .icon {
  @apply transition-transform duration-300 ease-in-out;
  @apply transition-opacity duration-300;
}
#expand-button .text {
  @apply opacity-0 transition-opacity duration-300 ease-in-out;
}
#expand-button.open .icon {
  @apply opacity-0;
}
#expand-button.open .text,
#expand-button:hover .text {
  @apply visible text-base opacity-100 transition-opacity;
}
</style>
