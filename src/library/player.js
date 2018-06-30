import range from "lodash.range";

import store from "../store";
import library from "./library";
import { loadAll } from "./loader";

class Player {
  constructor() {
    this.sounds = [];
    this.interval = null;
    this.isPlaying = false;

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
    const { sound } = store.getState();

    this.sounds = range(16).map(index => {
      return sound.beats
        .filter(({ pattern }) => pattern[index] === "1")
        .map(({ name }) => library[name]);
    });
  };

  // players
  _playSound = sound => sound.wrapper.play();
  play = current => this.sounds[current].forEach(this._playSound);
}

export default Player;
