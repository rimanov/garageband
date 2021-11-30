// 3rd party library imports
import P5 from "p5";
import * as Tone from "tone";

// project imports
import { Visualizer } from "../Visualizers";
let t = 0;
export const Vdao182Visualizer = new Visualizer(
  "Vdao182 Visualizer",
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);

    p5.background("black");

    const values = analyzer.getValue();
    // make a x and y grid of ellipses
    for (let i = 0; i < values.length; i++) {
      // starting point of each circle depends on mouse position
      const amplitude = values[i] as number;
      const x = p5.map(i, 0, values.length - 1, 0, width);
      const y = 300;
      const xAngle = p5.map(i, 0, width, 10 * p5.PI, 10 * p5.PI, true);
      const yAngle = p5.map(i, 0, height, -10 * p5.PI, 4 * p5.PI, true);
      // and also varies based on the particle's location
      const angle = xAngle * (x / width) + yAngle * (y / height);

      // each particle moves in a circle
      const myX = x + 20 * p5.cos(2 * p5.PI * t + angle * amplitude);
      const myY = y + 20 * p5.sin(2 * p5.PI * t + angle * amplitude);
      p5.fill(255,204,0)
      p5.rect(200,0,p5.map(p5.noise(p5.map(p5.cos(amplitude), -1, 1, 0, 3) * i * amplitude , p5.map(p5.sin(amplitude), -1, 1, 0, 3) * i * amplitude),0,1,-100,200),10)
      p5.rotate(10)
      p5.ellipse(myX, myY, 40); // draw particle
      p5.noise(0.2,10)
    }
    t = t + 0.01;
  }
);
