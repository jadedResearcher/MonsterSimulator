var humans = [];
var monsters = [];
var canvas;
var context;
var speed = 50;
var monsterPylon;
var towers = [];
var bullets = [];
var trigger_for_tower = 50;


window.onload = function() {
	canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    init();
};

function init(){
	monsterPylon = new MonsterPylon(canvas.width/2-50,canvas.height/2-50);
	monsters.push(new Monster(canvas.width/2-50,canvas.height/2-50));
	//anti_monsters.push(new AntiMonster(canvas.width/2-50,canvas.height/2-50,6));
	spawnHumanLoop(); 
	render(canvas);
	tick();
}

function spawnTower(){
	towers.push(spawnTowerAtEdgeOfCanvas(canvas));  
}

function spawnHumanLoop(){
	if(this.humans.length < 50){
		humans.push(spawnHumanCenter(canvas));  
	}
	setTimeout(spawnHumanLoop, speed);
}

function renderStats(){
	$("#num_humans").html(humans.length);
	$("#num_monsters").html(monsters.length);
}

function render(){
	renderStats();
	var context = canvas.getContext("2d");
	context.fillStyle="#aaaaaa";
	context.fillRect(0, 0, canvas.width, canvas.height);
	var tmp_canvas = getBufferCanvas();
	var tmp_context = tmp_canvas.getContext("2d");
	monsterPylon.render(tmp_context);
	
	for(var i = 0; i<towers.length; i++){
		towers[i].render(tmp_context);
	}
	
	for(var i = 0; i<humans.length; i++){
		humans[i].render(tmp_context);
	}
	
	for(var i = 0; i<monsters.length; i++){
		monsters[i].render(tmp_context);
	}
	
	for(var i = 0; i<bullets.length; i++){
		bullets[i].render(tmp_context);
	}
	
	copyTmpCanvasToRealCanvas(tmp_canvas);
	setTimeout(render, speed);
}

function tick(){
	for(var i = 0; i<humans.length; i++){
		humans[i].tick(canvas, monsters);
	}
	
	for(var i = 0; i<monsters.length; i++){
		//could pass bullets or towers here instead of empty array if i want them to try to dodge
		monsters[i].tick(canvas, humans, towers, monsters);
	}
	
	for(var i = 0; i<bullets.length; i++){
		bullets[i].tick(canvas, monsters, bullets);
	}
	
	if(monsters.length < 50){
		monsterPylon.tick(humans, monsters);
	}

	for(var i = 0; i<towers.length; i++){
		towers[i].tick(monsters, bullets);
	}
	
	if(monsters.length > trigger_for_tower){
		spawnTower();
		trigger_for_tower += 20; 
	}
	
	
	setTimeout(tick, speed);
}

function removeFromArray(array, value) {
	//console.log("Removing: ");
	//console.log(array);
	//console.log(value);
    var idx = array.indexOf(value);
	//sconsole.log(idx);
    if (idx !== -1) {
        array.splice(idx, 1);
    }
    return array;
}