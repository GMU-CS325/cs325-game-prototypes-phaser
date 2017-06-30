var game = new Phaser.Game(1080, 1920, Phaser.CANVAS, 'game', {
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

    game.stage.backgroundColor = '#313131';

    music = game.add.audio('boden');

    music.play();

    game.input.onDown.add(changeVolume, this);

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

function update() {

}
