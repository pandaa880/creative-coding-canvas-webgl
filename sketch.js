const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

const settings = {
  dimensions: [2048, 2048],
  // pixelsPerInch: 300
};

const sketch = () => {

  const colorCount = random.rangeFloor(2, 6);
  // take the random color palette
  const palette = random.shuffle(random.pick(palettes))
    .slice(0, colorCount);

  // create the grid
  const createGrid = () => {
    const points = []; // dimension points for grid
    const count = 30; // count for x * x grid

    for (let x = 0 ; x < count ; x++) {
      for (let y = 0 ; y < count ; y++) {
        // taking the number between 0 to 1 for pixel coordinates
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);

        // create noise
        const radius = Math.abs(random.noise2D(u, v)) * 0.06;
        
        points.push(
          {
            color: random.pick(palette),
            stroke: random.pick(palette),
            radius,
            rotation: random.noise2D(u, v),
            position:[u, v]
          }
        );
      }
    }

    return points;
  }

  // call the function
  const points = createGrid().filter(() => random.value() > 0.5);
  // set the margin
  const margin = 200;

  return ({ context, width, height }) => {
    context.fillStyle = '#FFFBFA';
    context.fillRect(0, 0, width, height);

    // loop through the coordinates points
    points.forEach(({ text,stroke, color,radius, rotation, position: [u, v]}) => {
      
      // scale up the values so we get pixel coordinates as out canvas dimension
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin , height - margin, v);
      
      // start drawing the circle
      // context.beginPath();
      // context.arc(x, y, radius * width, 0, Math.PI * 2, false);
      // context.fillStyle = color;
      // context.fill();
      // context.lineWidth = 10;
      // context.strokeStyle = stroke;
      // context.stroke();

      context.save();
      context.fillStyle = color;
      context.font = `${radius * width + 50}px "Helvetica"`;
      context.translate(x, y);
      context.rotate(rotation);
      context.fillText('💩', 0, 0);
      context.restore();
    })
  };
};

canvasSketch(sketch, settings);
