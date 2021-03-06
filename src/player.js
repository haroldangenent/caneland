import * as firebase from 'firebase'
import randomEmoji from 'random-emoji'

export default function createPlayer(world, keyHandler) {
  let active = true;
  let isJumping = true
  const size = 30
  const speed = 0.5
  const movement = { x: 0, y: 0 }
  const position = { x: 0, y: size }

  const db = firebase.database()
  const emoji = randomEmoji.random({ count: 1 }).shift()
  const userId = db.ref('users').push().key
  db.ref(`users/${userId}`).update({
    char: emoji.character,
    name: emoji.name,
    position: position,
    score: 0,
  })

  const savePosition = () => {
    if (!active) {
      return;
    }

    db.ref(`users/${userId}`).update({
      position: position,
    })
  }

  return {
    destroy() {
      active = false;
      db.ref(`users/${userId}`).remove();
    },
    update(delta) {
      movement.x = 0
      movement.y += (delta / 30)

      // Horizontal movement
      if (keyHandler.isDown('ArrowRight')) {
        movement.x = speed * delta
      } else if (keyHandler.isDown('ArrowLeft')) {
        movement.x = -speed * delta
      }

      // Jump
      if (keyHandler.isDown(' ') && !isJumping) {
        isJumping = true
        movement.y = -15
      }

      // Move
      position.x += movement.x
      position.y += movement.y

      // Boundaries
      if (position.y >= world.getHeight()) {
        isJumping = false
        position.y = world.getHeight()
      }

      if (position.x <= 0) {
        position.x = 0
      }

      if (position.x >= (world.getWidth() - size)) {
        position.x = (world.getWidth() - size)
      }

      savePosition()
    }
  }
}
