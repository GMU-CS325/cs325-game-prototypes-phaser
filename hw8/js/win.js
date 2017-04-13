
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
winphoto.scale.setTo(1.5,1.5);
winphoto.inputEnabled = true;
winphoto.events.onInputDown.add(begingame, this);
winword = game.add.text(100,200,'You are a regular emploee in our post office!',{fill: '#00f' });
},
update: function () {



},
}

}