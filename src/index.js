import * as firebase from 'firebase'
import createPlayer from './player'
import createPlayers from './players'
import createWorld from './world'
import createKeyHandler from './keyHandler'
import env from '../env'

firebase.initializeApp(env.firebase)

const keyHandler = createKeyHandler()
const world = createWorld()
const player = createPlayer(world, keyHandler)
const players = createPlayers(world)

let lastUpdate;

const loop = () => {
  const now = Date.now()
  const delta = now - lastUpdate

  player.update(delta)

  world.reset()
  players.draw()

  lastUpdate = now
  requestAnimationFrame(loop)
}

lastUpdate = Date.now()
requestAnimationFrame(loop)

window.onbeforeunload = () => {
  player.destroy();
}
