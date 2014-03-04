function config() {
	var canvas = document.getElementById("canvas"),
			g = canvas.getContext("2d");
	var Unit = 25;
	canvas.width = 800;
	canvas.height = 600;
	g.fillRect(Unit, Unit, Unit, Unit); //test code
}