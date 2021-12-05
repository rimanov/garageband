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
    p5.background("orange");
    p5.translate(width / 2, height / 2);
    p5.noiseDetail(2, 1);

    const values = analyzer.getValue();

    p5.translate(width / 100, height / 100);
    p5.rotate(p5.frameCount * 0.04);
    for (let i = 0; i < 750; i++) {
      let amplitude = values[
        p5.floor(p5.map(i, 0, values.length, 0, 1))
      ] as number;
      p5.push();
      p5.rotate(p5.radians(i));
      let maxHeight = p5.map(i, 0, values.length, 0, width / 13);
      let y = p5.map(amplitude / 2, -1, 1, 1, maxHeight);

      p5.stroke(0, 0, 100, 10);
      p5.line(0, 0, 0, y);

      let x = p5.map(amplitude / 2, -1, 0, 0, 0);
      p5.fill("maroon");
      p5.ellipse(x, y, 10, 50);
      p5.pop();
    }
  }
);
