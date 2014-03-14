// Data parts Start
var snake = {
	x : [10],
	y : [10],
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
		moveFlag = 0;

// Code parts Start
function config() {
	setTimeout("controller()",speed);
	// g.fillRect(Unit, Unit, Unit, Unit); //test code
}


function controller() {
	moveFlag = 0;
	// deal the movement of snake
	function move(e) {
		if (moveFlag == 0) {
			if (e.keycode == 37)			
				snake.x[0]--;
			else if (e.keycode == 38)
				snake.y[0]--;
			else if (e.keycode == 39)
				snake.x[0]++;
			else if (e.keycode == 40)
				snake.y[0]++; 
			// if snake eat apple
			if (snake.x[0] == apple.x && snake.y[0] == apple.y) {
				snake.len++;
				apple.creat();
			}
			// 
			for (var i = 1; i < snake.len; i++)
			{
				snake.x[i] = snake.x[i-1];
				snake.y[i] = snake.y[i-1];
			}
			moveFlag = 1;
		}
	}
	view();
	document.addEventListener("keypress", move, false);
	setTimeout("controller()",speed);
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
	(function() {
		g.fillStyle = "#000";
		for (var i = 0; i < snake.len; i++) {
			g.fillRect(toRealxy(snake.x[i]), toRealxy(snake.y[i]), Unit, Unit);
		}
	})();

	// draw Apple
	(function() {
		g.fillStyle = "#f00";
		g.fillRect(toRealxy(apple.x), toRealxy(apple.y), Unit, Unit);
	})();
}