import * as firebase from 'firebase'

export default function createPlayers(world) {
  let players

  firebase.database().ref('users').on('value', snapshot => {
    players = snapshot.val()
  })

  return {
    draw() {
      if (!players) {
        return
      }

      world.getContext().font = `30px sans-serif`

      Object.values(players).forEach(player => {
        world.getContext().fillText(player.char, player.position.x, player.position.y)
      })
    }
  }
}
