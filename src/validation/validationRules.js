import { IMAGE_TYPES } from '@/constants'

export function isImgFileValid(type) {
  return IMAGE_TYPES.includes(type)
}

export function isTitle(value) {
  return value && value.trim().length > 0
}
export function isImage(image) {
  if (!image) return { valid: false, error: 'Image is required.' }
  return { valid: true, error: '' }
}

export function validateImage(file) {
  if (!isImgFileValid(file.type))
    return { valid: false, message: 'Invalid file type. Please choose the image format.' }
  return { valid: true }
}
export function validateTitle(title) {
  if (!isTitle(title)) {
    return { valid: false, message: 'Title is required.' }
  }
  return { valid: true }
}
