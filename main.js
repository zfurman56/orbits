function animate() {
	renderer.render(stage);
}

window.onload = function() {

	// setup the canvas
	renderer = new PIXI.CanvasRenderer(800, 600);
	document.getElementById('container').appendChild(renderer.view);
	stage = new PIXI.Stage();

	var graphics = new PIXI.Graphics();

	// set a fill and line style
	characterGenerator.beginFill(0xffffff);
	characterGenerator.lineStyle(10, 0xffffff, 0);
	
	// draw a shape
	characterGenerator.moveTo(100, 100);
	characterGenerator.lineTo(130, 180);
	characterGenerator.lineTo(100, 170);
	characterGenerator.lineTo(70, 180);
	characterGenerator.endFill();

    // turn character graphic into sprite
	characterGenerator.boundsPadding = 0;
	var texture = characterGenerator.generateTexture();
	rocket = new PIXI.Sprite(texture);

	stage.addChild(rocket);

	requestAnimationFrame(animate);

}