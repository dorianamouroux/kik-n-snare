import range from "lodash.range";

import store from "../store";
import library from "./library";
import { loadFew } from "./loader";

class Player {
  constructor() {
    this.sounds = [];
    this.interval = null;
    this.isPlaying = false;

    this.update();

    this.listener = store.subscribe(this.update);
  }

  // deconstructor
  tearDown() {
    this.listener();
  }

  // call whenever redux store is updated
  update = () => {
    const { sound } = store.getState();

    loadFew(sound.beats.map(sample => sample.name));

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
