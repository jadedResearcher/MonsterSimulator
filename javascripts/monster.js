//will eventually chase humans.
//should be faster than a human?
function Monster(x,y){
	this.x = x;
	this.y = y;
	this.imageString = "monster.png";
	this.maxSpeed = 6;
	this.visibleRange = 150; //know about humans before humans know about monsters.
	this.attackRange = 10;
	this.magnitude = 1;  
	this.direction = Math.floor(Math.random()*360)* (Math.PI / 180);
	this.width = 0;
	this.height = 0;
	this.monstersPerHuman = 10; //each dead human makes 10 monsters.
	
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
	
	this.visible = function(human){
		var a = human.x - this.x
		var b = human.y - this.y
		var dist = Math.sqrt( a*a + b*b );
		return Math.abs(dist) < this.visibleRange;
	}
	
	this.attackable = function(human){
		var a = human.x - this.x
		var b = human.y - this.y
		var dist = Math.sqrt( a*a + b*b );
		return Math.abs(dist) < this.attackRange;
	}
	

	//magnitude and direction dependant on where humans are and how many
	this.think = function(humans, anti_monsters, monsters){
		//this.wander();
		
		if(!this.chase(humans, anti_monsters, monsters)){
			this.wander();
		}
		
	}
	
	this.chase = function(humans, anti_monsters, monsters){
		//all visible humans affect my magnitude and direction.
		//move towards "center of mass" of visible humans.
		//console.log("chase");
		var angles = 0;
		var magnitudes = 0;
		var num_things = 0;
		//chase humans
		for(var i = 0; i<humans.length; i++){
			var human = humans[i]
			if(this.visible(human)){ //don't chase a human you just attacked.
				if(this.attackable(human)){
					this.attack(humans ,human, monsters);
					return false; //don't chase AND attack in same turn.
				}else{
					//ah, i see, finding dx dy like this translates everything kinda to the origin
					//and then atan2 lets me find the angle between the point dx,dy and the x axis.
					//if human is at 5,10 and monsters at 10,5 :
					//doing human first gives me a point of " what is the angle of something 5 to the left of me(or the origin) and 5 above me (or the origin)"
					//doing it backwards (monster - human) would get me the answer from the humans persepective (five below, five right) which isn't what i'm asking		var dx =  human.x - this.x;
					var dx = human.x - this.x;
					var dy = human.y - this.y;
					angles +=Math.atan2(dy,dx);
					var a = dx;
					var b = dy;
					magnitudes+=  Math.sqrt( a*a + b*b );
					num_things ++;
				}
			}
		}
		
		//flee antimonsters
		for(var i = 0; i<anti_monsters.length; i++){
			var anti_monster = anti_monsters[i]
			if(this.visible(anti_monster)){ //don't chase a human you just attacked.
					var dx = anti_monster.x - this.x;
					var dy = anti_monster.y - this.y;
					angles += Math.atan2(-1*dy,-1*dx);
					var a = dx;
					var b = dy;
					magnitudes+=  Math.sqrt( a*a + b*b );
					num_things ++;
			}
		}
		if(num_things == 0){
			return false;
		}else{
			this.direction = angles/num_things;
			this.magnitude = Math.min(this.maxSpeed, magnitudes/num_things);
			return true;
		}		
	}
	
	this.attack = function(humans, human, monsters){
		//console.log("Attacking: ");
		//console.log(human);
		this.spawnMonsters(human.x, human.y, monsters); //new monsters WILL be ticked this turn...
		removeFromArray(humans, human); //TODO bug, why is human not being removed???
		
	}
	
	this.spawnMonsters = function(x,y, monsters){
		for(var i = 0; i<this.monstersPerHuman; i++){
			//don't be all clumped
			if(i%9 == 0){
				monsters.push(new Monster(x,y));
			}else if(i%9 == 1){
				monsters.push(new Monster(x+i,y));
			}else if(i%9 == 2){
				monsters.push(new Monster(x,y+i));
			}else if(i%9 == 3){
				monsters.push(new Monster(x-i,y));
			}else if(i%9 == 4){
				monsters.push(new Monster(x,y-i));
			}else if(i%9 == 5){
				monsters.push(new Monster(x-i,y-i));
			}else if(i%9 == 6){
				monsters.push(new Monster(x+i,y-i));
			}else if(i%9 == 7){
				monsters.push(new Monster(x-i,y+i));
			}else if(i%9 == 8){
				monsters.push(new Monster(x+i,y+i));
			}
		}
	}
	
	this.rememberHumanForChase = function(human){
		
	}
	
	this.wander = function(){
		//console.log("wander");
		if(Math.random()*100 > 20){
			this.magnitude = Math.floor(Math.random()*this.maxSpeed);
			this.direction = Math.floor(Math.random()*360)* (Math.PI / 180);
		}
	}
	
	
	this.tick = function(canvas, humans, anti_monsters, monsters){
		this.think(humans, anti_monsters, monsters);
		this.move(canvas);
	}
	
	
}