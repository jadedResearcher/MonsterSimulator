//will eventually chase humans.
//should be faster than a human?
function AntiMonster(x,y, count){
	this.x = x;
	this.y = y;
	this.imageString = "anti_monster.png";
	this.maxSpeed = 6;
	this.visibleRange = 100;
	this.attackRange = 10;
	this.magnitude = 1;  
	this.direction = Math.floor(Math.random()*360)* (Math.PI / 180);
	this.width = 0;
	this.height = 0;
	this.count = count; //goes down each time you spawn, and your child inherits it.
	
	this.render = function(context){
		addImageTag(this.imageString)
		var img=document.getElementById(this.imageString);
		this.width = img.width;
		this.height = img.height;
		context.drawImage(img,this.x,this.y,this.width,this.height);
	}
	
	//wrap around
	this.constrain = function(canvas){
		if(this.x > canvas.width){
			this.x = 0;
			//this.direction = -1* this.direction;
		}
		if(this.x < 0-this.width ){
			this.x = canvas.width;
			//this.direction = -1* this.direction;
		}
		if(this.y > canvas.height){
			this.y = 0;
			//this.direction = -1* this.direction;
		}
		if(this.y < 0-this.height ){
			this.y = canvas.height;
			//this.direction = -1* this.direction;
		}
	}
	
	//move a speed in a direction.
	this.move = function(canvas){
		//console.log("Before moving: " + this.x + "," +this.y + " Magnitude is: " + this.magnitude + " Direction is: " + this.direction);
		this.x = this.x + this.magnitude * Math.cos(this.direction);
		this.y = this.y + this.magnitude * Math.sin(this.direction);
		//console.log("After moving: " + this.x + "," +this.y);
		this.constrain(canvas);
	}
	
	this.visible = function(monster){
		var a = monster.x - this.x
		var b = monster.y - this.y
		var dist = Math.sqrt( a*a + b*b );
		return Math.abs(dist) < this.visibleRange;
	}
	
	this.attackable = function(monster){
		var a = monster.x - this.x
		var b = monster.y - this.y
		var dist = Math.sqrt( a*a + b*b );
		return Math.abs(dist) < this.attackRange;
	}
	

	//magnitude and direction dependant on where humans are and how many
	this.think = function(monsters, anti_monsters){
		//this.wander();
		if(!this.chase(monsters, anti_monsters)){
			this.wander();
		}
		
	}
	
	this.chase = function(monsters, anti_monsters){
		//all visible humans affect my magnitude and direction.
		//move towards "center of mass" of visible humans.
		//console.log("chase");
		var angles = 0;
		var magnitudes = 0;
		var num_monsters = 0;
		for(var i = 0; i<monsters.length; i++){
			var monster = monsters[i]
			if(this.visible(monster)){ //don't chase a human you just attacked.
				if(this.attackable(monster)){
					this.attack(monsters ,monster, anti_monsters);
					return false; //don't chase AND attack in same turn.
				}else{
					//ah, i see, finding dx dy like this translates everything kinda to the origin
					//and then atan2 lets me find the angle between the point dx,dy and the x axis.
					//if human is at 5,10 and monsters at 10,5 :
					//doing human first gives me a point of " what is the angle of something 5 to the left of me(or the origin) and 5 above me (or the origin)"
					//doing it backwards (monster - human) would get me the answer from the humans persepective (five below, five right) which isn't what i'm asking		var dx =  human.x - this.x;
					var dx = monster.x - this.x;
					var dy = monster.y - this.y;
					angles +=Math.atan2(dy,dx);
					var a = dx;
					var b = dy;
					magnitudes+=  Math.sqrt( a*a + b*b );
					num_monsters ++;
				}
			}
		}
		if(num_monsters == 0){
			return false;
		}else{
			this.direction = angles/num_monsters;
			this.magnitude = Math.min(this.maxSpeed, magnitudes/num_monsters);
			return true;
		}		
	}
	
	this.attack = function(monsters, monster, anti_monsters){
		//console.log("Attacking: ");
		//console.log(human);
		this.spawnAntiMonster(monster.x, monster.y, anti_monsters); 
		removeFromArray(monsters, monster); 
		
	}
	
	this.spawnAntiMonster = function(x,y, anti_monsters){
		//experimenting with different spawn algorithms
		this.count += -2;
		anti_monsters.push(new AntiMonster(x,y, this.count+1));
	}
	
	this.wander = function(){
		//console.log("wander");
		if(Math.random()*100 > 80){
			this.magnitude = Math.floor(Math.random()*this.maxSpeed);
			this.direction = Math.floor(Math.random()*360)* (Math.PI / 180);
		}
	}
	
	this.tick = function(canvas, monsters, anti_monsters){
		if(this.count < 0){
			//console.log("dying from lack of count")
			removeFromArray(anti_monsters, this);
		}
		this.think(monsters, anti_monsters);
		this.move(canvas);
	}
	
	
}