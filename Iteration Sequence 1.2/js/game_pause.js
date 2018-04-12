"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
 
    function returnGame() {
        game.state.start('Game');
    }

    function render()
    {
        //game.debug.cameraInfo(game.camera, 32, 32);
    }

    return {
    
        create: function () {

        },
    
        update: function () {
            
        }
    };
};
