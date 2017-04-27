
var frame;
var text;
var loading;
var instruction;
var secert;
var button;
var looktimer=1000;

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
           loading.scale.setTo(1.3,1.3);
   //  loading.scale.setTo(0.5,0.5);
frmae=game.add.sprite(100,100,'wordframe');
frmae.scale.setTo(0.8,2);
frmae.alpha=0.8;
 instruction=game.add.sprite(190,22,'instruction');
button=game.add.sprite(300,440,'letsgo');
 button.inputEnabled = true;
  button.events.onInputDown.add(fade, this);
test = game.add.text(100,100,"Oh my god, last digital game! \n Player got some problems and you become \n a small bird. You will enter a drak world. \n After you touch 3 ball, you will be saved \n You have 5s to check this drak world, and \nthen, world become complete drak \n you also will find some tool to help you \n Remember! You have limited time!!!!", { font: '30px Arial', fill: '#00f' });

//secert = game.add.text(100,340,"  Cheat Code:csbt325jk(get special ability) \n  (One sentece can change anything)", { font: '26px Arial', fill: '#00f' });



},
update: function () {
	  game.camera.onFadeComplete.add(resetFade, this);



},
}
}

   