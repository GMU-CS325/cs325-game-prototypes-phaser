//"use strict";

window.onload = function() {
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".

    // mods by Patrick OReilly 
    // twitter: @pato_reilly

    var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update, render: render });

    function preload() {

        game.load.tilemap('matching', 'assets/phaser_tiles.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', 'assets/phaser_tiles.png');//, 100, 100, -1, 1, 1);    
    }

    var timeCheck = 0;
    var flipFlag = false;

    var startList = new Array();
    var squareList = new Array();

    var masterCounter = 0;
    var squareCounter = 0;
    var attempt = 20;
    var square1Num;
    var square2Num;
    var savedSquareX1;
    var savedSquareY1;
    var savedSquareX2;
    var savedSquareY2;

    var map;
    var tileset;
    var layer;

    var marker;
    var currentTile;
    var currentTilePosition;

    var tileBack = 25;
    var timesUp = '+';
    var tryAgain = '-';
    var youWin = '+';

    var myCountdownSeconds;

    function create() {

            map = game.add.tilemap('matching');

            map.addTilesetImage('Desert', 'tiles');
            //tileset = game.add.tileset('tiles')

            //layer = game.add.tilemapLayer(0, 0, 600, 600, tileset, map, 0);
            layer = map.createLayer('Ground');//.tilemapLayer(0, 0, 600, 600, tileset, map, 0);

            //layer.resizeWorld();

            marker = game.add.graphics();
            marker.lineStyle(2, 0x00FF00, 1);
            marker.drawRect(0, 0, 100, 100);

        randomizeTiles();

    }

    function update() {
        
        countDownTimer();
        
        if (layer.getTileX(game.input.activePointer.worldX) <= 5) // to prevent the marker from going out of bounds
        {
            marker.x = layer.getTileX(game.input.activePointer.worldX) * 100;
            marker.y = layer.getTileY(game.input.activePointer.worldY) * 100;
        }

        if (flipFlag == true) 
        {
            if (game.time.now - timeCheck > 500)
            {
                flipBack();
                flipFlag = false;
            }
        }
        else
        {
            processClick();
        }

        if (attempt == 0 || myCountdownSeconds <= 0)
        {
            tryAgain = 'TRY AGAIN';
            game.paused = true;
        }
    }
       
       
    function countDownTimer() {
      
        var timeLimit = 180
      
        myTime = game.time.now;
        mySeconds = parseInt(myTime/1000);
        myCountdownSeconds = timeLimit - mySeconds;
        
        if (myCountdownSeconds <= 0) 
            {
            // time is up
            timesUp = 'Time is up!'; 
            myCountdownSeconds = 0;

        }
    }

    function processClick() {

        currentTile = map.getTile(layer.getTileX(marker.x), layer.getTileY(marker.y));
        currentTilePosition = ((layer.getTileY(game.input.activePointer.worldY)+1)*6)-(6-(layer.getTileX(game.input.activePointer.worldX)+1));

        if (game.input.mousePointer.isDown && (currentTile.index == tileBack))
        {
            // check to make sure the tile is not already flipped
            if (currentTile.index == tileBack)
            {
                // get the corresponding item out of squareList
                currentNum = squareList[currentTilePosition-1];
                flipOver();
                squareCounter++;

                if (squareCounter == 1)
                {
                    square1Num = currentNum;
                    savedSquareX1 = layer.getTileX(marker.x);
                    savedSquareY1 = layer.getTileY(marker.y);
                }

                // is the second tile of pair flipped?
                if  (squareCounter == 2)
                {
                    // reset squareCounter
                    squareCounter = 0;
                    square2Num = currentNum;
                    // check for match
                    if (square1Num == square2Num)
                    {
                        masterCounter++;

                        if (masterCounter == 18)
                        {
                            // go "win"
                            youWin = 'Got them all!';
                        }
                        else
                        {
                            savedSquareX2 = layer.getTileX(marker.x);
                            savedSquareY2 = layer.getTileY(marker.y);
                        }
                    }
                    else
                    {
                        flipFlag = true;
                        timeCheck = game.time.now;
                        savedSquareX2 = layer.getTileX(marker.x);
                        savedSquareY2 = layer.getTileY(marker.y);
                        attempt--;
                    }

                }
            }
        }
    }
     
    function flipOver() {
     
        map.putTile(currentNum, layer.getTileX(marker.x), layer.getTileY(marker.y));
    }
     
    function flipBack() {

        map.putTile(tileBack, savedSquareX1, savedSquareY1);
        map.putTile(tileBack, savedSquareX2, savedSquareY2);
     
    }
     
    function randomizeTiles() {

        for (num = 1; num <= 18; num++)
        {
            startList.push(num);
        }
        for (num = 1; num <= 18; num++)
        {
            startList.push(num);
        }

        // for debugging
        myString1 = startList.toString();
      
        // randomize squareList
        for (i = 1; i <=36; i++)
        {
            var randomPosition = game.rnd.integerInRange(0,startList.length-1);
            var thisNumber = startList[ randomPosition ];
            
            squareList.push(thisNumber);
            var a = startList.indexOf(thisNumber);

            startList.splice(a, 1);
            
        }
        
        // for debugging
        myString2 = squareList.toString();
      
        for (col = 0; col < 6; col++)
        {
            for (row = 0; row < 6; row++)
            {
                map.putTile(tileBack, col, row);
            }
        }
    }

    function getHiddenTile() {
            
        thisTile = squareList[currentTilePosition-1];
        return thisTile;
    }

    function render() {

        game.debug.text(timesUp, 620, 208, 'rgb(0,255,0)');
        game.debug.text(youWin, 620, 240, 'rgb(0,255,0)');

        game.debug.text('Time: ' + myCountdownSeconds, 620, 15, 'rgb(0,255,0)');

        //game.debug.text('squareCounter: ' + squareCounter, 620, 272, 'rgb(0,0,255)');
        game.debug.text('Matched Pairs ' + masterCounter, 620, 304, 'rgb(255,255,255)');
        game.debug.text('Remaining Tries ' + attempt, 620, 320, 'rgb(255,255,0)');
        game.debug.text(tryAgain, 620, 350, 'rgb(255,0,0)');


        //game.debug.text('startList: ' + myString1, 620, 208, 'rgb(255,0,0)');
        //game.debug.text('squareList: ' + myString2, 620, 240, 'rgb(255,0,0)');


        // game.debug.text('Tile: ' + map.getTile(layer.getTileX(marker.x), layer.getTileY(marker.y)), 620, 48, 'rgb(255,0,0)');

        game.debug.text('LayerX: ' + layer.getTileX(marker.x), 620, 80, 'rgb(255,0,0)');
        game.debug.text('LayerY: ' + layer.getTileY(marker.y), 620, 112, 'rgb(255,0,0)');

        // game.debug.text('Tile Position: ' + currentTilePosition, 620, 144, 'rgb(255,0,0)');
        game.debug.text('Hidden Tile: ' + getHiddenTile(), 620, 176, 'rgb(255,0,0)');
    }

/*
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        // Load an image and call it 'logo'.
        game.load.image( 'logo', 'assets/phaser.png' );
    }
    
    var bouncy;
    
    function create() {
        // Create a sprite at the center of the screen using the 'logo' image.
        bouncy = game.add.sprite( game.world.centerX, game.world.centerY, 'logo' );
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        bouncy.anchor.setTo( 0.5, 0.5 );
        
        // Turn on the arcade physics engine for this sprite.
        game.physics.enable( bouncy, Phaser.Physics.ARCADE );
        // Make it bounce off of the world bounds.
        bouncy.body.collideWorldBounds = true;
        
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        var text = game.add.text( game.world.centerX, 15, "Build something amazing.", style );
        text.anchor.setTo( 0.5, 0.0 );
    }
    
    function update() {
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, game.input.activePointer, 500, 500, 500 );
    }
*/
};
