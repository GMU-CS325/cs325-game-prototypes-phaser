
var frame;
var text;
var loading;
var instruction;
var secert;
var button;

GameStates.information = function( game ) 
{
	function begingame()
	{
		   game.state.start("maingame");
		   welcome.stop();
	}
	 return {
      preload: function () {

    
},
create: function () {
 
	     loading=game.add.sprite(0,0,'loading');
    
     loading.scale.setTo(0.5,0.5);
frmae=game.add.sprite(100,100,'wordframe');
frmae.scale.setTo(0.8,2);
frmae.alpha=0.8;
 instruction=game.add.sprite(180,-20,'instruction');
button=game.add.sprite(300,440,'letsgo');
 button.inputEnabled = true;
  button.events.onInputDown.add(begingame, this);
test = game.add.text(100,100," In this game, you play as a hero and try to \n save the last world tree.(preservationist) \n Use narrow to move around and whitespace \n is attack. Also you will have 4 skills with the \n process. Do not for get to avoid the bomb \n  above your head. Good Luck!\n ", { font: '30px Arial', fill: '#00f' });

secert = game.add.text(100,340,"  Cheat Code:csbt325jk(get special ability) \n  (One sentece can change anything)", { font: '26px Arial', fill: '#00f' });



},
update: function () {



},
}
}

   