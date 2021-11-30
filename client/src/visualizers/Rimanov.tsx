<<<<<<< HEAD:client/src/visualizers/Rimanov.tsx
// 3rd party library imports
import P5 from "p5";
import * as Tone from "tone";

// project imports
import { Visualizer } from "../Visualizers";
let symmetry = 6;
let angle = 360 / symmetry;

export const RimanovVisualizer = new Visualizer(
  "Rimanov Visualizer",
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    p5.background('orange');
    p5.noStroke();
    p5.translate(width / 2, height / 2);
    p5.noiseDetail(2, 1);

    const values = analyzer.getValue();


    p5.translate(width / 100, height / 100);
    p5.rotate(p5.frameCount * 0.04);
    for (let i = 0; i < 750; i++) {
      let amplitude = values[p5.floor(p5.map(i, 0, values.length, 0, 1))] as number;
      p5.push();
      p5.rotate(p5.radians(i));
      let maxHeight = p5.map(i, 0, values.length, 0, width / 13);
      let y = p5.map(amplitude / 2, -1, 1, 1, maxHeight);

      p5.stroke(0, 0, 100, 10);
      p5.line(0, 0, 0, y);

      let x = p5.map(amplitude / 2, -1, 0, 0, 0);
      p5.fill('maroon');
      p5.ellipse(x, y, 10, 50);
      p5.pop();
    }
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
    p5.noiseDetail(2,1);
    p5.angleMode('degrees');
    const values = analyzer.getValue();
    const space = 0.08;
    for (let i = 0; i < 360; i+=space) {
      const index = p5.floor(p5.map(i, 0, values.length , 0, 180));
      let amplitude = values[index] as number;
      const xoff = p5.map(p5.cos(amplitude), -1, 1, 0, 3);
      const yoff = p5.map(p5.sin(amplitude), -1, 1, 0, 3);
      const n = p5.noise(xoff * i * amplitude , yoff * i * amplitude);
      const h = p5.map(n, 0, 1, -100, 100);
      const r = p5.map(p5.sin(i), -1, 1, 100,200);
      const g = p5.map(h, -150, 150, 0, 150);
      const b = p5.map(n, 0, 1, 150, 255);
      p5.rotate(space);
      p5.fill(r, g, b);
      p5.rect(200, 0, h, 1);
    }


    /* circle sin visualizer*/
    // const dim = Math.min(width, height);
    // p5.strokeWeight(dim * 0.025);
    // p5.background(0, 0, 0, 255);
    // p5.stroke("purple");
    // p5.noFill();
    // p5.angleMode('degrees');
    // p5.translate(width/2, height/2);
    // const values = analyzer.getValue();
    // for (let t = -1; t <= 1; t += 2) {
    //   p5.beginShape();
    //   for (let i = 0; i <= 180; i += 0.5) {
    //     const index = p5.floor(p5.map(i, 0, 180, 0, values.length - 1));
    //     const amplitude = values[index] as number;
    //     const r = p5.map(amplitude, -1, 1, 150, 300);
    //     const x = r * p5.sin(i) * t;
    //     const y = r * p5.cos(i);
    //     // Place vertex
    //     p5.vertex(x, y);
    //   }
    //   p5.endShape();
    // }
  }
);
<<<<<<< HEAD:client/src/visualizers/Rimanov.tsx
>>>>>>> d8e93d0 (visualizer simi done Kappa):client/src/visualizers/Xwen3.tsx
=======

>>>>>>> 4d22316 (visualizer done):client/src/visualizers/Xwen3.tsx
