// 3rd party library imports
import React from "react";

// project imports
import { DispatchAction } from "./Reducer";
import { AppState } from "./State";

/** ------------------------------------------------------------------------ **
 * Contains implementation of an Instruments.
 ** ------------------------------------------------------------------------ */

export interface InstrumentProps {
  state: AppState;
  dispatch: React.Dispatch<DispatchAction>;
  name: string;
  notes: any;
  // synth: Tone.Synth;
  // setSynth: (f: (oldSynth: Tone.Synth) => Tone.Synth) => void;
  // sampler: Tone.Sampler;
  // setSampler: (f: (oldSampler: Tone.Sampler) => Tone.Sampler) => void;
}

export class Instrument {
  public readonly name: string;
  public readonly component: React.FC<InstrumentProps>;

  constructor(name: string, component: React.FC<InstrumentProps>) {
    this.name = name;
    this.component = component;
  }
}

function TopNav({ name }: { name: string }) {
  return (
    <div
      className={
        "w-100 h3 bb b--light-gray flex justify-between items-center ph4"
      }
    >
      <div>{name}</div>
    </div>
  );
}

interface InstrumentContainerProps {
  state: AppState;
  dispatch: React.Dispatch<DispatchAction>;
  instrument: Instrument;
}

export const InstrumentContainer: React.FC<InstrumentContainerProps> = ({
  instrument,
  state,
  dispatch,
}: InstrumentContainerProps) => {
  const InstrumentComponent = instrument.component;

  const notes = state.get("notes");

  return (
    <div>
      <TopNav name={instrument.name} />
      <div
        className={"bg-white absolute right-0 left-0"}
        style={{ top: "4rem" }}
      >
        <InstrumentComponent
          name={instrument.name}
          state={state}
          dispatch={dispatch}
          notes={notes}
        />
      </div>
    </div>
  );
};
