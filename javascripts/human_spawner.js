function spawnTestHuman(){
	var x = 50; //TODO
	var y = 50; //TODO;
	return new Human(x,y);
}

function spawnHumanCenter(canvas){
	var rand = Math.random()*100;
	return new Human(canvas.width/2+rand,canvas.height/2+rand);
}
function spawnHumanAtEdgeOfCanvas(canvas){
	//return spawnTestHuman();
	var edge = Math.random()*100;
	if(edge > 75){
		return spawnWestHuman(canvas);
	}else if(edge > 50){
		return spawnEastHuman(canvas);
	}else if(edge > 25){
		return spawnNorthHuman(canvas);
	}else{
		return spawnSouthHuman(canvas);
	}
}

function spawnWestHuman(canvas){
	x = 0;
	y = Math.random()*canvas.height;
	return new Human(x,y);
}

function spawnEastHuman(canvas){
	x = canvas.width-10;
	y = Math.random()*canvas.height;
	return new Human(x,y);
}

function spawnSouthHuman(canvas){
	y = 0;
	x = Math.random()*canvas.width;
	return new Human(x,y);
}

function spawnNorthHuman(canvas){
	y = canvas.height-10;
	x = Math.random()*canvas.width;
	return new Human(x,y);
}