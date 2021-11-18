// 3rd party
import { List, Map } from "immutable";

// project dependencies
import { PianoInstrument } from "./instruments/Piano";
import { WaveformVisualizer } from "./visualizers/Waveform";
import { CansirinVisualizer } from "./visualizers/Cansirin";
import { CanSirinInstrument } from "./instruments/Cansirin/CanSirin";

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

const instruments = List([PianoInstrument, CanSirinInstrument]);
const visualizers = List([WaveformVisualizer, CansirinVisualizer]);
export const defaultState: AppState = Map<string, any>({
  instruments,
  visualizers,
});
