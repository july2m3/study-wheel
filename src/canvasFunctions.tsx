export const drawWheel = (ctx: CanvasRenderingContext2D) => {
  ctx.beginPath();
  const x: number = (window.innerWidth - 100) / 2;
  const y: number = (window.innerHeight - 100) / 2;
  const size: number = y;

  // ctx.strokeStyle = '#ffffff';
  ctx.arc(x, y, size, 0, Math.PI * 2, true);
  ctx.stroke();
};

export const drawPicker = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
) => {
  ctx.beginPath();
  const x: number =
    (canvas.width - 100) / 2 + (window.innerHeight - 100) / 2 + 50;
  const y: number = canvas.height / 2 - 5;

  ctx.fillStyle = '#ffffff';
  ctx.moveTo(x, y);
  ctx.lineTo(x + 25, y + 25);
  ctx.lineTo(x + 25, y - 25);
  ctx.fill();
};

//  calculate the circles points based on end angle
// see https://stackoverflow.com/questions/5300938/calculating-the-position-of-points-in-a-circle
export const drawLines = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  angle1 = 30,
  angle2 = 60,
) => {
  const x: number = canvas.width / 2;
  const y: number = canvas.height / 2;
  const r: number = y;

  const angle1Calculated: number = (-1 * angle1 * Math.PI) / 180;
  let circleX: number = x + r * Math.cos(angle1Calculated);
  let circleY: number = y + r * Math.sin(angle1Calculated);

  ctx.strokeStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(circleX, circleY);
  ctx.stroke();

  const angle2Calculated = (-1 * angle2 * Math.PI) / 180;
  circleX = x + r * Math.cos(angle2Calculated);
  circleY = y + r * Math.sin(angle2Calculated);

  ctx.strokeStyle = '#ffffff';
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
  color = 'red',
) => {
  const x: number = canvas.width / 2;
  const y: number = canvas.height / 2;

  // let textColor = colors[Math.floor(Math.random() * 5)];
  // ctx.fillStyle = '#ffffff';
  ctx.fillStyle = color;

  ctx.font = '24px serif';
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle * (-Math.PI / 180));
  ctx.textAlign = 'center';
  ctx.fillText(text, labelX, 0);
  ctx.restore();
};

export const drawOptions = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  options: Array<string>,
  colors: Array<string> = [],
  startAngle = 0,
) => {
  let j: number = 0;
  const angle: number = Math.trunc(360 / options.length);
  let currentAngle: number = startAngle;
  let oldAngle: number;

  for (let i = 1; i < options.length + 1; i++) {
    oldAngle = currentAngle;
    currentAngle = i * angle + startAngle;
    drawLines(canvas, ctx, oldAngle, currentAngle);
    drawText(
      canvas,
      ctx,
      options[j],
      120,
      (currentAngle + oldAngle) / 2,
      colors[j],
    );
    j += 1;
  }
};

export const spinWheel = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  options: Array<string>,
  colors: Array<string>,
) => {
  let angle: number = 0;
  const spins: number = Math.random() * 1000 + 3000;
  let wheelSpin: NodeJS.Timeout;

  setTimeout(() => {
    clearInterval(wheelSpin);
  }, spins);

  wheelSpin = setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawWheel(ctx);
    drawOptions(canvas, ctx, options, colors, angle);
    drawPicker(canvas, ctx);
    angle += 5;
    if (angle >= 360) {
      angle = 0;
    }
  }, 10);
};
