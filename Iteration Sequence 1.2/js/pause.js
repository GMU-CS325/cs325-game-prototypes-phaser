"use strict";

GameStates.makePause = function( game, shared ) {
    // Create your own variables.
   var stat_text;
   var stat_text2;
   var instruction;
   var txt_style = {fill: "#ffffff"};
   var tip_text;

   var esc_key;

    function returnGame() {
        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        game.state.start('Game');

    }


    
    return {
    
        create: function () {

          stat_text = game.add.text(0, 0, 'Strength: \nResistance: \nSpeed: \nLuck: \nStat Points: ', txt_style);
          stat_text2 = game.add.text(250, 0, shared.stat_strength + '\n' + shared.stat_resist + '\n' + shared.stat_speed + '\n' + shared.stat_luck + '\n' + shared.stat_remain, txt_style);
          instruction = game.add.text(300, 0, 'Click ESC to return to Game.', txt_style);
          tip_text = game.add.text(0, 300, 'TIPS\nStrength increases your damage dealt in boss fights.\nResistance decreases the damage you take in boss fights.\nSpeed allows you to move faster and jump higher.\nLuck increases the success rate of the trials.' , txt_style);


          esc_key = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
          esc_key.onDown.addOnce(returnGame, this);
        },
    
        update: function () {
            
        }
    };
};
