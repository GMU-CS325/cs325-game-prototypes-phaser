
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
		//game.state.start("dead");
		   welcome.stop();
	}
	 return {
      preload: function () {

    
},
create: function () {
 
	     loading=game.add.sprite(0,0,'loading');
     loading.scale.setTo(0.8,0.8);
   //  loading.scale.setTo(0.5,0.5);
frmae=game.add.sprite(100,100,'wordframe');
frmae.scale.setTo(0.8,2);
frmae.alpha=0.8;
 instruction=game.add.sprite(180,-20,'instruction');
button=game.add.sprite(300,440,'letsgo');
 button.inputEnabled = true;
  button.events.onInputDown.add(begingame, this);
test = game.add.text(100,100,"  In this game, you are attenting a blind date,\n  you duty is to attarct all the gentleman in\n the stage. Also, pay attention to the women! \n They are all your enemies! When you try to\n attract some man, they will attack you.\n Once you got attacked, you will dead directly \n Use whitespace to attract gentleman. You\n only have 2 minutes in blind date,good luck!", { font: '30px Arial', fill: '#00f' });

//secert = game.add.text(100,340,"  Cheat Code:csbt325jk(get special ability) \n  (One sentece can change anything)", { font: '26px Arial', fill: '#00f' });



},
update: function () {



},
}
}

   