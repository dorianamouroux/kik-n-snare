import range from "lodash.range";

import store from "../store";
import library from "./library";
import { loadAll } from "./loader";

class Player {
  constructor() {
    this.sounds = [];
    this.interval = null;
    this.isPlaying = false;

    this.refBeats = null;

    this.update();

    this.listener = store.subscribe(this.update);
  }

  load() {
    return loadAll();
  }

  // deconstructor
  tearDown() {
    this.listener();
  }

  // call whenever redux store is updated
  update = () => {
    const { beats } = store.getState().sound;

    // no update on the sounds pattern
    if (this.refBeats === beats) return;

    // save the ref sound for later
    this.refBeats = beats;

    // update sound pattern into something easy to play
    this.sounds = range(16).map(index => {
      return beats
        .filter(({ pattern }) => pattern[index] === "1")
        .map(({ name }) => library[name]);
    });
  };

  // players
  _playSound = sound => sound.wrapper.play();
  play = current => this.sounds[current].forEach(this._playSound);
}

export default Player;
