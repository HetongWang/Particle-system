// creat snake Object
var snake = {
	hx : 10,
	hy : 10,
	len : 1
};
var apple = {
	x : 5,
	y : 5
}
var speed = 500;

function config() {
	setTimeout(controller(),speed);
	// g.fillRect(Unit, Unit, Unit, Unit); //test code
}

function controller() {

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

	// draw Apple
	function creatApple() {
		function random(n) {
			return Math.floor(Math.random() * n + 1);
		}
		var x = random(canvas.width / Unit),
				y = random(canvas.height / Unit);
	}
}