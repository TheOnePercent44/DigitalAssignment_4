function newPlayer(game, xcoord, ycoord)
{
	this.game = game;
	this.sprite = this.game.add.sprite(xcoord, ycoord, 'redBlock');
	this.game.physics.enable(this.sprite, Phaser.Physics.P2JS);
	this.sprite.body.allowGravity = true;
	this.inAir = false;
	
	this.MAX_SPEED = 500; // pixels/second
    this.ACCELERATION = 1500; // pixels/second/second
    this.DRAG = 600; // pixels/second
    //this.GRAVITY = 2600; // pixels/second/second
    this.JUMP_SPEED = -200; // pixels/second (negative y is up)
	//this.sprite.body.drag.setTo(this.DRAG, 0);
	
	this.idle = function()
	{
		this.inAir = !(this.sprite.body.touching.down);
		this.sprite.body.acceleration.x = 0;
	}
	
	this.runRight = function()
	{
		if(this.inAir != true)
		{
			//this.sprite.body.velocity.x = 100;
			this.sprite.body.acceleration.x = this.ACCELERATION;
			//this.sprite.scale.x = 1;
		}
	}
	
	this.runLeft = function()
	{
		if(this.inAir != true)
		{
			//this.sprite.body.velocity.x = -100;
			this.sprite.body.acceleration.x = -this.ACCELERATION;
			//this.sprite.scale.x = -1;
		}
	}
	
	this.jump = function()
	{
		if(this.inAir != true)
		{
			this.sprite.body.velocity.y = this.JUMPSPEED;//-100;
			this.inAir = true;
		}
	}
	
	this.hitLand = function(player, layer)//accepts two arguments for compatibility with collide
	{
		if(this.inAir === true)//&& this.sprite.body.velocity.y > 0)
		{
			this.inAir = false;
		}
		else{}//do nothing, let idle or others take care of it
	}
	
	return this;
}