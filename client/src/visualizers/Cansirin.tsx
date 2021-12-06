// 3rd party library imports
import P5 from "p5";
import * as Tone from "tone";

// project imports
import { Visualizer } from "../Visualizers";

export const CansirinVisualizer = new Visualizer(
  "Cansirin Visualizer",
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const barWidth = 20;
    p5.background(27, 61, 76, 255);
    p5.stroke(222, 209, 82, 255);
    p5.strokeWeight(3);
    p5.fill(227, 222, 94, 150);

    const values = analyzer.getValue();
    for (let i = 0; i < values.length; i++) {
      const amplitude = values[i] as number;
      const x = p5.map(i, 0, values.length - 1, 0, width);
      const y = height / 2 + amplitude * height;
      p5.rect(x + barWidth * i, height / 2 + 400, barWidth, y - 600);
    }
  }
);
