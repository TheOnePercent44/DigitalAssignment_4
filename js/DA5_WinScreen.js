ThrowingFriend.WinScreen = function (game) {
	this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)
};

ThrowingFriend.WinScreen.prototype = {

	create: function () {
		var text = this.game.add.text(this.game.camera.width*0.25, this.game.camera.height*0.4, "Congratulations!", { font: "65px Arial", fill: "#FFFFFF", align: "center" });
		this.game.add.text(this.game.camera.width*0.30, this.game.camera.height*0.5, "(Click to Return to the Menu)", { font: "30px Arial", fill: "#FFFFFF", align: "center" });
	},

	update: function () {
		//return to menu somehow
		this.game.input.onDown.addOnce(this.returnToMenu, this);
	},
	
	returnToMenu: function(){
		this.state.start('Boot', true, true);
	}
};