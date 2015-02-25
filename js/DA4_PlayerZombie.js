function newPlayer(game, xcoord, ycoord)
{
	this.game = game;
	this.sprite = this.game.add.sprite(xcoord, ycoord, 'redBlock');
	this.game.physics.enable(this.sprite, Phaser.Physics.P2JS);
	this.sprite.body.allowGravity = true;
	this.inAir = false;
	
	this.runRight = function()
	{
		if(this.inAir != true)
		{
			this.sprite.body.velocity.x = 100;
			//this.sprite.scale.x = 1;
		}
	}
	
	this.runLeft = function()
	{
		if(this.inAir != true)
		{
			this.sprite.body.velocity.x = -100;
			//this.sprite.scale.x = -1;
		}
	}
	
	this.jump = function()
	{
		if(this.inAir != true)
		{
			this.sprite.body.velocity.y = -100;
			this.inAir = true;
		}
	}
	
	this.hitLand = function(player, layer)//accepts two arguments for compatibility with collide
	{
		if(this.inAir === true && this.sprite.body.velocity.y > 0)
		{
			this.inAir = false;
		}
		else{}//do nothing, let idle or others take care of it
	}
	
	return this;
}