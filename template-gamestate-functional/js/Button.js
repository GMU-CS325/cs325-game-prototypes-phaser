// Button class by yannick/yandeu https://phaser.discourse.group/u/yannick
// https://phaser.discourse.group/t/buttons-in-phaser-3/1321/9

export class Button extends Phaser.GameObjects.Sprite {
  onInputOver = () => {}
  onInputOut = () => {}
  onInputUp = () => {}

  constructor(scene, x, y, texture, actionOnClick = () => {}, context, overFrame, outFrame, downFrame) {
    super(scene, x, y, texture)
    scene.add.existing(this)

    this.setFrame(outFrame)
      .setInteractive()

      .on('pointerover', () => {
        this.onInputOver()
        this.setFrame(overFrame)
      })
      .on('pointerdown', () => {
        actionOnClick.call( context )
        this.setFrame(downFrame)
      })
      .on('pointerup', () => {
        this.onInputUp()
        this.setFrame(overFrame)
      })
      .on('pointerout', () => {
        this.onInputOut()
        this.setFrame(outFrame)
      })
  }
}

// Example showing use with a spritesheet and use with an atlas.
/*
class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' })
  }

  preload() {
    this.load.setCORS('anonymous')
    this.load.spritesheet('button', 'https://examples.phaser.io/assets/buttons/button_sprite_sheet.png', { frameWidth: 193, frameHeight: 71 })
    this.load.atlas('buttonAtlas', 'https://examples.phaser.io/assets/buttons/button_texture_atlas.png', 'https://examples.phaser.io/assets/buttons/button_texture_atlas.json')
  }

  create() {
    const actionOnClick = () => {
      console.log('click')
    }

    let btn1 = new Button(this, 50, 50, 'button', actionOnClick, 2, 1, 0)
    btn1.onInputOut = () => {
      console.log('Btn1: onInputOut')
    }
    btn1.setOrigin(0)

    let btn2 = new Button(this, 50, 150, 'buttonAtlas', actionOnClick, 'over', 'out', 'down')
    btn2.onInputOut = () => {
      console.log('Btn2: onInputOut')
    }
    btn2.setOrigin(0)
  }
}

var config = {
    type: Phaser.AUTO,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 400,
      height: 300
    },
    backgroundColor: '#ffffff',
    parent: 'phaser-example',
    scene: [MainScene]
};

var game = new Phaser.Game(config);
*/
