<script setup>
import { ref, computed } from 'vue'
import { useProjectStore } from '@/stores/projectStore'
import { useEnvironmentStore } from '@/stores/environment'
import ImagePreview from '@/components/formats/ImagePreview.vue'
import Modal from '@/components/common/Modal.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import { truncateText } from '@/composables/utils'

const props = defineProps({
  project: Object,
  projectIndex: Number,
  projectId: {
    type: Number,
    required: true,
  },
})

const projectStore = useProjectStore()
const environmentStore = useEnvironmentStore()
const selectedFormatIndex = ref(null)
const isDev = computed(() => environmentStore.environment === 'dev')

const openModal = (formatIndex) => (selectedFormatIndex.value = formatIndex)
const closeModal = () => (selectedFormatIndex.value = null)

// saving changes from modal
const updateSetting = ({ projectIndex, formatIndex, key, value }) => {
  const project = projectStore.projects[projectIndex]
  const setting = project.settings[formatIndex]
  if (setting) {
    setting[key] = value
  }
}

const emit = defineEmits(['removeProject'])

const removeProject = () => emit('removeProject', props.projectId)
</script>

<template>
  <div class="max-w-full space-y-4 rounded-lg bg-white p-4 shadow-lg">
    <h2 class="text-lg font-semibold">{{ truncateText(project.title, 30) }}</h2>
    <!-- Thumbnail container with favicons -->
    <div class="grid grid-cols-3 justify-items-center gap-2 rounded-md border p-2">
      <ImagePreview
        v-for="(setting, formatIndex) in props.project.settings"
        :key="formatIndex"
        :image="setting.image"
        :radius="setting.radius"
        :bgColor="setting.bgColor"
        :safezone="setting.safezone"
        :size="setting.size"
        :safezoneRatio="setting.safezoneRatio"
        class="item-image"
        @click="openModal(formatIndex)"
      />
    </div>

    <Modal
      v-if="selectedFormatIndex !== null"
      :project="props.project"
      :setting="props.project.settings[selectedFormatIndex]"
      :projectIndex="props.projectIndex"
      :formatIndex="selectedFormatIndex"
      @closeModal="closeModal"
      @updateSetting="updateSetting"
    />

    <div class="flex items-center justify-between space-x-2">
      <RouterLink
        :to="`/setting/${projectIndex}`"
        :class="[
          'rounded-md p-2 text-center text-sm text-white',
          isDev ? 'bg-blue-200 hover:bg-blue-400' : 'bg-yellow-500 hover:bg-yellow-700',
        ]"
      >
        Show all formats
      </RouterLink>

      <BaseButton class="p-2 text-center text-sm" @click="removeProject">Delete Project</BaseButton>
    </div>
  </div>
</template>

<style scoped>
.group:hover .group-hover\:opacity-100 {
  opacity: 1 !important;
}

.item-image {
  @apply aspect-square w-14 hover:border hover:border-gray-400 hover:shadow-lg hover:shadow-gray-300;
}
</style>
