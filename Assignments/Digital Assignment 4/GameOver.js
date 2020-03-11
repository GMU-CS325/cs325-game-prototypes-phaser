class GameOver extends Phaser.Scene {

    constructor() {
        super('GameOver');
    }

    preload() {
        
    }

    create() {
        this.scene.setVisible(true);
        this.add.text(700, 100, 'Game Over', { fontFamily: '"Comic Sans MS", "Times New Roman", Tahoma, serif', fontSize: '120px' });
        var gameOver = this.sound.add('gameOver');
        gameOver.play();

        localStorage.setItem('score', game.scene.scenes[3].data.get('score'));
        var currentScore = parseInt(localStorage.getItem('score')) || 0;
        var highScore = parseInt(localStorage.getItem('highScore')) || 0;
        if (highScore == 0) { //No high score available
            localStorage.setItem('highScore', currentScore);
        }

        else if (currentScore > highScore) {
            localStorage.setItem('highScore', currentScore);
        }

        if (!this.scoreText) {
            this.scoreText = this.add.text(300, 300, '', { fontFamily: '"Comic Sans MS", "Times New Roman", Tahoma, serif', fontSize: '60px' });
        }

        if (!this.highScoreText) {
            this.highScoreText = this.add.text(300, 450, '', { fontFamily: '"Comic Sans MS", "Times New Roman", Tahoma, serif', fontSize: '60px' });
        }
        
        

        this.replayButton = this.add.sprite(700, 700, 'replayButton');
        this.replayButton.setInteractive({ useHandCursor: true });
        this.replayButton.on('pointerdown', () => this.loadTitleScreen());
        
    }

    loadTitleScreen() {
        this.scene.get('MountainLevel').scene.restart();
        this.scene.switch('GameOver', 'TitleScreen');
        this.scene.setVisible(false);
    }

    update() {
        if (this.scoreText) {
            this.scoreText.setText([
                'Score: ' + localStorage.getItem('score')
            ]);
        }
        if (this.highScoreText) {
            this.highScoreText.setText([
                'High Score: ' + localStorage.getItem('highScore')
            ]);
        }
    }
}