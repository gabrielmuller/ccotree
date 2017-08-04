var canvas = document.getElementById('graph');
var ctx = canvas.getContext('2d'); 
var holding = false;

ctx.font = '30px Arial';

var pos = 0;
var size = {
	x: 150,
	y: 100
};

function clearAll() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw(e) {
	if (holding) {
		var mousePos = getMousePos(canvas, e);
		var drawPos = {
			x: mousePos.x - size.x/2,
			y: mousePos.y - size.y/2
		};
		clearAll();
		ctx.fillStyle = 'orange';
		ctx.fillRect(drawPos.x, drawPos.y, size.x, size.y);

		ctx.fillStyle = 'black';
		ctx.fillText('Javal', drawPos.x + 40, drawPos.y + 40);
	}
}

window.addEventListener('mousemove', draw, false);
window.addEventListener('mousedown', function(e){holding = true; draw(e)}, false);
window.addEventListener('mouseup', function(){holding = false;}, false);

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	}
}


