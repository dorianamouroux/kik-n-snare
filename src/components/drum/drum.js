import React from "react";
import { connect } from "react-redux";

import { loadFew, library } from "library";

class Drum extends React.PureComponent {
  interval = null;
  sound = null;
  current = 0;

  playSound() {
    const soundToPlay = this.props.sounds
      .map(sound => {
        if (sound.pattern[this.current] === "1") return sound.name;
      })
      .filter(sound => sound);

    soundToPlay.forEach(sound => {
      console.log(library);
      console.log(sound);
      console.log(library[sound]);
      library[sound].wrapper.play();
    });

    // increment current
    this.current += 1;
    if (this.current === 15) this.current = 0;

    this.interval = setTimeout(this.playSound.bind(this), 250);
  }

  componentDidMount() {
    return;
    const sounds = this.props.sounds.map(sound => sound.name);
    loadFew(sounds).then(test => {
      this.interval = setTimeout(this.playSound.bind(this), 250);
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return <div>I'm the drum</div>;
  }
}

export default connect(state => ({
  sounds: state.sound
}))(Drum);
