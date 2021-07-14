import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    this.load.image('mushroom', 'assets/images/mushroom2.png')
    scene.load.image('bg_001', 'assets/titleScene/bg_001.gif');
    scene.load.image('bg_002', 'assets/titleScene/bg_002.gif');
    scene.load.image('bg_003', 'assets/titleScene/bg_003.gif');
    scene.load.image('bg_004', 'assets/titleScene/bg_004.gif');

    //First load background image
    scene.load.image('background', 'assets/levelBackground/background.png');

    //Load object stuff
    scene.load.image('door_bottom', 'assets/levelBackground/door_bottom');
    scene.load.image('door_top', 'assets/levelBackground/door_top');

    //Load player texture atlas
    scene.load.image('player', 'assets/levelBackground/kenney_player.png','assets/levelBackground/kenney_player_atlas.json');

    //Load other level assets
    scene.load.image('platformer_tiles', 'assets/levelBackground/platformPack_tilesheet.png');
    scene.load.tilemapTiledJSON('map', 'assets/levelBackground/levelBackground3.json');
    scene.load.image('background_sprites', 'assets/levelBackground/sprites.png')
  }

  create () {
    this.state.start('Title')
  }
}
