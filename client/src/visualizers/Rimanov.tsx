<<<<<<< HEAD:client/src/visualizers/Rimanov.tsx
// 3rd party library imports
import P5 from "p5";
import * as Tone from "tone";

// project imports
import { Visualizer } from "../Visualizers";

export const RimanovVisualizer = new Visualizer(
  "Rimanov Visualizer",
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);

    p5.background(0, 0, 0, 255);

    p5.strokeWeight(dim * 0.01);
    p5.stroke(255, 255, 255, 255);
    p5.noFill();

    const values = analyzer.getValue();
    p5.beginShape();
    for (let i = 0; i < values.length; i++) {
      const amplitude = values[i] as number;
      const x = p5.map(i, 0, values.length - 1, 0, width);
      const y = height / 2 + amplitude * height;
      // Place vertex
      p5.vertex(x, y);
    }
    p5.endShape();
  }
);
=======
// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';


export const Xwen3Visualizer = new Visualizer(
  'Xwen3Visualizer',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    p5.background(0, 0, 0, 225);
    p5.noStroke();
    p5.translate(width/2, height/2);
    //let start = 0;
    const space = 0.1;
    const values = analyzer.getValue();
    for (let i = 0; i < 360; i ++) {
      const amplitude = values[i] as number;
      const xoff = p5.map(p5.cos(i), -1, 1, 0, 3);
      const yoff = p5.map(p5.sin(i), -1, 1, 0, 3);
      const n = p5.noise(xoff, yoff);
      const h = p5.map(n, 0, 1, -150, 150);
      const r = p5.map(p5.sin(i), -1, 1, 100, 200);
      const g = p5.map(h, -150, 150, 0, 150);
      const b = p5.map(n, 0, 1, 150, 255);
      p5.rotate(amplitude);
      p5.fill(r, g, b);
      p5.rect(200, 0, h, 1);
    }
    //start += 0.005;
  }
);
>>>>>>> d8e93d0 (visualizer simi done Kappa):client/src/visualizers/Xwen3.tsx
