// 3rd party library imports
import * as Tone from "tone";
import classNames from "classnames";
import { List, Range } from "immutable";
import React, { FC, useEffect, useState } from "react";
import { Instrument, InstrumentProps } from "../../Instruments";
import { useStartPlayer } from "../../hooks/useStartPlayer";

// project imports

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for RimanovInstrument.
 ** ------------------------------------------------------------------------ */
interface RimanovBlockProps {
    note: string;
    synth?: Tone.Synth;
    sampler?: Tone.Sampler;
    active?: boolean;
}

const RimanovBlock: FC<RimanovBlockProps> = ({
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
                height: "0.5rem",
                marginLeft: "0.25rem",
                textAlign: "center",
                marginBottom: "2.5rem",
                backgroundColor: "maroon",

            }}
        >
            {children}
        </div>
    );
};

const RimanovType = ({ title, onClick, active }: any) => {
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

interface RimanovProps extends InstrumentProps {
    notes: any;
}

const Rimanov: FC<InstrumentProps> = ({ state, dispatch, notes }) => {
    const abc = List([
        { note: "G" },
        { note: "C" },
        { note: "E" },
        { note: "A" },

    ]);

    const [sampler, setSampler] = useState(
        new Tone.Sampler({
            urls: {
                G1: "ukuleleG1.mp3",
                E1: "ukuleleE1.mp3",
                A1: "ukuleleA1.mp3",
                G2: "ukuleleG2.mp3",
                C2: "ukuleleC2.mp3",
                E2: "ukuleleE2.mp3",
                A2: "ukuleleA2.mp3",
                G3: "ukuleleG3.mp3",
                C3: "ukuleleC3.mp3",
                E3: "ukuleleE3.mp3",
                A3: "ukuleleA3.mp3",
                C4: "ukuleleC4.mp3",
            },
            baseUrl: "http://localhost:3000/",
        }).toDestination()
    );
    console.log(sampler, "sampler");
    useStartPlayer(sampler, state, dispatch, notes);


    const css = `
* {
    margin: 0;
    padding: 0;
    list-style-type: none;
}

body {
    background: #eee;
    font-family: 'Source Sans Pro', sans-serif;
    letter-spacing: 0.05em;
}

h1 {
    text-transform: uppercase;
    text-align: center;
    margin-top: 40px;
}

.ukulele-neck {
    position: relative;
    margin-top: 40px;
    left: 50%;
    margin-left: -250px;
    width: 700px;
    height: 250px;
    background: #755628;
    box-shadow: inset -1px 0px 11px 0px rgba(0, 0, 0, 0.75);
}

.fret {
    float: left;
    width: 3px;
    height: 250px;
    background: #d7d6d6;
    margin-left: 90px;
    border-right: 2px solid #686868;
}

.base {
    position: absolute;
    width: 50px;
    left: -52px;
    top: 0;
    margin-left: 0;
    background: #211f1d;
}


.strings {
    position: absolute;
    left: 0;
    top: 50px;
    width: 700px;
    height: 250px;
}
li {
    height: 1px;
    display: inline-block;
    width: 100%;
    background: #c8bb93;
    margin-bottom: 38px;
    border-bottom: 2px solid #958963;
    box-sizing: border-box;
}

li:nth-child(1) {
    height: 6px;
}
li:nth-child(2) {
    height: 6px;
}
li:nth-child(3) {
    height: 6px;
}
li:nth-child(4) {
    height: 6px;
} 
`
    return (
        <div>
            <style>
                {css}
            </style>
            <div className="ukulele-neck">
                <div className="fret base"></div>
                <div className="fret"></div>
                <div className="fret"></div>
                <div className="fret"></div>
                <div className="fret"></div>
                <div className="fret"></div>
                <div className="fret"></div>
                <div className="fret"></div>

                <ul className="strings">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>

                <div style={{ display: "flex", flexDirection: "column", padding: "1rem", position: "absolute", left: "10px", top: "33px" }}>
                    {Range(0, 1).map((octave) =>
                        abc.map((key) => {
                            const note = `${key.note}${octave}`;
                            return (
                                <RimanovBlock key={note} note={note} sampler={sampler}>
                                    {/* {note} */}
                                </RimanovBlock>
                            );
                        })
                    )}
                </div>

                <div style={{ display: "flex", flexDirection: "column", padding: "1rem", position: "absolute", left: "100px", top: "33px" }}>
                    {Range(1, 2).map((octave) =>
                        abc.map((key) => {
                            const note = `${key.note}${octave}`;
                            return (
                                <RimanovBlock key={note} note={note} sampler={sampler}>
                                    {/* {note} */}
                                </RimanovBlock>
                            );
                        })
                    )}
                </div>

                <div style={{ display: "flex", flexDirection: "column", padding: "1rem", position: "absolute", left: "195px", top: "33px" }}>
                    {Range(2, 3).map((octave) =>
                        abc.map((key) => {
                            const note = `${key.note}${octave}`;
                            return (
                                <RimanovBlock key={note} note={note} sampler={sampler}>
                                    {/* {note} */}
                                </RimanovBlock>
                            );
                        })
                    )}
                </div>

                <div style={{ display: "flex", flexDirection: "column", padding: "1rem", position: "absolute", left: "285px", top: "33px" }}>
                    {Range(3, 4).map((octave) =>
                        abc.map((key) => {
                            const note = `${key.note}${octave}`;
                            return (
                                <RimanovBlock key={note} note={note} sampler={sampler}>
                                    {/* {note} */}
                                </RimanovBlock>
                            );
                        })
                    )}
                </div>

                <div style={{ display: "flex", flexDirection: "column", padding: "1rem", position: "absolute", left: "380px", top: "33px" }}>
                    {Range(4, 5).map((octave) =>
                        abc.map((key) => {
                            const note = `${key.note}${octave}`;
                            return (
                                <RimanovBlock key={note} note={note} sampler={sampler}>
                                    {/* {note} */}
                                </RimanovBlock>
                            );
                        })
                    )}
                </div>

                <div style={{ display: "flex", flexDirection: "column", padding: "1rem", position: "absolute", left: "475px", top: "33px" }}>
                    {Range(5, 6).map((octave) =>
                        abc.map((key) => {
                            const note = `${key.note}${octave}`;
                            return (
                                <RimanovBlock key={note} note={note} sampler={sampler}>
                                    {/* {note} */}
                                </RimanovBlock>
                            );
                        })
                    )}
                </div>

                <div style={{ display: "flex", flexDirection: "column", padding: "1rem", position: "absolute", left: "570px", top: "33px" }}>
                    {Range(6, 7).map((octave) =>
                        abc.map((key) => {
                            const note = `${key.note}${octave}`;
                            return (
                                <RimanovBlock key={note} note={note} sampler={sampler}>
                                    {/* {note} */}
                                </RimanovBlock>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export const RimanovInstrument = new Instrument("Rimanov", Rimanov);
