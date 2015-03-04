ThrowingFriend.MainMenu = function (game) {
	this.game = game;
	this.music = null;
	this.playButton = null;

};

ThrowingFriend.MainMenu.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

		//this.music = this.add.audio('titleMusic', 1, true);
		//this.music.play();

		//this.add.sprite(0, 0, 'titlepage');
		//add text
		var text = this.game.add.text(this.game.camera.width*0.18, this.game.camera.width*0.15, "Controls will go here", { font: "30px Arial", fill: "#FFFFFF", align: "center" });
		//this.playButton = this.add.button(400, 600, 'playButton', this.startGame, this, 'buttonOver', 'buttonOut', 'buttonOver');
		this.playButton = this.add.button(this.game.world.centerX-35, this.game.world.centerY+100, 'button', this.startGame, this, 1, 0, 2);

	},

	update: function () {

		//	Do some nice funky main menu effect here
		
		//this.playButton.reset(this.game.world.centerX-35, this.game.world.centerY+100);
	},

	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		//this.music.stop();

		//	And start the actual game
		this.state.start('Game');

	}

};