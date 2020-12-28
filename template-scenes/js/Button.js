// Button class by yannick/yandeu https://phaser.discourse.group/u/yannick
// https://phaser.discourse.group/t/buttons-in-phaser-3/1321/9

export class Button extends Phaser.GameObjects.Sprite {
  onInputOver = () => {}
  onInputOut = () => {}
  onInputDown = () => {}
  onInputUp = () => {}
  
  constructor(scene, x, y, texture, actionOnClick = () => {}, context, overFrame, outFrame, downFrame) {
    super(scene, x, y, texture)
    scene.add.existing(this)
    this.inclick = false;

    this.setFrame(outFrame)
      .setInteractive()

      .on('pointerover', () => {
        this.onInputOver()
        if( this.inclick ) {
            this.setFrame(downFrame)
        } else {
            this.setFrame(overFrame)
        }
      })
      .on('pointerdown', () => {
        this.inclick = true;
        this.onInputDown()
        this.setFrame(downFrame)
      })
      .on('pointerup', () => {
        if( this.inclick ) { actionOnClick.call( context ); }
        this.inclick = false;
        this.onInputUp()
        this.setFrame(overFrame)
      })
      .on('pointerout', () => {
        // Ideally pointer out wouldn't set inclick = false
        // so that the user could press, moves the pointer off the button,
        // move it back over, release, and still fire the button.
        // For that to work, we also need to know if the user presses down,
        // moves the pointer off the button, and releases so we can reset the
        // button state. However, our pointerup event only fires when the pointer
        // is released over the button.
        // We could set a callback on `scene.input.on('pointerup')`.
        // We could also track the pointer id to make sure it's the same button/finger.
        // In the meantime, just set `inclick` to false. The user will still
        // be able to cancel the press by moving the pointer outside the button.
        this.inclick = false;
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
