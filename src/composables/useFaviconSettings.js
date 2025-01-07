import { reactive } from 'vue'

export function useFaviconSettings(defaultImage) {
  // local state default settings
  const settings = reactive([
    {
      radius: 15,
      bgColor: '#ffffff',
      title: 'favicon.ico (32x32)',
      size: '32x32',
      safeZone: false,
      image: defaultImage,
    },
    {
      radius: 15,
      bgColor: '#ffffff',
      title: 'Web-PNG Icons (192x192)',
      size: '192x192',
      safeZone: true,
      safeZoneRatio: 4 / 5,
      image: defaultImage,
    },
    {
      radius: 15,
      bgColor: '#ffffff',
      title: 'Web-PNG Icons',
      size: '512x512',
      safeZone: true,
      safeZoneRatio: 4 / 5,
      image: defaultImage,
    },
    {
      radius: 15,
      bgColor: '#ffffff',
      title: 'Apple-Touch PNG-Icon (180x180)',
      size: '180x180',
      safeZone: true,
      safeZoneRatio: 4 / 5,
      image: defaultImage,
    },
    {
      radius: 15,
      bgColor: '#ffffff',
      title: 'Microsoft PNG-Icon (150x150)',
      size: '150x150',
      safeZone: true,
      safeZoneRatio: 4 / 5,
      image: defaultImage,
    },
    {
      radius: 15,
      bgColor: '#ffffff',
      title: 'Safari Pinned Tab (SVG)',
      size: 'SVG',
      safeZone: false,
      image: defaultImage,
    },
  ])

  return { settings }
}
