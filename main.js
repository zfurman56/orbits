window.onload = function() {

	// Setup the canvas
	renderer = new PIXI.CanvasRenderer(800, 600);
	document.getElementById('container').appendChild(renderer.view);
	stage = new PIXI.Stage();

	var graphics = new PIXI.Graphics();

	// set a fill and line style
	graphics.beginFill(0xffffff);
	graphics.lineStyle(10, 0xffffff, 0);
	
	// draw a shape
	graphics.moveTo(100, 100);
	graphics.lineTo(130, 180);
	graphics.lineTo(100, 170);
	graphics.lineTo(70, 180);
	graphics.endFill();

	stage.addChild(graphics);

	requestAnimationFrame(animate);

	function animate() {
		renderer.render(stage);
	}
}