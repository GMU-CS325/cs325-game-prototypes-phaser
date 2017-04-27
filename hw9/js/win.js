
var winphoto;
var winword;
var win;
var saved;
GameStates.win = function( game ) 
{
function begingame()
	{
		  game.state.start("loadgame");
		  
	}

	 return {
      preload: function () {
      

    
},
create: function () {
	   win=game.add.audio('win');
	   win.play();
winphoto=game.add.sprite(0,0,'winphoto');
winphoto.scale.setTo(1.2,1.2);
winphoto.inputEnabled = true;
winphoto.events.onInputDown.add(begingame, this);
saved=game.add.sprite(-20,100,'jiushiwo');
},
update: function () {



},
}

}