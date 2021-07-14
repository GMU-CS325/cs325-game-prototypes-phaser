var PreloadScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:

    function PreloadScene() {
        Phaser.Scene.call(this, 'preloadScene');
    },

    preload: function () {
        //width and height are used to center the position of text. Fiddle around with the x and y coordinates as you see fit
        //This uses JS graphics
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 2 - 350, height / 2 - 40, 640, 50);
        //Upper left x coord, then upper left y coord, then width and height
        //See fillRect in changePercentText

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

        changePercentText(this, percentText, progressBar, width, height);
        changeAssetText(this, assetText);
        
        this.load.on('complete', function () {
            //destroy everything
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
            this.scene.scene.start('titleScene');
        });

        loadFiles(this);
    },

});

function changePercentText(scene, percentText, progressBar, width, height) {
    //File has completed loading
    scene.load.on('progress', function (value) {
        var prevVal = parseInt((percentText._text.split("%"))[0]); //similar to strtok in C
        while (prevVal < parseInt(value * 100)) {
            percentText.setText(prevVal + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(width / 2 - 340, height / 2 - 30, 625 * value, 30);
            prevVal = prevVal + 1;
        }
        //First arg 10 more than first arg of fillRect above, second arg same
    });
}

function changeAssetText(scene, assetText) {
    //changed from fileprogress
    scene.load.on('filecomplete', function (file) {
        assetText.setText('Loading asset: ' + file);
    });
}

function loadFiles(scene) {
    console.log(scene.sys);

    scene.load.image('bg_001', 'src/assets/titleScene/bg_001.gif');
    scene.load.image('bg_002', 'src/assets/titleScene/bg_002.gif');
    scene.load.image('bg_003', 'src/assets/titleScene/bg_003.gif');
    scene.load.image('bg_004', 'src/assets/titleScene/bg_004.gif');

    //First load background image
    scene.load.image('background', 'src/assets/levelBackground/background.png');

    //Load object stuff
    scene.load.image('door_bottom', 'src/assets/levelBackground/door_bottom.png');
    scene.load.image('door_top', 'src/assets/levelBackground/door_top.png');

    //Load player texture atlas
    scene.load.image('player', 'src/assets/levelBackground/kenney_player.png','src/assets/levelBackground/kenney_player_atlas.json');

    //Load other level assets
    scene.load.image('platformer_tiles', 'src/assets/levelBackground/platformPack_tilesheet.png');
    scene.load.tilemapTiledJSON('map', 'src/assets/levelBackground/levelBackground3.json');
    scene.load.image('background_sprites', 'src/assets/levelBackground/sprites.png')
}

export default PreloadScene;