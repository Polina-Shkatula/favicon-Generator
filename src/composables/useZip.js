import JSZip from 'jszip'

export async function generateZip(favicons, projectTitle = 'myBuddies') {
  try {
    const zip = new JSZip()

    for (const [fileName, blob] of Object.entries(favicons)) {
      zip.file(fileName, blob)
    }

    const content = await zip.generateAsync({ type: 'blob' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(content)
    link.download = `${projectTitle}.zip`
    link.click()
    URL.revokeObjectURL(link.href)
  } catch (error) {
    console.error('Error generating ZIP:', error)
  }
}

export async function generateSingleFormatZip(favicons, projectTitle = 'favicon', formatIndex) {
  try {
    const zip = new JSZip()

    // select one file based on the passed index
    const formatEntries = Object.entries(favicons)
    const selectedFile = formatEntries[formatIndex]

    if (selectedFile) {
      const [fileName, blob] = selectedFile
      zip.file(fileName, blob)

      const content = await zip.generateAsync({ type: 'blob' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(content)
      link.download = `${projectTitle} - ${fileName}.zip`
      link.click()
      URL.revokeObjectURL(link.href)
    }
  } catch (error) {
    console.error('Error generating ZIP:', error)
  }
}
