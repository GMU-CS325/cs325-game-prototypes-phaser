// JavaScript source code

var config = {
    type: Phaser.AUTO,
    width: 2048,
    height: 1024,
    backgroundColor: 0x000000,
    debug: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            },
            debug: false
        }
    },

    scene: [TitleScreen,LevelSelect,MountainLevel] //Specify scenes in an array
}



var game = new Phaser.Game(config);