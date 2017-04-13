
var deadphoto;
var deadword;
var lost;
GameStates.dead = function( game ) 
{
function begingame()
	{
		  game.state.start("loadgame");
		  
	}

	 return {
      preload: function () {

    
},
create: function () {
lost=game.add.audio('lost');
lost.play();
deadphoto=game.add.sprite(0,0,'deadgongzhu');
deadphoto.scale.setTo(1.3,1.3);
deadphoto.inputEnabled = true;
deadphoto.events.onInputDown.add(begingame, this);
},
update: function () {



},
}

}