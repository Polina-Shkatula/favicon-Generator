// Unused component
<script setup>
import { ref, watch, onMounted } from 'vue'
import { useProjectStore } from '../../stores/projectStore'
import BaseButton from '../common/BaseButton.vue'

const projectStore = useProjectStore()
const generatedHTML = ref('')

// Base64 to Blob conversions
const base64ToBlob = (base64, mimeType) => {
  const byteCharacters = atob(base64)
  const byteArrays = []

  for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
    const slice = byteCharacters.slice(offset, offset + 1024)
    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }

  return new Blob(byteArrays, { type: mimeType })
}

// HTML code generation
const generateHTML = () => {
  let html = ''
  projectStore.projects.forEach((project) => {
    const domain = project.domain

    project.settings.forEach((format) => {
      let imageUrl
      if (format.image.startsWith('data:image')) {
        const base64Data = format.image.split(',')[1]
        const blob = base64ToBlob(base64Data, 'image/png')
        imageUrl = URL.createObjectURL(blob)
      } else {
        imageUrl = domain + format.image
      }
      html += `<link rel="icon" sizes="${format.size}" href="${imageUrl}">\n`
    })
  })
  generatedHTML.value = html
}

const copyToClipboard = () => {
  const textArea = document.createElement('textarea')
  textArea.value = generatedHTML.value
  document.body.appendChild(textArea)
  textArea.select()
  document.execCommand('copy')
  document.body.removeChild(textArea)
}

watch(projectStore.projects, generateHTML, { deep: true })

onMounted(() => generateHTML())
</script>

<template>
  <div class="p-4">
    <h1 class="mb-6 text-3xl font-bold">Favicons Generator</h1>

    <div class="mt-6">
      <h2 class="mb-4 text-xl font-semibold">HTML-code to insert into the project</h2>
      <pre>{{ generatedHTML }}</pre>
      <BaseButton @click="copyToClipboard">Copy</BaseButton>
    </div>
  </div>
</template>

<style scoped>
pre {
  width: 200px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 10px;
  background-color: #f4f4f4;
  color: #333;
  border-radius: 5px;
  border: 1px solid #ddd;
  overflow-x: auto;
}
</style>
