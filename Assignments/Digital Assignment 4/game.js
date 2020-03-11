// JavaScript source code

var config = {
    type: Phaser.AUTO,
    width: 2048,
    height: 1024,
    backgroundColor: 0x000000,
    debug: true,
    audio: {
        disableWebAudio: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            },
        }
    },

    scene: [LoadingScreen, TitleScreen,LevelSelect,MountainLevel,GameOver] //Specify scenes in an array
}

function gameOver(player) {
    for (let i = 0; i < 1000; i++) {
        player.y += 0.005;
    }
    console.log(game.scene.scenes[4]);
    game.scene.scenes[3].time.addEvent({
        delay: 1500, // in ms
        callback: () => {
            game.scene.scenes[3].scene.setVisible(true);
            game.scene.scenes[3].scene.switch('GameOver');
        }
    })
}

var game = new Phaser.Game(config);