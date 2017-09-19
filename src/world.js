export default function createWorld() {
  const scale = 2

  const height = window.innerHeight
  const width = window.innerWidth

  const canvas = document.querySelector('.world')
  canvas.height = height * scale
  canvas.width = width * scale
  canvas.style.display = 'block'
  canvas.style.height = `${height}px`
  canvas.style.width = `${width}px`

  const context = canvas.getContext('2d')
  context.scale(scale, scale)

  return {
    getContext() {
      return context
    },
    getHeight() {
      return height
    },
    getWidth() {
      return width
    },
    reset() {
      context.clearRect(0, 0, canvas.width, canvas.height)
    }
  }
}
