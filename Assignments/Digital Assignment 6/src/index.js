import phaser from 'phaser'
import  Preloader  from './scenes/preloader.js'
import  Game  from './scenes/game.js'

const config = {
    width: 270,
    height: 480,
    parent: 'content',
    scene: [
        Preloader,
        Game
    ]
}
const game = new phaser.Game(config)

