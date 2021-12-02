// 3rd party library imports
import * as Tone from "tone";
import classNames from "classnames";
import { List, Range } from "immutable";
import React, { FC, useEffect, useState } from "react";
import { Instrument, InstrumentProps } from "../../Instruments";
import { useStartPlayer } from "../../hooks/useStartPlayer";
import violin from "../../img/violin2.png";

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
        width: "1rem",
        height: "2rem",
        marginLeft: "10rem",
        borderRadius: "25%",
        backgroundColor: "white",
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
  const aList = List([
    { note: "A" },
    // { note: "D" },
    // { note: "E" },
    // { note: "G" },
  ]);
  const dList = List([ { note: "D"}]);
  const eList = List([ { note: "E"}]);
  const gList = List([ { note: "G"}]);
  const [sampler, setSampler] = useState(
    new Tone.Sampler({
      urls: {
        A1: "A.mp3",
        D1: "D.mp3",
        E1: "E.mp3",
        G1: "G.mp3",
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
      <div style={{ backgroundImage:`url(${violin})`, width:"90%", padding:"13.5rem"}}>
        <div style={{ display: "flex", flexDirection: "row-reverse", padding: "2rem", position: "absolute", marginTop: "-7rem", marginLeft: "-18rem"}}>
        <h1 style={{ marginLeft: "20rem", fontSize:"large", marginTop:"2rem"}}> A</h1>
          {Range(0,5).map((octave) =>
            aList.map((key) => {
              const note = `${key.note}${octave}`;
              return (
                <Vdao182Block key={note} note={note} sampler={sampler}>
                  {/* {note} */}
                </Vdao182Block>
              );
            })
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "row-reverse", padding: "2rem", position: "absolute", marginTop: "-4rem", marginLeft: "-18rem"}}>
        <h1 style={{ marginLeft: "20rem", fontSize:"large", marginTop:"1rem"}}> D</h1>
          {Range(0, 5).map((octave) =>
            dList.map((key) => {
              const note = `${key.note}${octave}`;
              return (
                <Vdao182Block key={note} note={note} sampler={sampler}>
                  {/* {note} */}
                </Vdao182Block>
              );
            })
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "row-reverse", padding: "2rem", position: "absolute", marginTop: "-1rem", marginLeft: "-18rem"}}>
        <h1 style={{ marginLeft: "20rem", fontSize:"large", marginTop:"-0.25rem"}}> E</h1>
          {Range(0, 5).map((octave) =>
            eList.map((key) => {
              const note = `${key.note}${octave}`;
              return (
                <Vdao182Block key={note} note={note} sampler={sampler}>
                  {/* {note} */}
                </Vdao182Block>
              );
            })
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "row-reverse", padding: "2rem", position: "absolute", marginTop: "2rem", marginLeft: "-18rem"}}>
        <h1 style={{ marginLeft: "20rem", fontSize:"large", marginTop:"-1.5rem"}}> G</h1>
          {Range(0, 5).map((octave) =>
            gList.map((key) => {
              const note = `${key.note}${octave}`;
              return (
                <Vdao182Block key={note} note={note} sampler={sampler}>
                  {/* {note} */}
                </Vdao182Block>
              );
            })
          )}
                  

        </div>
      </div>
    </div>
  );
};

export const Vdao182Instrument = new Instrument("Vdao182", Vdao182);
