// 3rd party library imports
import * as Tone from "tone";
import classNames from "classnames";
import { List, Range } from "immutable";
import React, { FC, useState } from "react";
import { Instrument, InstrumentProps } from "../../Instruments";
import { useStartPlayer } from "../../hooks/useStartPlayer";
import { HarpSvg } from "./HarpSvg";

// project imports

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for CansirinInstrument.
 ** ------------------------------------------------------------------------ */
interface CanSirinBlockProps {
  note: string;
  synth?: Tone.Synth;
  sampler?: Tone.Sampler;
  height?: number;
  color?: string;
}

const CansirinBlock: FC<CanSirinBlockProps> = ({
  children,
  note,
  sampler,
  height,
  color,
}) => {
  const [shake, setShake] = useState(false);

  const animate = () => {
    // Button begins to shake
    setShake(true);

    // Buttons stops to shake after 1.5 seconds
    setTimeout(() => setShake(false), 1500);
  };

  return (
    <div>
      <p className={"bb"}>{children}</p>
      <div
        onMouseDown={() => {
          if (sampler) {
            sampler.triggerAttack(`${note}`);
            document.getElementById(note)!.classList.remove("shake");
            document.getElementById(note)!.classList.remove("white");
          }
        }}
        onMouseUp={() => {
          if (sampler) {
            sampler.triggerRelease("+0.25");
            document.getElementById(note)!.classList.add("shake");
            document.getElementById(note)!.classList.add("white");
          }
        }}
        className={classNames("ba pointer dim", {
          shake: shake,
        })}
        style={{
          width: "0.5rem",
          height: `${height}rem`,
          color: `${color}`,
          marginLeft: "0.5rem",
          backgroundColor: `${color}`,
        }}
      />
    </div>
  );
};

const Cansirin: FC<InstrumentProps> = ({ state, dispatch, notes }) => {
  const abc = [
    { note: "F", color: "black" },
    { note: "G", color: "gray" },
    { note: "A", color: "gray" },
    { note: "B", color: "gray" },
    { note: "C", color: "red" },
    { note: "D", color: "gray" },
    { note: "E", color: "gray" },
  ];
  const octaves = [3, 4, 5];
  const notesWithOctaves = octaves
    .map((octave) => {
      return abc.map((note) => {
        return { ...note, note: `${note.note}${octave}` };
      });
    })
    .flat()
    .reverse();

  const [sampler, setSampler] = useState(
    new Tone.Sampler({
      urls: {
        C5: "HarpC5.mp3",
        D2: "HarpD2.mp3",
        D4: "HarpD4.mp3",
        D6: "HarpD6.mp3",
        D7: "HarpD7.mp3",
        E1: "HarpE1.mp3",
        E3: "HarpE3.mp3",
        E5: "HarpE5.mp3",
        F2: "HarpF2.mp3",
        F4: "HarpF4.mp3",
        F6: "HarpF6.mp3",
        F7: "HarpF7.mp3",
        G1: "HarpG1.mp3",
        G3: "HarpG3.mp3",
        G5: "HarpG5.mp3",
        A2: "HarpA2.mp3",
        A4: "HarpA4.mp3",
        A6: "HarpA6.mp3",
        B1: "HarpB1.mp3",
        B3: "HarpB3.mp3",
        B5: "HarpB5.mp3",
        B6: "HarpB6.mp3",
        C3: "HarpC3.mp3", // C4: "trumpetC4.wav",
        // C5: "trumpetC5.wav",
        // C6: "trumpetC6.wav",
        // G3: "trumpetG3.wav",
        // G4: "trumpetG4.wav",
        // G5: "trumpetG5.wav",
        // "F#4": "/samples/Kick - Fsharp.wav",
        // A4: "/samples/Kick - A.wav",
        // A1: "A1.mp3",
        // A2: "HarpA2.mp3",
        // C4: "C4.mp3",
        // "D#4": "Ds4.mp3",
        // "F#4": "Fs4.mp3",
        // A4: "HarpA4.mp3",
      },
      baseUrl: "http://localhost:3000/",
    }).toDestination()
  );
  useStartPlayer(sampler, state, dispatch, notes);

  return (
    <div className={"flex flex-row pa4"}>
      <div className={"mr6"}>
        <HarpSvg />
      </div>
      {notesWithOctaves.map((note, index) => {
        return (
          <div className={"pb3 bb"}>
            <p className={"ba ma1"}>{note.note}</p>
            <CansirinBlock
              note={note.note}
              height={25 - index / 2}
              sampler={sampler}
              color={note.color}
            />
          </div>
        );
      })}
    </div>
  );
};

export const CanSirinInstrument = new Instrument("cansirin", Cansirin);
