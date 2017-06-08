var humans = [];
var monsters = [];
var anti_monsters = [];
var canvas;
var context;
var speed = 50;
var monsterPylon;
var anti_monsterPylons = [];
var am_default_count = 6;
var trigger_for_am_pylon = 50;


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

function spawnAMPylon(){
	anti_monsterPylons.push(spawnAMPylonAtEdgeOfCanvas(canvas, am_default_count));  
}

function spawnHumanLoop(){
	if(this.humans.length < 50){
		humans.push(spawnHumanAtEdgeOfCanvas(canvas));  
	}
	setTimeout(spawnHumanLoop, speed);
}

function renderStats(){
	$("#num_humans").html(humans.length);
	$("#num_monsters").html(monsters.length);
	$("#num_anti_monsters").html(anti_monsters.length);
}

function render(){
	renderStats();
	var context = canvas.getContext("2d");
	context.fillStyle="#aaaaaa";
	context.fillRect(0, 0, canvas.width, canvas.height);
	var tmp_canvas = getBufferCanvas();
	var tmp_context = tmp_canvas.getContext("2d");
	monsterPylon.render(tmp_context);
	
	for(var i = 0; i<anti_monsterPylons.length; i++){
		anti_monsterPylons[i].render(tmp_context);
	}
	
	for(var i = 0; i<humans.length; i++){
		humans[i].render(tmp_context);
	}
	
	for(var i = 0; i<monsters.length; i++){
		monsters[i].render(tmp_context);
	}
	
	for(var i = 0; i<anti_monsters.length; i++){
		anti_monsters[i].render(tmp_context);
	}
	
	copyTmpCanvasToRealCanvas(tmp_canvas);
	setTimeout(render, speed);
}

function tick(){
	for(var i = 0; i<humans.length; i++){
		humans[i].tick(canvas, monsters);
	}
	
	for(var i = 0; i<monsters.length; i++){
		monsters[i].tick(canvas, humans, anti_monsters, monsters);
	}
	
	for(var i = 0; i<anti_monsters.length; i++){
		anti_monsters[i].tick(canvas, monsters, anti_monsters);
	}
	
	if(monsters.length < 50){
		monsterPylon.tick(humans, monsters);
	}

	if(monsters.length > trigger_for_am_pylon || anti_monsters.length < 10){
		for(var i = 0; i<anti_monsterPylons.length; i++){
			anti_monsterPylons[i].tick(monsters, anti_monsters);
		};
	}
	
	if(monsters.length > trigger_for_am_pylon){
		spawnAMPylon();
		trigger_for_am_pylon += 10;
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