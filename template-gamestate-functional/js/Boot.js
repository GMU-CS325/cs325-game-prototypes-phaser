export class Boot extends Phaser.Scene {

    constructor() {
        // The parameter to super() is the name used when switching states,
        // as in `this.scene.start(...)`.
        super( 'Boot' );
    }

    preload() {
        //  Here we load the assets required for our Preloader state (in this case a background and a loading bar)
        this.load.image( 'preloaderBackground', 'assets/preloader_background.jpg' );
        this.load.image( 'preloaderBar', 'assets/preloader_bar.png' );
    }

    create() {
        //  By this point the preloader assets have loaded to the cache, we've set the game settings
        //  So now let's start the real preloader going
        this.scene.start( 'Preloader' );
    }
}
