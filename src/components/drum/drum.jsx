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
    this.sounds[i].forEach(sound => sound.wrapper.play());

    // increment current
    i = i === 15 ? 0 : i + 1;
  }

  hydrateSounds = () => {
    const sounds = [];
    for (var i = 0; i < 16; i++) {
      sounds.push(
        this.props.sounds
          .filter(({ pattern }) => pattern[i] === "1")
          .map(({ name }) => library[name])
      );
    }
    this.sounds = sounds;
  };

  loadAndPlay() {
    const sounds = this.props.sounds.map(sound => sound.name);
    loadFew(sounds).then(() => {
      this.interval = setInterval(scheduledTime => this.playSound(), 120);
    });
  }

  componentDidMount() {
    // return
    this.loadAndPlay();
  }

  componentWillReceiveProps() {
    // loadFew(sounds).then(() => {
    //   this.hydrateSounds();
    // });
  }

  componentWillUnmount() {
    // clearInterval(this.interval);
  }

  render() {
    this.hydrateSounds();
    return (
      <div>
        {this.props.sounds.map((sound, index) => (
          <Track track={index} {...sound} key={index} />
        ))}
      </div>
    );
  }
}

export default connect(state => ({
  sounds: state.sound
}))(Drum);
