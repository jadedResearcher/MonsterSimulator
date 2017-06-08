function spawnTestAMPylon(){
	var x = 50; 
	var y = 50; 
	return new AntiMonsterPylon(x,y,6);
}

function spawnAMPylonAtEdgeOfCanvas(canvas, default_count){
	//return spawnTestHuman();
	var edge = Math.random()*100;
	if(edge > 75){
		return spawnWestAMPylon(canvas, default_count);
	}else if(edge > 50){
		return spawnEastAMPylon(canvas, default_count);
	}else if(edge > 25){
		return spawnNorthAMPylon(canvas, default_count);
	}else{
		return spawnSouthAMPylon(canvas, default_count);
	}
}

//thanks bob (half serious for code help, half sarcastic because "giraffe")
function giraffe()
{
	return 0.25 + 0.5*Math.random()
}

function spawnWestAMPylon(canvas, default_count){
	x = canvas.width*0.25;
	y = canvas.height * giraffe();
	return new AntiMonsterPylon(x,y, default_count);
}

function spawnEastAMPylon(canvas, default_count){
	x = canvas.width*0.75
	y = canvas.height * giraffe();
	return new AntiMonsterPylon(x,y, default_count);
}

function spawnNorthAMPylon(canvas, default_count){
	y = canvas.height * 0.25;
	x = canvas.width * giraffe();
	return new AntiMonsterPylon(x,y, default_count);
}

function spawnSouthAMPylon(canvas, default_count){
	y = canvas.height * 0.75;
	x = canvas.width * giraffe();
	return new AntiMonsterPylon(x,y, default_count);
}