// 3rd party
import { List, Map } from "immutable";

// project dependencies
import { PianoInstrument } from "./instruments/Piano";
import { WaveformVisualizer } from "./visualizers/Waveform";
import { CansirinVisualizer } from "./visualizers/Cansirin";
import { CanSirinInstrument } from "./instruments/Cansirin/CanSirin";
import { Vdao182Visualizer } from "./visualizers/Vdao182";
import { Vdao182Instrument } from "./instruments/vdao182/Vdao182";
import { RimanovVisualizer } from "./visualizers/Rimanov";
import { RimanovInstrument } from "./instruments/rimanov/Rimanov";
import { Xwen3Instrument } from "./instruments/Xwen3/Xwen3Flute";
import { Xwen3Visualizer } from "./visualizers/Xwen3";

/** ------------------------------------------------------------------------ **
 * The entire application state is stored in AppState.
 ** ------------------------------------------------------------------------ */

/**
 * Observation: pure map (compare and contrast with impure map)
 *
 * 'instrument': Instrument
 * 'visualizer': Visualizer
 */
export type AppState = Map<string, any>;

const instruments = List([
  PianoInstrument,
  CanSirinInstrument,
  RimanovInstrument,
  Xwen3Instrument,
]);
const visualizers = List([
  WaveformVisualizer,
  CansirinVisualizer,
  RimanovVisualizer,
  Xwen3Visualizer,
]);
export const defaultState: AppState = Map<string, any>({
  instruments,
  visualizers,
});
