export default function createKeyHandler() {
  const pressing = {}

  document.addEventListener('keydown', event => {
    pressing[event.key] = true
  })

  document.addEventListener('keyup', event => {
    pressing[event.key] = false
  })

  return {
    isDown(key) {
      return !!pressing[key]
    }
  }
}
