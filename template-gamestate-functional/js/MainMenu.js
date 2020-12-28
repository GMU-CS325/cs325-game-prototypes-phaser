import {Button} from './button.js';

export class MainMenu extends Phaser.Scene {

    constructor () {
        // The parameter to super() is the name used when switching states,
        // as in `this.scene.start(...)`.
        super( 'MainMenu' );
        
        this.music = null;
	    this.playButton = null;
	}
    
    create() {

        //	We've already preloaded our assets, so let's kick right into the Main Menu itself.
        //	Here all we're doing is playing some music and adding a picture and button
        //	Naturally I expect you to do something significantly better :)

        this.music = this.sound.add( 'titleMusic' );
        this.music.play();

        this.add.sprite( 0, 0, 'titlePage' ).setOrigin(0,0);
        
        this.playButton = new Button( this, 400, 300, 'playButton', this.startGame, this, 'over', 'out', 'down' );
    }

    update() {
        //	Do some nice funky main menu effect here
    }
    
    // The callback for the button.
    startGame() {
        //	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
        this.music.stop();

        //	And start the actual game
        this.scene.start( 'Game' );
    }
    
}
