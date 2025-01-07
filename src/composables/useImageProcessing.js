export function useImageProcessing() {
  // basic formats
  const drawCanvas = (format) => {
    return new Promise((resolve, reject) => {
      const { radius, bgColor, size, image, safeZone, safeZoneRatio = 1 } = format
      const [width, height] = size.split('x').map(Number)

      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()

      img.onload = () => {
        canvas.width = width
        canvas.height = height

        // corners radius
        if (radius > 0) {
          const adjustedRadius = ((radius / 100) * Math.min(width, height)) / 2
          ctx.save()
          ctx.beginPath()
          ctx.moveTo(adjustedRadius, 0)
          ctx.arcTo(width, 0, width, height, adjustedRadius)
          ctx.arcTo(width, height, 0, height, adjustedRadius)
          ctx.arcTo(0, height, 0, 0, adjustedRadius)
          ctx.arcTo(0, 0, width, 0, adjustedRadius)
          ctx.closePath()
          ctx.fillStyle = bgColor
          ctx.fill()
          ctx.clip()
        } else {
          ctx.fillStyle = bgColor
          ctx.fillRect(0, 0, width, height)
        }

        // set safezone
        const safeWidth = safeZone ? width * safeZoneRatio : width
        const safeHeight = safeZone ? height * safeZoneRatio : height
        const xOffset = (width - safeWidth) / 2
        const yOffset = (height - safeHeight) / 2

        ctx.drawImage(img, xOffset, yOffset, safeWidth, safeHeight)

        canvas.toBlob((blob) => {
          resolve(blob)
        }, 'image/png')
      }
      img.onerror = reject
      img.src = image
    })
  }

  // ICO format
  const convertToICO = (format) => {
    return new Promise((resolve, reject) => {
      const { radius, bgColor, size, image, safeZone, safeZoneRatio = 1 } = format
      const [width, height] = size.split('x').map(Number)

      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()

      img.onload = () => {
        canvas.width = width
        canvas.height = height

        if (radius > 0) {
          const adjustedRadius = ((radius / 100) * Math.min(width, height)) / 2
          ctx.save()
          ctx.beginPath()
          ctx.moveTo(adjustedRadius, 0)
          ctx.arcTo(width, 0, width, height, adjustedRadius)
          ctx.arcTo(width, height, 0, height, adjustedRadius)
          ctx.arcTo(0, height, 0, 0, adjustedRadius)
          ctx.arcTo(0, 0, width, 0, adjustedRadius)
          ctx.closePath()
          ctx.fillStyle = bgColor
          ctx.fill()
          ctx.clip() // trim everything outside the rounded corners
        } else {
          ctx.fillStyle = bgColor
          ctx.fillRect(0, 0, width, height)
        }

        const safeWidth = safeZone ? width * safeZoneRatio : width
        const safeHeight = safeZone ? height * safeZoneRatio : height
        const xOffset = (width - safeWidth) / 2
        const yOffset = (height - safeHeight) / 2

        ctx.drawImage(img, xOffset, yOffset, safeWidth, safeHeight)

        canvas.toBlob((blob) => {
          const icoBlob = new Blob([blob], { type: 'image/vnd.microsoft.icon' })
          resolve({ fileName: 'favicon.ico', blob: icoBlob })
        }, 'image/vnd.microsoft.icon')
      }

      img.onerror = reject
      img.src = image
    })
  }

  // svg format
  const generateSvgIcon = (format) => {
    const { radius, bgColor, size, image } = format
    const [width, height] = [32, 32]
    const adjustedRadius = ((radius / 100) * Math.min(width, height)) / 2
    const clipId = 'clip-path-1'

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
      <!-- Определение clipPath для обрезки -->
      <defs>
        <clipPath id="${clipId}">
          <rect width="${width}" height="${height}" rx="${adjustedRadius}" ry="${adjustedRadius}" />
        </clipPath>
      </defs>

      <!-- background with radius -->
        <rect width="${width}" height="${height}" fill="${bgColor}" rx="${adjustedRadius}" ry="${adjustedRadius}" />
        
        ${
          image
            ? `<image href="${image}" x="0" y="0" width="${width}" height="${height}" preserveAspectRatio="xMidYMid meet" clip-path="url(#${clipId})" />`
            : ''
        }
      </svg>
    `
    const svgBlob = new Blob([svg], { type: 'image/svg+xml' })

    return { fileName: 'favicon.svg', blob: svgBlob }
  }

  // function to generate all formats
  const generateFavicon = async (formats) => {
    try {
      const favicons = {}
      for (let format of formats) {
        const { size } = format

        if (size === '32x32') {
          const { fileName, blob } = await convertToICO(format)
          favicons[fileName] = blob
        } else if (size === 'SVG') {
          const svgBlob = generateSvgIcon(format)
          favicons[svgBlob.fileName] = svgBlob.blob
        } else {
          const canvasBlob = await drawCanvas(format)
          favicons[`${size}.png`] = canvasBlob
        }
      }
      return favicons
    } catch (error) {
      console.error('Error while processing image:', error)
      throw error
    }
  }

  return {
    generateFavicon,
  }
}
