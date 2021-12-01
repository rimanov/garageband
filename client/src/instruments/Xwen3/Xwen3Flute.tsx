// 3rd party library imports
import * as Tone from "tone";
import classNames from "classnames";
import { List, Range } from "immutable";
import React, { FC, useEffect, useState } from "react";
import { Instrument, InstrumentProps } from "../../Instruments";
import { useStartPlayer } from "../../hooks/useStartPlayer";
import flute from "../../img/MetalFlute.jpeg";

// project imports

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Xwen3Instrument.
 ** ------------------------------------------------------------------------ */
interface Xwen3BlockProps {
  note: string;
  synth?: Tone.Synth;
  sampler?: Tone.Sampler;
  active?: boolean;
}

const Xwen3Block: FC<Xwen3BlockProps> = ({
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
        width: "25px",
        height: "25px",
        marginLeft: "3rem",
        textAlign: "center",
        color: "white",
        backgroundColor: "black",
        borderRadius: "50%"
      }}
    >
      {children}
    </div>
  );
};

const Xwen3Type = ({ title, onClick, active }: any) => {
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

interface Xwen3Props extends InstrumentProps {
  notes: any;
}

const Xwen3: FC<InstrumentProps> = ({ state, dispatch, notes }) => {
  const c = List([
    { note: "C" },
  ]);

  const g = List([
    { note: "G" },
  ]);

  const d = List([
    { note: "D" },
  ]);

  const [sampler, setSampler] = useState(
    new Tone.Sampler({
      urls: {
        C4: "fluteC4.wav",
        C5: "fluteC5.wav",
        C6: "fluteC6.wav",
        G4: "fluteG4.wav",
        G5: "fluteG5.wav",
        G6: "fluteG6.wav",
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
      <div style={{ backgroundImage: `url(${flute})`, width: "86%", padding: "1rem" }}> C Notes
        <div style={{ display: "flex", flexDirection: "row", padding: "1.5rem" }}>
          <table className="cNotes" style={{ display: "flex" }}>
            <th style={{ display: "flex", flexDirection: "row", marginLeft: "4rem" }}>
              {Range(3, 4).map((octave) =>
                c.map((key) => {
                  const note = `${key.note}${octave}`;
                  return (
                    <Xwen3Block key={note} note={note} sampler={sampler}>
                      {note}
                    </Xwen3Block>
                  );
                })
              )}
            </th>
            <th style={{ display: "flex", flexDirection: "row", marginLeft: "24.3rem" }}>
              {Range(4, 7).map((octave) =>
                c.map((key) => {
                  const note = `${key.note}${octave}`;
                  return (
                    <Xwen3Block key={note} note={note} sampler={sampler}>
                      {note}
                    </Xwen3Block>
                  );
                })
              )}
            </th>
            <th style={{ display: "flex", flexDirection: "row", marginLeft: "1.5rem" }}>
              {Range(7, 10).map((octave) =>
                c.map((key) => {
                  const note = `${key.note}${octave}`;
                  return (
                    <Xwen3Block key={note} note={note} sampler={sampler}>
                      {note}
                    </Xwen3Block>
                  );
                })
              )}
            </th>
          </table>
        </div>
        <p>G Notes</p>
        <div style={{ display: "flex", flexDirection: "row", padding: "2rem" }}> 
          <table className="gNotes" style={{ display: "flex", marginTop: "0.25rem" }}>
            <th style={{ display: "flex", flexDirection: "row", marginLeft: "3.5rem" }}>
              {Range(3, 4).map((octave) =>
                g.map((key) => {
                  const note = `${key.note}${octave}`;
                  return (
                    <Xwen3Block key={note} note={note} sampler={sampler}>
                      {note}
                    </Xwen3Block>
                  );
                })
              )}
            </th>
            <th style={{ display: "flex", flexDirection: "row", marginLeft: "24.3rem" }}>
              {Range(4, 7).map((octave) =>
                g.map((key) => {
                  const note = `${key.note}${octave}`;
                  return (
                    <Xwen3Block key={note} note={note} sampler={sampler}>
                      {note}
                    </Xwen3Block>
                  );
                })
              )}
            </th>
            <th style={{ display: "flex", flexDirection: "row", marginLeft: "1.5rem" }}>
              {Range(7, 10).map((octave) =>
                g.map((key) => {
                  const note = `${key.note}${octave}`;
                  return (
                    <Xwen3Block key={note} note={note} sampler={sampler}>
                      {note}
                    </Xwen3Block>
                  );
                })
              )}
            </th>
          </table>
        </div>
        <p>D Notes</p>
        <div style={{ display: "flex", flexDirection: "row", padding: "2rem" }}> 
          <table className="gNotes" style={{ display: "flex", marginTop: "-0.25rem" }}>
            <th style={{ display: "flex", flexDirection: "row", marginLeft: "3.5rem" }}>
              {Range(3, 4).map((octave) =>
                d.map((key) => {
                  const note = `${key.note}${octave}`;
                  return (
                    <Xwen3Block key={note} note={note} sampler={sampler}>
                      {note}
                    </Xwen3Block>
                  );
                })
              )}
            </th>
            <th style={{ display: "flex", flexDirection: "row", marginLeft: "24.3rem" }}>
              {Range(4, 7).map((octave) =>
                d.map((key) => {
                  const note = `${key.note}${octave}`;
                  return (
                    <Xwen3Block key={note} note={note} sampler={sampler}>
                      {note}
                    </Xwen3Block>
                  );
                })
              )}
            </th>
            <th style={{ display: "flex", flexDirection: "row", marginLeft: "1.5rem" }}>
              {Range(7, 10).map((octave) =>
                d.map((key) => {
                  const note = `${key.note}${octave}`;
                  return (
                    <Xwen3Block key={note} note={note} sampler={sampler}>
                      {note}
                    </Xwen3Block>
                  );
                })
              )}
            </th>
          </table>
        </div>
      </div>
    </div>
  );
};

export const Xwen3Instrument = new Instrument("Xwen3Flute", Xwen3);
