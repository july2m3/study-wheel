export const drawWheel = (ctx: CanvasRenderingContext2D) => {
  ctx.beginPath();
  let x = (window.innerWidth - 100) / 2;
  let y = (window.innerHeight - 100) / 2;
  let size = y;

  ctx.strokeStyle = '#00FF80';
  ctx.arc(x, y, size, 0, Math.PI * 2, true);
  ctx.stroke();
};

export const drawPicker = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
) => {
  ctx.beginPath();
  let x = (canvas.width - 100) / 2 + (window.innerHeight - 100) / 2 + 50;
  let y = canvas.height / 2 - 5;

  ctx.fillStyle = '#00FF80';
  ctx.moveTo(x, y);
  ctx.lineTo(x + 25, y + 25);
  ctx.lineTo(x + 25, y - 25);
  ctx.fill();
};

//calculate the circles points based on end angle
// see https://stackoverflow.com/questions/5300938/calculating-the-position-of-points-in-a-circle
export const drawLines = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  angle1 = 30,
  angle2 = 60,
) => {
  let x = canvas.width / 2;
  let y = canvas.height / 2;
  let r = y;

  angle1 = (-1 * angle1 * Math.PI) / 180;
  let circleX = x + r * Math.cos(angle1);
  let circleY = y + r * Math.sin(angle1);

  ctx.strokeStyle = '#00FF80';
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(circleX, circleY);
  ctx.stroke();

  angle2 = (-1 * angle2 * Math.PI) / 180;
  circleX = x + r * Math.cos(angle2);
  circleY = y + r * Math.sin(angle2);

  ctx.strokeStyle = '#00FF80';
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(circleX, circleY);
  ctx.stroke();
};

export const drawText = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  text = 'hello',
  labelX = 0,
  angle = 0,
) => {
  let x = canvas.width / 2;
  let y = canvas.height / 2;

  ctx.fillStyle = '#00FF80';
  ctx.font = '24px serif';
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle * (-Math.PI / 180));
  ctx.textAlign = 'center';
  ctx.fillText(text, labelX, 0);
  ctx.restore();
};

export const spinWheel = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  options: Array<string>,
) => {
  let angle = 0;
  let spins = Math.random() * 1000 + 3000;
  let wheelSpin: NodeJS.Timeout;

  setTimeout(() => {
    clearInterval(wheelSpin);
  }, spins);

  wheelSpin = setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawWheel(ctx);
    drawOptions(canvas, ctx, options, angle);
    drawPicker(canvas, ctx);
    angle += 5;
    if (angle >= 360) {
      angle = 0;
    }
  }, 10);
};

export const drawOptions = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  options: Array<string>,
  startAngle = 0,
) => {
  let j = 0;
  let angle = Math.trunc(360 / options.length);
  let currentAngle = startAngle;
  let oldAngle: number;

  for (let i = 1; i < options.length + 1; i++) {
    oldAngle = currentAngle;
    currentAngle = i * angle + startAngle;
    drawLines(canvas, ctx, oldAngle, currentAngle);
    drawText(canvas, ctx, options[j], 120, (currentAngle + oldAngle) / 2);
    j++;
  }
};

