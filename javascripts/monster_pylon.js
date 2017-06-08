function MonsterPylon(x,y){
	this.x = x;
	this.y = y;
	this.width = 0;
	this.height = 0;
	this.imageString = "pentagram.png";	
	
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
	
	this.insideMe = function(human){
		if(this.withinMyX(human.x) && this.withinMyY(human.y)){
			return true;
		}
	}
	
	this.spawnMonsters = function(x,y, monsters){
		var templateMonster = new Monster(x,y);
		monsters.push(templateMonster);
		for(var i = 0; i<(templateMonster.monstersPerHuman-1); i++){
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
	
	//if a human is inside me, remove it, add ten monsters.
	this.tick = function(humans, monsters){
		if(monsters.length == 0){
			//console.log("drawing a human towards me.")
			humans[0].beDrawnTowards(this);
		}
		for(var i = 0; i<humans.length; i++){
			var human = humans[i];
			if(this.insideMe(human)){
				removeFromArray(humans, human);
				this.spawnMonsters(human.x, human.y, monsters);
			}
		}
		
	}
}