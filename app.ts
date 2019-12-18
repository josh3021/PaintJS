const canvas = <HTMLCanvasElement>document.getElementById('jsCanvas');
const ctx = <CanvasRenderingContext2D>canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColors');
const range = <HTMLElement>document.getElementById('jsRange');
const mode = <HTMLElement>document.getElementById('jsMode');

const INITIAL_COLOR = '#2C2C2C';
const CANVAS_SIZE = 400;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

interface ArrayConstructor {
  from(arrayLike: any, mapFn?: any, thisArg?: any): Array<any>;
}

let painting: boolean = false;
let mouse: boolean = false;
let filling: boolean = false;

function handleMouseMove(event: { offsetX: number; offsetY: number }) {
  const x = event.offsetX;
  const y = event.offsetY;

  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleMouseEnter(event: { offsetX: any; offsetY: any }) {
  if (painting) {
    const x = event.offsetX;
    const y = event.offsetY;

    ctx.beginPath();
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleMouseLeave() {
  if (mouse) {
    painting = true;
  } else {
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

function handleChangeColor(event: {
  currentTarget: {
    style: {
      backgroundColor: any;
    };
  };
}) {
  const color = event.currentTarget.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleChangeSize(event: any) {
  ctx.lineWidth = event.target.value;
}

function handleMode() {
  if (filling) {
    mode.innerText = 'Fill';
  } else {
    mode.innerText = 'Paint';
    ctx.fillStyle = ctx.strokeStyle;
  }
  filling = !filling;
}

function handleCanvasClick() {
  if (filling) ctx.fillRect(0, 0, canvas.width, canvas.height);
}

if (canvas) {
  canvas.addEventListener('mousemove', handleMouseMove);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseenter', handleMouseEnter);
  canvas.addEventListener('mouseleave', handleMouseLeave);
  canvas.addEventListener('click', handleCanvasClick);
}

Array.from(colors).forEach((color) =>
  color.addEventListener('click', handleChangeColor),
);
if (range) range.addEventListener('input', handleChangeSize);
if (mode) mode.addEventListener('click', handleMode);
