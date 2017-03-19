
var winphoto;
var winword;
var win;
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
winphoto.inputEnabled = true;
winphoto.events.onInputDown.add(begingame, this);
winword = game.add.text(100,200,'   Wow!!!, You  attracted < ' +attack+ " > gentleman\n Also, hope everyone can find the lovely one!",{fill: '#00f' });
},
update: function () {



},
}

}