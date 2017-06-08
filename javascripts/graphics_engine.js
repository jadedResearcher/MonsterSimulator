function getBufferCanvas(){
	var tmp_canvas = document.createElement('canvas');
	tmp_canvas.height = canvas.height;
	tmp_canvas.width = canvas.width;
	return tmp_canvas;
}


function copyTmpCanvasToRealCanvas(tmp_canvas){
	context.drawImage(tmp_canvas, 0, 0);
}