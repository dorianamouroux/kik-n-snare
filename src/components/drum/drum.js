import React from "react";

import { load } from "library";

class Drum extends React.PureComponent {
  interval = null;
  sound = null;

  playSound() {
    // this.sound.wrapper.play()
  }

  componentDidMount() {
    load("snare").then(sound => {
      this.sound = sound;
      this.interval = setInterval(this.playSound.bind(this), 100);
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return <div>I'm the drum</div>;
  }
}

export default Drum;
