import React from "react";
import { connect } from "react-redux";
import accurateInterval from "accurate-interval";

import Track from "components/track";
import { loadFew, library } from "library";

let i = 0;

class Drum extends React.PureComponent {
  interval = null;
  sounds = [];
  current = 0;

  playSound() {
    this.sounds[i].forEach(sound => sound.play());

    // increment current
    i = i === 15 ? 0 : i + 1;
  }

  hydrateSounds() {
    const sounds = [];
    for (var i = 0; i < 16; i++) {
      sounds.push(
        this.props.sounds
          .filter(({ pattern }) => pattern[i] === "1")
          .map(({ name }) => library[name].wrapper)
      );
    }
    this.sounds = sounds;
  }

  componentDidMount() {
    const sounds = this.props.sounds.map(sound => sound.name);
    loadFew(sounds).then(() => {
      this.hydrateSounds();
      accurateInterval(
        scheduledTime => {
          this.playSound();
        },
        120,
        { aligned: true, immediate: true }
      );
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        {this.props.sounds.map((sound, index) => (
          <Track {...sound} key={index} />
        ))}
      </div>
    );
  }
}

export default connect(state => ({
  sounds: state.sound
}))(Drum);
