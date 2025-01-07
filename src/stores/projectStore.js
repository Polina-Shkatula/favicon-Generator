import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { saveToLocalStorage, loadFromLocalStorage } from './localStorage'

export const useProjectStore = defineStore('projectStore', () => {
  const image = ref(null)
  const radius = ref(0)
  const bgColor = ref('')
  const projectTitle = ref('')
  const domain = ref('')
  const description = ref('')
  const projects = reactive(loadFromLocalStorage('projects') || [])

  // for domain, projectTitle and description
  const setValue = (key, value) => {
    if (key in state) {
      state[key].value = value
    } else {
      console.error(`Key "${key}" not found in the store.`)
    }
  }

  // upload for ImageUpload Component
  const setFile = (file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const base64Image = e.target.result
      image.value = base64Image
    }
    reader.readAsDataURL(file) // Convert to base64
  }

  // replace current projects with imported ones
  const setProjects = (newProjects) => {
    if (Array.isArray(newProjects)) {
      projects.splice(0, projects.length, ...newProjects)
      saveProjects()
    } else {
      console.error('The imported file does not contain valid project data.')
    }
  }

  const addProject = (project) => {
    projects.push({
      id: Date.now(),
      title: project.projectTitle || 'Untitled Project',
      description: project.description || 'Description of the project',
      domain: project.domain || 'www.example.com',
      settings: project.settings || [],
      zipLink: project.zipLink || '',
    })
    saveProjects()
  }

  const removeProject = (id) => {
    const index = projects.findIndex((project) => project.id === id)
    if (index !== -1) {
      projects.splice(index, 1)
      saveProjects()
    }
  }

  // save imported data to LocalStorage
  const saveProjects = () => saveToLocalStorage('projects', projects)

  // return state and actions
  const state = {
    image,
    radius,
    bgColor,
    projectTitle,
    domain,
    description,
    projects,
  }
  const actions = {
    setValue,
    setFile,
    setProjects,
    addProject,
    removeProject,
    saveProjects,
  }

  return { ...state, ...actions }
})
