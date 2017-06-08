//does not move, but does shoot bullets.
//bullets are aimed AT a monster, but continue moving in same heading and velocity after spawning.
//if a bullet hits a monster, monster is dead.
//in future, different types of bullets???
function Tower(x,y){
	this.x = x;
	this.y = y;
	this.imageString = "tower.png";
	this.attackRange = 100;
	this.coolDown = 0;
	this.maxBulletsPerTick = 15;

	this.width = 0;
	this.height = 0;
	
	this.render = function(context){
		addImageTag(this.imageString)
		var img=document.getElementById(this.imageString);
		this.width = img.width;
		this.height = img.height;
		context.drawImage(img,this.x,this.y,this.width,this.height);
	}

	
	this.attackable = function(monster){
		var a = monster.x - this.x
		var b = monster.y - this.y
		var dist = Math.sqrt( a*a + b*b );
		return Math.abs(dist) < this.attackRange;
	}
	

	//magnitude and direction dependant on where humans are and how many
	this.think = function(monsters, bullets){
		//fire a bullet at the closest monster in range.
		var bulletsFired = 0;
		for(var i = 0; i<monsters.length; i++){
			if(this.attackable(monsters[i])){
				//console.log("going to fire a bullet");
				this.fire(monsters[i], bullets);
				bulletsFired ++;
				if(bulletsFired > this.maxBulletsPerTick){
					return;  //don't fire infinite bullets a tick. looks weird.
				}
			}
		}		
	}
	
	this.fire = function(target, bullets){
		//console.log("firing a bullet");
		bullets.push(new Bullet(this.x,this.y, target));
		this.coolDown = 10; //wait 10 ticks before firing again
	}

	
	

	this.tick = function(monsters, bullets){
		//console.log("tower ticking");
		if(this.coolDown < 1){
			this.think(monsters, bullets);
		}
		this.coolDown += -1;
	}
	
	
}