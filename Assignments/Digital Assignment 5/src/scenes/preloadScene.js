class PreloadScene extends Phaser.Scene {

	constructor() {
		super({ key: 'preloadScene' });
	}

    preload() {
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 2 - 350, height/2 - 40, 640, 50);
        //Upper left x coord, then upper left y coord, then width and height
        //See fill box below

        
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
            progressBar.fillRect(width / 2 - 340, height/2 - 30, 625 * value, 30);
            //First arg 10 more than first arg of fillRect above, second arg same
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
            this.scene.scene.start('titleScene');
        });
        
        this.load.image('bg_001', '../../assets/titleScene/bg_001.gif');
        this.load.image('bg_002', '../../assets/titleScene/bg_002.gif');
        this.load.image('bg_003', '../../assets/titleScene/bg_003.gif');
        this.load.image('bg_004', '../../assets/titleScene/bg_004.gif');

        this.load.image('level_bg_001', '../../assets/Level Backgrounds/level_bg_001.gif');
        this.load.image('level_bg_002', '../../assets/Level Backgrounds/level_bg_002.gif');
        this.load.image('level_bg_003', '../../assets/Level Backgrounds/level_bg_003.gif');
        this.load.image('level_bg_004', '../../assets/Level Backgrounds/level_bg_004.gif');
        this.load.image('level_bg_005', '../../assets/Level Backgrounds/level_bg_005.gif');
        this.load.image('level_bg_006', '../../assets/Level Backgrounds/level_bg_006.gif');
        this.load.image('level_bg_007', '../../assets/Level Backgrounds/level_bg_007.gif');
        this.load.image('level_bg_008', '../../assets/Level Backgrounds/level_bg_008.gif');

        this.load.image('ground', '../../assets/ground.png');

        // Load sprite sheet generated with TexturePacker
        this.load.atlas('sheet', 'assets/gameObstacles-sprites.png', 'assets/gameObstacles-sprites.json');

        // Load body shapes from JSON file generated using PhysicsEditor
        this.load.json('shapes', 'assets/gameObstacles.json');
	}

}

export default PreloadScene;