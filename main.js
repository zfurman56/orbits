window.onload = function() {

	// Setup the canvas
	renderer = new PIXI.CanvasRenderer(800, 600);
	document.getElementById('container').appendChild(renderer.view);
	stage = new PIXI.Stage();

}