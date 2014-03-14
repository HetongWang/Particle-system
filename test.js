// creat snake Object
var snake = {
	x[1] : 10,
	y[1] : 10,
	len : 1
};
var apple = {
	x : 5,
	y : 5,
	creat : function() {
		function random(n) {
			return Math.floor(Math.random() * n + 1);
		}
		this.x = random(canvas.width / Unit);
		this.y = random(canvas.height / Unit);
	}
};
var speed = 500,
		drawFlag = 0;

function config() {
	setTimeout(controller(),speed);
	// g.fillRect(Unit, Unit, Unit, Unit); //test code
}

function controller() {
	drawFlag = 0;
	function move(e) {
		if (drawFlag == 0) {
			if (e.keycode == 37)			
				snake.x[1]--;
			else if (e.keycode == 38)
				snake.y[1]--;
			else if (e.keycode == 39)
				snake.x[1]++;
			else if (e.keycode == 40)
				snake.y[1]++; 
			drawFlag = 1;
		}
	}
	document.addEventListener("keydown", move, false);
}

function view() {
	var canvas = document.getElementById("canvas"),
			g = canvas.getContext("2d");
	var Unit = 25;
	canvas.width = 800; //32 colum
	canvas.height = 600; //24 row 
	// transform coordinate to px
	function toRealxy(n) {
		return n * Unit;
	}

	// draw Snakes
	function drawSnakes() {

	}
}