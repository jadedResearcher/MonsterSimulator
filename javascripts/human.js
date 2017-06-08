//humans spawn somewhere, and then wander around.
//eventually, will run from monsters.
//TODO refactor out behavior monsters and humans have in common (wandering, chasing, fleeing, looking)
//put in "parent" class
function Human(x,y){
	this.x = x;
	this.y = y;
	this.imageString = "human.png";
	this.magnitude = 1;  //angle in radians??
	this.direction = Math.floor(Math.random()*360)* (Math.PI / 180);;
	this.maxSpeed = 5;
	this.visibleRange = 100;
	this.width = 0;
	this.height = 0;
	
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
		this.x = this.x + this.magnitude * Math.cos(this.direction);
		this.y = this.y + this.magnitude * Math.sin(this.direction);
		this.constrain(canvas);
	}
	
	//magnitude and direction dependant on where humans are and how many
	this.think = function(monsters){
		if(!this.flee(monsters)){
			this.wander();
		}
	}
	
	this.beDrawnTowards = function(pylon){
		var dx =  pylon.x - this.x;
		var dy =  pylon.y - this.y;
		this.angle =  Math.atan2(-1*dy,-1*dx);
		this.magnitude = this.maxSpeed;
	}
	
	this.wander = function(){
		//console.log("wander");
		if(Math.random()*100 > 90){
			this.magnitude = Math.floor(Math.random()*this.maxSpeed);
			this.direction = Math.floor(Math.random()*360)* (Math.PI / 180);
		}
	}
	
	this.visible = function(monster){
		var a = monster.x - this.x
		var b = monster.y - this.y
		var dist = Math.sqrt( a*a + b*b );
		return Math.abs(dist) < this.visibleRange;
	}
	
	
	this.flee = function(monsters){
		//console.log("flee");
		//all visible monsters affect my magnitude and direction.
		//move away from "center of mass" of visible monsters.
		var angles = 0;
		var magnitudes = 0;
		var num_monsters = 0;
		for(var i = 0; i<monsters.length; i++){
			var monster = monsters[i]
			if(this.visible(monster)){
				//see monster for atan2 explantation
				var dx =  monster.x - this.x;
				var dy =  monster.y - this.y;
				angles +=  Math.atan2(-1*dy,-1*dx);
				var a = dx;
				var b = dy;
				magnitudes+= Math.sqrt( a*a + b*b );
				num_monsters ++;
			}
		}
		if(num_monsters == 0){
			return false;
		}else{
			//console.log("fleeing")
			this.direction = angles/num_monsters;
			this.magnitude = Math.min(this.maxSpeed, magnitudes/num_monsters);
			return true;
		}
		
	}
	
	this.tick = function(canvas, monsters){
		//if you move before you think, a monster pylon can "possess" you and make you go to the pylon.
		this.move(canvas);
		this.think(monsters);
		//this.move(canvas);
	}
}