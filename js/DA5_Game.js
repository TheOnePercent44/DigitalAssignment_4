ThrowingFriend.Game = function (game) {

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

var player, layer, humans, friends, leftKey, rightKey, spaceKey, upKey;
ThrowingFriend.Game.prototype = {
    create: function () {
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		//this.game.physics.startSystem(Phaser.Physics.P2JS);
        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
		map = this.game.add.tilemap('map');
		map.addTilesetImage('greenBlock_32x32', 'greenBlock');
		//map.addTilesetImage('blueBlock_32x32', 'blueBlock');
		//layer = map.createLayer('Background');
		layer = map.createLayer('Platforms');
		layer.resizeWorld();
		map.setCollision(1, true, 'Platforms', true);
		
		leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
		
		//this.game.physics.p2.convertTilemap(map, layer);
		//this.game.camera.setSize(100, 100);
		//this.game.camera.bounds = new Phaser.Rectangle(0, 0, 3216,3216);
		//this.game.camera.update();
		
		//this.game.physics.p2.gravity.y = 300;//300;
		this.game.physics.arcade.gravity.y = 300;//300;
		
		humans = this.game.add.group();
		humans.enableBody = true;
		humans.physicsBodyType = Phaser.Physics.ARCADE;
		//humans.enableGravity=true;
		var hume = new Human(this.game, 160, 3100);//these two humes are for testing purposes
		humans.add(hume.sprite);
		hume = new Human(this.game, 416, 3100);
		humans.add(hume.sprite);
		hume = new Human(this.game, 768, 3100);//these two humes are for testing purposes
		humans.add(hume.sprite);
		hume = new Human(this.game, 960, 2900);//these two humes are for testing purposes
		humans.add(hume.sprite);
		hume = new Human(this.game, 1024, 2900);
		humans.add(hume.sprite);
		hume = new Human(this.game, 1216, 2800);
		humans.add(hume.sprite);
		//hume = new Human(this.game, 1248, 2800);//these two humes are for testing purposes
		//humans.add(hume.sprite);
		hume = new Human(this.game, 1056, 2600);
		humans.add(hume.sprite);
		/*for(var i = 0; i< 20;i++)
		{
			humans.add(newHume(this.game));
		}*/
		
		player = new newPlayer(this.game, 15, 3100);//physics enables in Catfighter
		this.game.camera.follow(player.sprite, this.game.camera.FOLLOW_PLATFORMER);
		player.sprite.body.collideWorldBounds = true;
		
		friends = new Horde(this.game, player.sprite);
    },

    update: function () {

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
		this.game.physics.arcade.collide(player.sprite, layer, player.hitLand, null, player);
		this.game.physics.arcade.collide(humans, layer);
		this.game.physics.arcade.collide(player.sprite, humans, change, null, this);
		this.game.physics.arcade.collide(friends.zombies, layer);
		
		friends.update();
		
		if(rightKey.isDown)
		{
			player.runRight();
		}
		else if(leftKey.isDown)
		{
			player.runLeft();
		}
		else
		{
			if(player.inAir === false)
				player.idle();
		}
		//if(this.game.input.keyboard.isDown(Phaser.Keyboard.UP))
		if(spaceKey.isDown)
		{
			//player.jump();
			if(friends.climbing === false)
			{
				friends.climbing = true;
				friends.zombies.forEachAlive(friends.zombies.setProperty, friends.zombies, '.body.enableGravity', false, 0, true);
				//console.log("Climbing is true");
				//friends.ladder();
			}
			else
			{
				friends.climbing = true;
				friends.zombies.forEachAlive(friends.zombies.setProperty, friends.zombies, '.body.enableGravity', false, 0, true);
				//friends.climbing = false;
			}
		}
		else
		{
			friends.zombies.forEachAlive(friends.zombies.setProperty, friends.zombies, 'stacked', false, 0, true);
			if(friends.climbing === true)
			{
				friends.climbing = false;
				friends.zombies.forEachAlive(friends.zombies.setProperty, friends.zombies, '.body.enableGravity', true, 0, true);
				//console.log("Climbing is false");
			}
			else{}
		}
		if(upKey.isDown && friends.climbing === true)
		{//will short circuit if the first two conditions are false,thus denying the climbing ability unless all three conditions are true, no further action required(?)
			//console.log("Attempting to climb");
			this.game.physics.arcade.overlap(player.sprite, friends.zombies, player.climb, null, player);
		}
    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    }

};

function change(playersprite, human)
{
	var x = human.body.x;
	var y = human.body.y;
	
	human.kill();
	friends.gainZombie(x, y);
};

function Human(game, xcoord, ycoord)
{
	this.game = game;
	this.sprite = this.game.add.sprite(xcoord, ycoord, 'yellowBlock');
	
	/*this.die = function()
	{
		this.sprite.kill();
	}
	
	this.getX = function()
	{
		//return this.sprite.body.x;
	}*/
	return this;
};

function Horde(game, playersprite)
{
	this.game = game;
	this.target = playersprite;
	this.zombies = this.game.add.group();
	this.zombies.enableBody = true;
	//this.zombies.collideWorldBounds = true;
	
	this.goright = false;
	this.goleft = false;
	this.climbing = false;
	this.stacked = false;
	
	this.MIN_DISTANCE = 42;
	//this.MAX_DISTANCE = 32
	
	this.MAX_SPEED = 400;
	this.DRAG = 1000;
	this.ACCEL = 500;
	
	this.gainZombie = function(x, y)
	{
		//var temp = new ZombieFriend(this.game, x, y, this);
		var temp = this.game.add.sprite(x, y, 'purpleBlock');
		temp.drag = this.DRAG;
		this.game.physics.enable(temp, Phaser.Physics.ARCADE);
		temp.body.collideWorldBounds = true;
		this.zombies.add(temp);//this.game.add.sprite(x, y, 'purpleBlock'));
		this.game.world.bringToTop(this.target);
	}
	
	this.update = function()
	{
		if(friends.climbing === false)
			this.zombies.forEachAlive(this.chase, this);
		else
		{
			this.ladder();
		}
	}
	
	this.chase = function(zombieFriend)
	{
		this.stacked = false;
		zombieFriend.stacked = false;
		zombieFriend.body.enableGravity = true;
		var distance = this.game.math.distance(zombieFriend.x, zombieFriend.y, this.target.x, this.target.y);
		
		// If the distance > MIN_DISTANCE then move
		if (distance > this.MIN_DISTANCE && zombieFriend.body.velocity.x < this.MAX_SPEED)// && this.distance !< MAX_DISTANCE)
		{		
			// Calculate the angle to the target
			var rotation = this.game.math.angleBetween(zombieFriend.x, zombieFriend.y, this.target.x, this.target.y);

			// Calculate velocity vector based on rotation and this.MAX_SPEED
			zombieFriend.body.velocity.x = Math.cos(rotation) * this.MAX_SPEED;
			zombieFriend.body.velocity.y = Math.sin(rotation) * this.MAX_SPEED;
			/*(if(zombieFriend.y > this.target.y)
				zombieFriend.body.velocity.y = this.MAX_SPEED;//Math.sin(rotation) * this.MAX_SPEED;*/
			//zombieFriend.body.acceleration.x = Math.cos(rotation) * this.ACCEL;
			//zombieFriend.body.acceleration.y = Math.sin(rotation) * this.ACCEL;
		} 
		else
		{
			zombieFriend.body.velocity.setTo(0, 0);
			//zombieFriend.body.acceleration.x = 0;
		}
	}
	
	this.ladder = function()
	{
		if(rightKey.isDown)
			this.goright = true;
		else if(leftKey.isDown)
			this.goleft = true;
		
		if(this.stacked === false)
		{
			//console.log("Not stacked, disabling gravity and finding wall");//debug
			this.zombies.forEachAlive(this.zombies.setProperty, this.zombies, 'enableGravity', false, 0, true);
			this.zombies.forEachAlive(this.findWall, this, this.goright, this.goleft);
		}
		this.zombies.forEachAlive(this.growTall, this);
		
		this.goright = false;
		this.goleft = false;
	}
	
	this.findWall = function(zombieFriend, goright, goleft)
	{
		if(goright)//move right and stack
		{
			zombieFriend.body.velocity.x = this.MAX_SPEED;
			//this.game.physics.arcade.collide(zombieFriend, layer, this.growTall, null, this);
		}
		else if(goleft)//move right and stack
		{
			zombieFriend.body.velocity.x = -this.MAX_SPEED;
			//this.game.physics.arcade.collide(zombieFriend, layer, this.growTall, null, this);
		}
		else
		{}//wait?
		
		//this.game.physics.arcade.collide(zombieFriend, layer, this.growTall, null, this);
	}
	
	this.growTall = function(zombieFriend)//, layer)//accepts two for collide
	{
		//console.log("In growTall");
		if(zombieFriend.body.onWall())
		{
			//zombieFriend.holderval = zombieFriend.body.y;
			zombieFriend.stacked = true;
			//console.log("I am onWall()");
			zombieFriend.body.velocity.x = 0;
			//zombieFriend.body.velocity.y = this.game.gravity.y+(32*this.zombies.getIndex(zombieFriend));
			zombieFriend.body.enableGravity= false;
			zombieFriend.body.y = zombieFriend.body.y-(32*this.zombies.getIndex(zombieFriend));
			zombieFriend.holderval = zombieFriend.body.y;
			this.stacked = true;
		}
		else if(zombieFriend.stacked === true)
		{
			//console.log("I am stacked!");
			zombieFriend.body.y = zombieFriend.holderval;
		}
	}
};

function newHume(game)
{
	var xcoord, ycoord;
	
	xcoord = game.rnd.integerInRange(16, 3184);
	ycoord = game.rnd.integerInRange(16, 3184);
	
	var hume = new Human(game, xcoord, ycoord);//game.add.sprite(xcoord, ycoord, 'yellowBlock');
	game.physics.enable(hume, Phaser.Physics.ARCADE);
	while(game.physics.arcade.collide(hume, layer) || game.physics.arcade.collide(hume, player) || game.physics.arcade.collide(hume, humans))
	{
		xcoord = game.rnd.integerInRange(16, 3184);
		ycoord = game.rnd.integerInRange(16, 3184);
		hume.kill();
		hume.reset(xcoord, ycoord);
	}
	
	return hume;
};

/*function ZombieFriend(game, xcoord, ycoord, horde)
{
	this.game = game;
	this.target = horde.target;
	this.sprite = this.game.add.sprite(xcoord, ycoord, 'purpleBlock');
	
	
	this.update = function()
	{
		
	}
}*/