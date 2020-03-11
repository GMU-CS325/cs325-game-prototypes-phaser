class LoadingScreen extends Phaser.Scene {

    constructor() {
        super('LoadingScreen');
    }

    preload() {
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(690, 470, 640, 50);

        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 80,
            text: 'Loading...',
            style: {
                font: '40px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 15,
            text: '0%',
            style: {
                font: '36px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        var assetText = this.make.text({
            x: width / 2 - 25,
            y: height / 2 + 30,
            text: '',
            style: {
                font: '25px monospace',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);

        this.load.on('progress', function (value) {
            console.log(value);
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(700, 480, 600 * value, 30);
        });
            
        this.load.on('fileprogress', function (file) {
            console.log(file.src);
            assetText.setText('Loading asset: ' + file.src);
        });
 
        this.load.on('complete', function () {
            console.log('complete');
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });

        /*this.load.image('logo', 'Assets/koopa.png');
        for (var i = 0; i < 500; i++) {
            this.load.image('logo' + i, 'Assets/koopa.png');
        }*/

        //For TitleScreen.js
        this.load.image('background', 'Assets/background.png');
        this.load.audio('intro', 'Sounds/Intro Distorted.mp3');
        this.load.image('title', 'Assets/title.png');
        this.load.image('koopatitle', 'Assets/koopa.png');
        this.load.image('play', 'Assets/tPlay.png');
        this.load.image('levelselect', 'Assets/tLevelSelect.png');
        this.load.image('ground', "Assets/afloor.png");

        //For LevelSelect.js
        this.load.image('background', 'Assets/background.png');
        this.load.image('title', 'Assets/title.png');
        this.load.image('ground', 'Assets/afloor.png');
        this.load.image('koopatitle', 'Assets/koopa.png');
        this.load.image('mountain', 'Assets/MountainSelect.png');
        this.load.image('locked', 'Assets/lock.png');


        //For MountainLevel.js
        this.load.image('background', 'Assets/background.png');
        this.load.image('ground', 'Assets/afloor.png');
        this.load.image('koopa', 'Assets/koopa.png');
        this.load.atlas('player', 'sprites.png', 'sprites.json');
        this.load.atlas('slide', 'roll.png', 'roll.json');
        this.load.atlas('bird', 'birdie.png', 'birdie.json');
        this.load.image('thwomp', 'Assets/thwomp.png');
        this.load.audio('gameOver', 'Sounds/GameOver.mp3');
        this.load.audio('play', 'Sounds/play.mp3');

        //For GameOver.js
        this.load.audio('gameOver', 'Sounds/GameOver.mp3');
        this.load.image('replayButton', 'Assets/replay.png');
    }

    create() {
        
    }

    update() {
        this.scene.start('TitleScreen');
    }
}