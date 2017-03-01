"use strict";
var resolution = 60;

window.onload = function() {
    var game = new Phaser.Game( 16*resolution, 9*resolution, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        game.load.image( 'logo', 'assets/phaser.png' );
    }
    
    var bouncy;
    
    function create() {
        //Stuff
    }
    
    function update() {
        //Stuff
    }
};
