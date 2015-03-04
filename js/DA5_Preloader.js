ThrowingFriend.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;
	this.foreground = null;

	this.ready = false;

};

ThrowingFriend.Preloader.prototype = {

	preload: function () {

		this.ready = false;
		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		//this.background = this.add.sprite(300, 400, 'preloaderBarBackground');
		//this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');
		//this.foreground = this.add.sprite(300, 400, 'preloaderBarForeground');

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		//this.load.setPreloadSprite(this.preloadBar);

		//	Here we load the rest of the assets our game needs.
		this.load.spritesheet('button', 'assets/flixel-button.png', 80, 20);
		this.load.tilemap('map', 'assets/zombieTest.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.image('greenBlock', 'assets/greenBlock_32x32.png');
		this.load.image('purpleBlock', 'assets/purpleBlock_32x32.png');
		this.load.image('redBlock', 'assets/redBlock_32x32.png');
		this.load.image('yellowBlock', 'assets/yellowBlock_32x32.png');
	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		//this.preloadBar.cropEnabled = false;
		this.state.start('Game');
	},

	update: function () {

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.
		
		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.
		
		if (this.cache.isSoundDecoded('titleMusic') && this.cache.isSoundDecoded('gameMusic') && this.ready == false)
		{
			this.ready = true;
			this.state.start('MainMenu');
		}

	}

};