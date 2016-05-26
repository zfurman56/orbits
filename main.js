// handle key presses
function keyboard(keyCode) {

	var key = {};
	key.code = keyCode;
	key.isDown = false;
	key.isUp = true;
	key.press = undefined;
	key.release = undefined;

	// key press
	key.down = function(event) {
		if (event.keyCode === key.code) {
			if (key.isUp && key.press) key.press();
			key.isDown = true;
			key.isUp = false;
		}
		event.preventDefault();
	};

	// key release
	key.up = function(event) {
		if (event.keyCode === key.code) {
			if (key.isDown && key.release) key.release();
			key.isDown = false;
			key.isUp = true;
		}
		event.preventDefault();
	};

	window.addEventListener(
		"keydown", key.down.bind(key), false
	);
	window.addEventListener(
		"keyup", key.up.bind(key), false
	);
	return key;

}

function animate() {
	if (up) {
		rocket.velocity.y += acceleration * (Math.sin(rocket.rotation-(Math.PI/2)));
		rocket.velocity.x += acceleration * (Math.cos(rocket.rotation-(Math.PI/2)));
	}
	if (down) {
		rocket.velocity.y += acceleration * (Math.sin(rocket.rotation-(Math.PI/2)));
		rocket.velocity.x += acceleration * (Math.cos(rocket.rotation-(Math.PI/2)));
	}
	if (left) {
		rocket.rotation -= 0.05;
	}
	if (right) {
		rocket.rotation += 0.05;
	}

    // update position with velocity
	rocket.position.y += rocket.velocity.y;
	rocket.position.x += rocket.velocity.x;

	renderer.render(stage);
	requestAnimationFrame(animate);
}

window.onload = function() {

	// setup the canvas
	renderer = new PIXI.CanvasRenderer(800, 600);
	document.getElementById('container').appendChild(renderer.view);
	stage = new PIXI.Stage();

	var characterGenerator = new PIXI.Graphics();

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

	rocket.velocity = new PIXI.Point(0, 0); // actually a vector

	rocket.anchor.x = .5
	rocket.anchor.y = .5;

	rocket.scale.x = 0.5;
	rocket.scale.y = 0.5;

    // acceleration coefficient - controls rate of acceleration
	acceleration = 1/5;

	stage.addChild(rocket);

	// listen for key presses
	var leftKey = keyboard(37),
		upKey = keyboard(38),
		rightKey = keyboard(39),
		downKey = keyboard(40);

    // store whether key is pressed
	left = false,
		up = false,
		right = false,
		down = false;

	leftKey.press = function() {
		left = true;
	}
	leftKey.release = function() {
		left = false;
	}
	upKey.press = function() {
		up = true;
	}
	upKey.release = function() {
		up = false;
	}
	rightKey.press = function() {
		right = true;
	}
	rightKey.release = function() {
		right = false;
	}
	downKey.press = function() {
		down = true;
	}
	downKey.release = function() {
		down = false;
	}

	requestAnimationFrame(animate);

}