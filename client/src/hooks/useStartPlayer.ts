import * as Tone from "tone";
import { Dispatch, useEffect } from "react";
import { DispatchAction } from "../Reducer";
import { AppState } from "../State";

export const useStartPlayer = (
  player: Tone.Synth | Tone.Sampler,
  state: AppState,
  dispatch: Dispatch<DispatchAction>,
  notes: any
) => {
  useEffect(() => {
    if (notes) {
      let eachNote = notes.split(" ");
      let noteObjs = eachNote.map((note: string, idx: number) => ({
        idx,
        time: `+${idx / 4}`,
        note,
        velocity: 1,
      }));

      new Tone.Part((time, value) => {
        // the value is an object which contains both the note and the velocity
        player.triggerAttackRelease(value.note, "4n", time, value.velocity);
        if (value.idx === eachNote.length - 1) {
          dispatch(new DispatchAction("STOP_SONG"));
        }
      }, noteObjs).start(0);

      Tone.Transport.start();

      return () => {
        Tone.Transport.cancel();
      };
    }

    return () => {
      console.log("cleanup");
    };
  }, [notes, dispatch, player]);
};
