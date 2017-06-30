var game = new Phaser.Game(200, 50, Phaser.CANVAS, 'game', {
    preload: preload,
    create: create,
    update: update
});

function preload() {
    game.load.audio('boden', ['assets/songOfDay.mp3']);


}


var music;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#000000';

    music = game.add.audio('boden');

    music.play();

    game.input.onDown.add(changeVolume, this);
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
    game.input.onDown.add(gofull, this);
    

}

function changeVolume(pointer) {

    if (pointer.y < 100) {
        music.mute = false;
    } else if (pointer.y < 300) {
        music.volume += 0.1;
    } else {
        music.volume -= 0.1;
    }

}


function gofull() {

    if (game.scale.isFullScreen) {
        game.scale.stopFullScreen();
    } else {
        game.scale.startFullScreen(false);
    }

}

function resizeGame() {
    var height = $(window).height();
    var width = $(window).width();
    game.width = width;
    game.height = height;
    game.stage.bounds.width = width;
    game.stage.bounds.height = height;
    if (game.renderType === Phaser.WEBGL) {
        game.renderer.resize(width, height);
    }
}

function update() {

}
