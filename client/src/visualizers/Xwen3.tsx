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
      const xoff = p5.map(p5.cos(i), -1, 1, 0, 3);
      const yoff = p5.map(p5.sin(i), -1, 1, 0, 3);
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

