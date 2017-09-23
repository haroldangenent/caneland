import * as firebase from 'firebase'
import createPlayer from './player'
import createWorld from './world'
import createKeyHandler from './keyHandler'
import env from '../env'

firebase.initializeApp(env.firebase)

const keyHandler = createKeyHandler()
const world = createWorld()
const player = createPlayer(world, keyHandler)

let lastUpdate;

const loop = () => {
  const now = Date.now()
  const delta = now - lastUpdate

  player.update(delta)

  world.reset()
  player.draw()

  lastUpdate = now
  requestAnimationFrame(loop)
}

lastUpdate = Date.now()
requestAnimationFrame(loop)
