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

function applyAcceleration(accel) {
	rocket.velocity.y += accel * (Math.sin(rocket.rotation-(Math.PI/2)));
	rocket.velocity.x += accel * (Math.cos(rocket.rotation-(Math.PI/2)));
}

// calculate gravitational force and apply it to velocity
// parameters point and mass refer to gravity-causing object
function gravity(point, mass) {

	var dx = (point.x - rocket.x);
	var dy = (point.y - rocket.y);

	var distance = Math.sqrt((Math.pow(dx, 2) + Math.pow(dy, 2)));
	var angle = Math.atan((dy/dx));

    // gravitational acceleration equation g = Gm/r^2
	var accel = (G * mass) / Math.pow(distance, 2);

	rocket.velocity.y += accel * (Math.sin(angle));
	rocket.velocity.x += accel * (Math.cos(angle));

}

function animate() {
	if (up) {
		applyAcceleration(acceleration);
	}
	if (down) {
		applyAcceleration(-acceleration);
	}
	if (left) {
		rocket.rotation -= 0.05;
	}
	if (right) {
		rocket.rotation += 0.05;
	}

	gravity(gravityNode, 10000000000000)

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

	rocket.position.x = 100;
	rocket.position.y = 100;

	rocket.scale.x = 0.5;
	rocket.scale.y = 0.5;

	stage.addChild(rocket);

    // acceleration coefficient - controls rate of acceleration
	acceleration = 1/5;

	// the gravitational constant
	G = 6.67e-11;

	var graphics = new PIXI.Graphics();
	graphics.beginFill(0xffffff);
	graphics.lineStyle(10, 0xffffff, 0);
	graphics.drawCircle(200, 200, 5);
	stage.addChild(graphics);
	gravityNode = new PIXI.Point(200, 200);

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