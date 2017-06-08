//spawns with a target.
//aimed at target, never adjusts coarse.
//disappears after so many ticks
function Bullet(x,y, target){
	this.x = x;
	this.y = y;
	this.imageString = "bullet.png";
	this.maxSpeed = 10;
	this.magnitude = 0;  
	this.direction = Math.floor(Math.random()*360)* (Math.PI / 180);
	this.width = 0;
	this.height = 0;
	this.lifespan = 50; //bullets don't travel forever.
	this.target = target;
	
	this.render = function(context){
		addImageTag(this.imageString)
		var img=document.getElementById(this.imageString);
		this.width = img.width;
		this.height = img.height;
		context.drawImage(img,this.x,this.y,this.width,this.height);
	}
	
	
	//move a speed in a direction.
	this.move = function(canvas){
		//console.log("Before moving: " + this.x + "," +this.y + " Magnitude is: " + this.magnitude + " Direction is: " + this.direction);
		this.x = this.x + this.magnitude * Math.cos(this.direction);
		this.y = this.y + this.magnitude * Math.sin(this.direction);
		//console.log("After moving: " + this.x + "," +this.y);
	}
	
	//set constant vector to target.
	this.fire = function(){
		var dx = this.target.x - this.x;
		var dy = this.target.y - this.y;
		this.direction = Math.atan2(dy,dx);
		this.magnitude = this.maxSpeed;
	}
	
	
	this.hit = function(monsters, monster, bullets){
		//console.log("direct hit!!!");
		removeFromArray(monsters, monster); 
		removeFromArray(bullets, this);
	}
	
	this.attackable = function(monster){
		var a = monster.x - this.x
		var b = monster.y - this.y
		var dist = Math.sqrt( a*a + b*b );
		return Math.abs(dist) < this.width;
	}
	
	this.checkHit = function(monsters,bullets){
		for(var i = 0; i<monsters.length; i++){
			if(this.attackable(monsters[i])){
				this.hit(monsters, monsters[i], bullets);
				//return;  //if i return here, no splash damage.
			}
		}
	}
	
	
	this.tick = function(canvas, monsters, bullets){
		if(this.lifespan < 0){
			//console.log("dying from lack of count")
			removeFromArray(bullets, this);
		}
		this.lifespan += -1;
		if(this.magnitude == 0){
			this.fire();
		}
		this.move(canvas);
		this.checkHit(monsters,bullets);

	}
	
	
}