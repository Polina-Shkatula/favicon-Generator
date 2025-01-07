//Component for uploading image. Supports drag-n-drop or standard upload via button.
<script setup>
import { ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useProjectStore } from '@/stores/projectStore'
import { ROUTES_PATH } from '@/constants/router'
import { validateImage, validateTitle } from '@/validation/validationRules'
import BaseButton from '@/components/common/BaseButton.vue'

const router = useRouter()
const projectStore = useProjectStore()

const isDragging = ref(false)
const fileInput = ref(null)
const errorMessage = ref('')
const titleErrorMessage = ref('')
const projectTitle = ref('')
const domain = ref('')
const description = ref('')
const showDescription = ref(false)

const handleDragOver = () => (isDragging.value = true)

const handleDragLeave = () => (isDragging.value = false)

// prevent open file in new tab
const handleDrop = (event) => {
  isDragging.value = false
  const file = event.dataTransfer.files[0]
  validateFile(file)
}

const triggerFileInput = () => fileInput.value.click()
const handleFileChange = () => {
  const file = fileInput.value.files[0]
  validateFile(file)
}

const validateFile = (file) => {
  const validation = validateImage(file)
  if (!validation.valid) {
    errorMessage.value = validation.message
    return
  }
  projectStore.setFile(file)
  errorMessage.value = ''
}

const validateAndProceed = () => {
  const titleValidation = validateTitle(projectTitle.value)
  if (!titleValidation.valid) {
    titleErrorMessage.value = titleValidation.message
    return
  }
  goToNextPage()
}

const goToNextPage = () => {
  projectStore.setValue('projectTitle', projectTitle.value)
  projectStore.setValue('domain', domain.value)
  projectStore.setValue('description', description.value)

  router.push(ROUTES_PATH.EDITOR)
  nextTick(() => {
    console.log(
      'Project title and domain updated:',
      projectStore.projectTitle,
      projectStore.domain,
      projectStore.description,
    )
  })
}

const toggleDescription = () => (showDescription.value = !showDescription.value)
</script>

<template>
  <div
    class="m-auto w-full max-w-3xl rounded-xl bg-white p-4 md:p-6 lg:p-8"
    @dragover.prevent="handleDragOver"
  >
    <div
      @dragleave="handleDragLeave"
      @drop.prevent="handleDrop"
      :class="{ 'drag-over': isDragging }"
      class="flex flex-col items-center rounded-md border-2 border-dotted p-8"
    >
      <p v-if="errorMessage" class="py-2 text-sm text-red-500">{{ errorMessage }}</p>
      <p v-if="!projectStore.image" class="mb-4 text-center text-sm font-medium md:text-lg">
        Drag & Drop the image file
      </p>
      <p v-if="!projectStore.image" class="mb-4 text-center text-sm font-medium md:text-lg">or</p>

      <input type="file" accept="image/*" ref="fileInput" @change="handleFileChange" hidden />
      <BaseButton
        @click="triggerFileInput"
        class="flex items-center gap-2 px-6 py-2.5 text-base font-medium md:text-lg"
      >
        Upload manually
        <span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 1V6M6 11V6M6 6H1M6 6H11"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </BaseButton>

      <div v-if="projectStore.image && !errorMessage" class="my-4 w-full">
        <div class="flex flex-col justify-between gap-4 md:flex-row">
          <input
            type="text"
            v-model="projectTitle"
            placeholder="Enter Project Title*"
            class="w-full rounded-md border p-2"
          />
          <input
            type="text"
            v-model="domain"
            placeholder="Enter Domain"
            class="w-full rounded-md border p-2"
          />
        </div>
        <p v-if="titleErrorMessage" class="text-sm text-red-500">{{ titleErrorMessage }}</p>

        <BaseButton
          v-if="projectStore.image && !errorMessage && !showDescription"
          @click="toggleDescription"
          class="btn-circle"
        >
          <span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 1V6M6 11V6M6 6H1M6 6H11"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </BaseButton>
        <div v-if="showDescription" class="mt-4">
          <input
            type="text"
            v-model="description"
            placeholder="Enter Description"
            class="w-full rounded-md border p-2"
          />
        </div>
      </div>

      <div v-if="projectStore.image && !errorMessage" class="inline-block overflow-hidden">
        <img
          :src="projectStore.image"
          class="max-h-40 max-w-80 rounded border-2 border-solid p-2 md:max-h-64"
        />
      </div>
    </div>

    <BaseButton
      v-if="projectStore.image && !errorMessage"
      @click="validateAndProceed"
      class="mt-4 text-center"
      >Continue</BaseButton
    >
  </div>
</template>

<style scoped>
.drag-over {
  @apply border-blue-200 bg-blue-50;
}

.btn-circle {
  @apply my-2 rounded-full p-4;
}
</style>
