
var deadphoto;
GameStates.dead = function( game ) 
{
function begingame()
	{
		   game.state.start("maingame");
		  
	}

	 return {
      preload: function () {

    
},
create: function () {
 
	
deadphoto=game.add.sprite('deadgongzhu');
deadphoto.inputEnabled = true;
deadgongzhu.events.onInputDown.add(begingame, this);
},
update: function () {



},
}

}