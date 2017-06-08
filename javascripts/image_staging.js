function addImageTag(url){
	//only do it if image hasn't already been added.
	if(document.getElementById(url) == null) {
		var tag = '<img id ="' + url + '" src = "images/' + url + '" style="display:none">';
		$("#image_staging").append(tag);
	}
}


