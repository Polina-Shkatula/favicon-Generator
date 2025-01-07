export const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength - 3) + '...'
  }
  return text
}

export const setupScrollListener = (buttonId, offset = 100) => {
  const onScroll = () => {
    const button = document.getElementById(buttonId)
    if (!button) return

    const scrollHeight = document.documentElement.scrollHeight
    const scrollPosition = window.innerHeight + window.scrollY

    if (scrollPosition >= scrollHeight - offset) {
      button.classList.add('open')
    } else {
      button.classList.remove('open')
    }
  }

  document.addEventListener('scroll', onScroll)
  return () => document.removeEventListener('scroll', onScroll)
}
