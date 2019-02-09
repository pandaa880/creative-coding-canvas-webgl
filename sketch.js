const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');

const settings = {
  dimensions: [2048, 2048],
  // pixelsPerInch: 300
};

const sketch = () => {

  // create the grid
  const createGrid = () => {
    const points = []; // dimension points for grid
    const count = 5; // count for x * x grid

    for (let x = 0 ; x < count ; x++) {
      for (let y = 0 ; y < count ; y++) {
        // taking the number between 0 to 1 for pixel coordinates
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        points.push([u, v]);
      }
    }

    return points;
  }

  // call the function
  const points = createGrid();
  // set the margin
  const margin = 200;

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    // loop through the coordinates points
    points.forEach(([u, v]) => {
      // scale up the values so we get pixel coordinates as out canvas dimension
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin , height - margin, v);

      // start drawing the circle
      context.beginPath();
      context.arc(x, y, 100, 0, Math.PI * 2, false);
      context.fillStyle = 'orange';
      context.fill();
      context.lineWidth = 20;
      context.strokeStyle = '#46494C';
      context.stroke();
    })
  };
};

canvasSketch(sketch, settings);
