const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

const settings = {
  dimensions: [2048, 2048],
  // pixelsPerInch: 300
};

const sketch = () => {

  // take the random color palette
  const palette = random.pick(palettes);

  // create the grid
  const createGrid = () => {
    const points = []; // dimension points for grid
    const count = 30; // count for x * x grid

    for (let x = 0 ; x < count ; x++) {
      for (let y = 0 ; y < count ; y++) {
        // taking the number between 0 to 1 for pixel coordinates
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        points.push(
          {
            color: random.pick(palette),
            stroke: random.pick(palette),
            radius: Math.abs(random.gaussian()) * 0.01,
            position:[u, v]
          }
        );
      }
    }

    return points;
  }

  // set the seed for random numbers
  random.setSeed(512);
  // call the function
  const points = createGrid().filter(() => random.value() > 0.5);
  // set the margin
  const margin = 200;

  return ({ context, width, height }) => {
    context.fillStyle = '#fff';
    context.fillRect(0, 0, width, height);

    // loop through the coordinates points
    points.forEach(({ stroke, color,radius, position: [u, v]}) => {
      console.log(`U is ${u} and V is ${v} and radius is ${radius}`);
      // scale up the values so we get pixel coordinates as out canvas dimension
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin , height - margin, v);
      
      // start drawing the circle
      context.beginPath();
      context.arc(x, y, radius * width, 0, Math.PI * 2, false);
      context.fillStyle = color;
      context.fill();
      context.lineWidth = 10;
      context.strokeStyle = stroke;
      context.stroke();
    })
  };
};

canvasSketch(sketch, settings);
