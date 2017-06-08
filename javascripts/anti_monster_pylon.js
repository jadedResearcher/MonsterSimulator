function AntiMonsterPylon(x,y, default_count){
	this.x = x;
	this.y = y;
	this.width = 0;
	this.height = 0;
	this.default_count = default_count;
	this.imageString = "spiro.png";	
	
	this.render = function(context){
		addImageTag(this.imageString)
		var img=document.getElementById(this.imageString);
		this.width = img.width;
		this.height = img.height;
		context.drawImage(img,this.x,this.y,this.width,this.height);
	}
	
	this.withinMyX = function(x){
		return (x < (this.x + this.width) && x > this.x);
	}
	
	this.withinMyY = function(y){
		return (y < (this.y + this.height) && y > this.y);
	}
	
	this.insideMe = function(monster){
		if(this.withinMyX(monster.x) && this.withinMyY(monster.y)){
			return true;
		}
	}
	
	this.spawnAntiMonster = function(x,y, anti_monsters){
		//console.log("pylon spawning antimonster");
		anti_monsters.push(new AntiMonster(x,y,this.default_count));
	}
	
	//possibly only spawn monsters every x seconds???
	this.tick = function(monsters, anti_monsters){
		for(var i = 0; i<monsters.length; i++){
			var monster = monsters[i];
			if(this.insideMe(monster)){
				//console.log("removing monster");
				removeFromArray(monsters, monster);
				this.spawnAntiMonster(monster.x, monster.y, anti_monsters);
				return; //only convert one monster per tick
			}
		}
		
	}
}