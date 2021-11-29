// 3rd party library imports
import * as Tone from "tone";
import classNames from "classnames";
import { List, Range } from "immutable";
import React, { FC, useEffect, useState } from "react";
import { Instrument, InstrumentProps } from "../../Instruments";
import { useStartPlayer } from "../../hooks/useStartPlayer";

// project imports

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Vdao182Instrument.
 ** ------------------------------------------------------------------------ */
interface Vdao182BlockProps {
  note: string;
  synth?: Tone.Synth;
  sampler?: Tone.Sampler;
  active?: boolean;
}

const Vdao182Block: FC<Vdao182BlockProps> = ({
  children,
  synth,
  note,
  active,
  sampler,
}) => {
  return (
    <div
      onMouseDown={() => {
        if (sampler) {
          sampler.triggerAttack(`${note}`);
        }
        if (synth) {
          synth.triggerAttack(`${note}`);
        }
      }}
      onMouseUp={() => {
        if (sampler) {
          sampler.triggerRelease("+0.25");
        }
        if (synth) {
          synth.triggerRelease("+0.25");
        }
      }}
      className={classNames("ba pointer dim", {
        "bg-black white": active,
        "bg-white black": !active,
      })}
      style={{
        width: "2rem",
        height: "2rem",
        marginLeft: "0.25rem",
      }}
    >
      {children}
    </div>
  );
};

const Vdao182Type = ({ title, onClick, active }: any) => {
  return (
    <div
      onClick={onClick}
      className={classNames("dim pointer ph2 pv1 ba mr2 br1 fw7 bw1", {
        "b--black black": active,
        "gray b--light-gray": !active,
      })}
    >
      {title}
    </div>
  );
};

interface Vdao182Props extends InstrumentProps {
  notes: any;
}

const Vdao182: FC<InstrumentProps> = ({ state, dispatch, notes }) => {
  const abc = List([
    { note: "C" },
    { note: "D" },
    { note: "E" },
    { note: "F" },
    { note: "G" },
    { note: "A" },
    { note: "B" },
  ]);
  const [sampler, setSampler] = useState(
    new Tone.Sampler({
      urls: {
        C4: "violin_C4.wav",
        C5: "violin_C5.wav",
        C6: "violin_C6.wav",
        G4: "violin_G4.wav",
        G5: "violin_G5.wav",
        G6: "violin_G6.wav",
        // "F#4": "/samples/Kick - Fsharp.wav",
        // A4: "/samples/Kick - A.wav",
        // A1: "A1.mp3",
        // A2: "A2.mp3",
        // C4: "C4.mp3",
        // "D#4": "Ds4.mp3",
        // "F#4": "Fs4.mp3",
        // A4: "A4.mp3",
      },
      // baseUrl: "https://tonejs.github.io/audio/casio/",
      // baseUrl: "https://tonejs.github.io/audio/salamander/",
      baseUrl: "http://localhost:3000/",
    }).toDestination()
  );
  console.log(sampler, "sampler");
  useStartPlayer(sampler, state, dispatch, notes);

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row", padding: "2rem" }}>
        {Range(4, 7).map((octave) =>
          abc.map((key) => {
            const note = `${key.note}${octave}`;
            return (
              <Vdao182Block key={note} note={note} sampler={sampler}>
                {note}
              </Vdao182Block>
            );
          })
        )}
      </div>
    </div>
  );
};

export const Vdao182Instrument = new Instrument("Vdao182", Vdao182);
