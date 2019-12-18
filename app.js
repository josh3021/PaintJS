var canvas = document.getElementById('jsCanvas');
var ctx = canvas.getContext('2d');
var colors = document.getElementsByClassName('jsColors');
var range = document.getElementById('jsRange');
var mode = document.getElementById('jsMode');
var INITIAL_COLOR = '#2C2C2C';
var CANVAS_SIZE = 400;
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
var painting = false;
var mouse = false;
var filling = false;
function handleMouseMove(event) {
    var x = event.offsetX;
    var y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
    else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}
function handleMouseEnter(event) {
    if (painting) {
        var x = event.offsetX;
        var y = event.offsetY;
        ctx.beginPath();
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}
function handleMouseLeave() {
    if (mouse) {
        painting = true;
    }
    else {
        painting = false;
    }
    ctx.stroke();
}
function setPaintingFalse() {
    painting = false;
    mouse = false;
}
function startPainting() {
    painting = true;
    mouse = true;
}
function stopPainting() {
    setPaintingFalse();
}
function handleChangeColor(event) {
    var color = event.currentTarget.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}
function handleChangeSize(event) {
    ctx.lineWidth = event.target.value;
}
function handleMode() {
    if (filling) {
        mode.innerText = 'Fill';
    }
    else {
        mode.innerText = 'Paint';
        ctx.fillStyle = ctx.strokeStyle;
    }
    filling = !filling;
}
function handleCanvasClick() {
    if (filling)
        ctx.fillRect(0, 0, canvas.width, canvas.height);
}
if (canvas) {
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseenter', handleMouseEnter);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('click', handleCanvasClick);
}
Array.from(colors).forEach(function (color) {
    return color.addEventListener('click', handleChangeColor);
});
if (range)
    range.addEventListener('input', handleChangeSize);
if (mode)
    mode.addEventListener('click', handleMode);
