function spawnTestTower(){
	var x = 50; 
	var y = 50; 
	return new Tower(x,y);
}

function spawnTowerAtEdgeOfCanvas(canvas){
	var edge = Math.random()*100;
	if(edge > 75){
		return spawnWestTower(canvas);
	}else if(edge > 50){
		return spawnEastTower(canvas);
	}else if(edge > 25){
		return spawnNorthTower(canvas);
	}else{
		return spawnSouthTower(canvas);
	}
}

function spawnRandomTower(x,y){
	var rand = Math.random()*100;
	if(rand > 60){
		return new Tower(x,y);
	}else if(rand > 40){
		return new HomingTower(x,y);
	}else if(rand > 10){
		return new FireTower(x,y);
	}else{
		return new HugeTower(x,y);
	}
}

//thanks bob (half serious for code help, half sarcastic because "giraffe")
function giraffe()
{
	return 0.25 + 0.5*Math.random()
}

function spawnWestTower(canvas){
	x = canvas.width*0.25;
	y = canvas.height * giraffe();
	return spawnRandomTower(x,y);
}

function spawnEastTower(canvas){
	x = canvas.width*0.75
	y = canvas.height * giraffe();
	return spawnRandomTower(x,y);
}

function spawnNorthTower(canvas){
	y = canvas.height * 0.25;
	x = canvas.width * giraffe();
	return spawnRandomTower(x,y);
}

function spawnSouthTower(canvas){
	y = canvas.height * 0.75;
	x = canvas.width * giraffe();
	return spawnRandomTower(x,y);
}