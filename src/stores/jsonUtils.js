import { useProjectStore } from './projectStore'

export const exportProjectsToJSON = () => {
  const projectStore = useProjectStore()

  const data = projectStore.projects
  const jsonData = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonData], { type: 'application/json' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'projects.json'
  link.click()
}

export const importProjectsFromJSON = (file) => {
  const projectStore = useProjectStore()

  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    try {
      const importedData = JSON.parse(reader.result)
      projectStore.setProjects(importedData)
    } catch (error) {
      console.error('Error importing data:', error)
    }
  }
  reader.readAsText(file)
}
