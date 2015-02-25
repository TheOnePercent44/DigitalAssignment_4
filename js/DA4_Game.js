OrganTrail.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

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
	
    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

var player, layer;
OrganTrail.Game.prototype = {
    create: function () {
		//this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.physics.startSystem(Phaser.Physics.P2JS);
        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
		map = this.game.add.tilemap('map');
		map.addTilesetImage('greenBlock_32x32', 'greenBlock');
		//map.addTilesetImage('blueBlock_32x32', 'blueBlock');
		//layer = map.createLayer('Background');
		layer = map.createLayer('Platforms');
		player = new newPlayer(this.game, 15, 3100);//physics enables in Catfighter
		layer.resizeWorld();
		map.setCollision(1, true, 'Platforms', true);
		
		game.physics.p2.convertTilemap(map, layer);
		//this.game.camera.setSize(100, 100);
		//this.game.camera.bounds = new Phaser.Rectangle(0, 0, 3216,3216);
		this.game.camera.follow(player.sprite, this.game.camera.FOLLOW_PLATFORMER);
		//this.game.camera.update();
		
		this.game.physics.p2.gravity.y = 300;
    },

    update: function () {

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
		this.game.physics.arcade.collide(player.sprite, layer, player.hitLand, null, player);
		
		if(this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
		{
			player.runRight();
		}
		else if(this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
		{
			player.runLeft();
		}
		else
		{
			player.idle();
		}
		if(this.game.input.keyboard.isDown(Phaser.Keyboard.UP))
		{
			player.jump();
		}
    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    }

};

function newPlayer(game, xcoord, ycoord)
{
	this.game = game;
	this.sprite = this.game.add.sprite(xcoord, ycoord, 'redBlock');
	this.game.physics.enable(this.sprite, Phaser.Physics.P2JS);
	this.sprite.body.allowGravity = true;
	return this;
}

function horde(game, player)
{
	this.game = game;
	this.target = player;
	this.zombies = new Group();
	this.zombies.enableBody = true;
	
	//this.gainZombie = function(
}