<script setup>
import { ref, computed } from 'vue'
import { useProjectStore } from '@/stores/projectStore'
import { exportProjectsToJSON, importProjectsFromJSON } from '@/stores/jsonUtils'
import { ROUTES_PATH } from '@/constants/router'
import ProjectItem from '@/components/project/ProjectItem.vue'
import BackButton from '@/components/common/BackButton.vue'
import BaseButton from '@/components/common/BaseButton.vue'

const projectStore = useProjectStore()
const searchQuery = ref('')
const fileInput = ref(null)

const removeProject = (projectId) => {
  projectStore.removeProject(projectId)
}

const filteredProjects = computed(() => {
  if (!searchQuery.value) {
    return projectStore.projects
  }
  return projectStore.projects.filter((project) =>
    project.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

const triggerFileInput = () => fileInput.value.click()

const exportProjects = () => {
  exportProjectsToJSON()
}

const importProjects = () => {
  const file = fileInput.value.files[0]
  if (file) {
    importProjectsFromJSON(file)
  }
}
</script>

<template>
  <div class="min-h-screen space-y-8 px-4 md:px-8 lg:px-16">
    <header
      class="flex flex-col items-start justify-between space-y-4 py-4 md:flex-row md:items-center md:space-y-0"
    >
      <div class="flex items-center gap-4">
        <BackButton :fallbackRoute="ROUTES_PATH.HOME" />
        <h1 class="text-2xl font-semibold md:text-3xl">Project list</h1>
      </div>
      <div class="flex items-center justify-end gap-4">
        <input type="file" accept=".json" ref="fileInput" @change="importProjects" hidden />
        <BaseButton @click="triggerFileInput" class="text-sm font-medium">
          Import from JSON
        </BaseButton>
        <BaseButton class="text-sm font-medium" @click="exportProjects">Export to JSON</BaseButton>
      </div>
    </header>

    <div class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search by project name..."
        class="w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
      />
    </div>

    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <ProjectItem
        v-for="(project, projectIndex) in filteredProjects"
        :key="project.id"
        :project="project"
        :projectIndex="projectIndex"
        :projectId="project.id"
        @removeProject="removeProject"
      />
    </div>
  </div>
</template>

<style scoped></style>
