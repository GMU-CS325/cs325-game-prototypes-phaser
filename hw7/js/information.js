
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
	   function fade() {

    //  You can set your own fade color and duration
    game.camera.fade(0x000000, 3000);

}
function resetFade() {

    begingame();
	}

	 return {
      preload: function () {

    
},
create: function () {
 
	     loading=game.add.sprite(0,0,'loading');
      loading.scale.setTo(0.27,0.27);	
   //  loading.scale.setTo(0.5,0.5);
frmae=game.add.sprite(100,100,'wordframe');
frmae.scale.setTo(0.8,2);
frmae.alpha=0.8;
 instruction=game.add.sprite(180,-20,'instruction');
button=game.add.sprite(300,440,'letsgo');
 button.inputEnabled = true;
  button.events.onInputDown.add(fade, this);
test = game.add.text(100,100,"  In this game, you are a noob letter carrier, \n you duty is to send the letter to destination,\n and you will across many streets and you \n will see many high speed cars, try to advoid \n them! Other wise you will die. Use cursor \n to move around", { font: '30px Arial', fill: '#00f' });

//secert = game.add.text(100,340,"  Cheat Code:csbt325jk(get special ability) \n  (One sentece can change anything)", { font: '26px Arial', fill: '#00f' });



},
update: function () {
	  game.camera.onFadeComplete.add(resetFade, this);



},
}
}

   