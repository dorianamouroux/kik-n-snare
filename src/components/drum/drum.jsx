import React from "react";
import { connect } from "react-redux";

import Track from "components/track";
import ProgressTrack from "components/track/progress-track";
import PaceMaker from "components/pacemaker";
import { loadFew, library } from "library";

class Drum extends React.PureComponent {
  interval = null;
  sounds = [];

  state = {
    current: 0,
    bpm: 100
  };

  playSound() {
    this.sounds[this.state.current].forEach(sound => sound.wrapper.play());

    // increment current
    this.setState((prevState, props) => ({
      current: (prevState.current + 1) % 16
    }));
  }

  hydrateSounds() {
    const sounds = [];
    for (var i = 0; i < 16; i++) {
      sounds.push(
        this.props.sounds
          .filter(({ pattern }) => pattern[i] === "1")
          .map(({ name }) => library[name])
      );
    }
    this.sounds = sounds;
  }

  loadAndPlay() {
    const sounds = this.props.sounds.map(sound => sound.name);
    loadFew(sounds).then(() => {
      if (!this.interval) this.startPlaying;
    });
    this.hydrateSounds();
  }

  startPlaying = () => {
    const intervalTime = 15000 / this.state.bpm;
    this.stopPlaying();
    this.interval = setInterval(
      scheduledTime => this.playSound(),
      intervalTime
    );
  };

  stopPlaying = () => {
    if (this.interval) clearInterval(this.interval);
    this.interval = null;
  };

  componentDidMount() {
    this.loadAndPlay();
  }

  componentDidUpdate() {
    this.loadAndPlay();
  }

  onUpdateBpm = bpm => {
    this.startPlaying();
    this.setState({ bpm });
  };

  render() {
    return (
      <div>
        <button
          onClick={() =>
            this.interval ? this.stopPlaying() : this.startPlaying()
          }
        >
          Play/Pause
        </button>
        <PaceMaker bpm={this.state.bpm} onUpdate={this.onUpdateBpm} />
        <ProgressTrack current={this.state.current} />
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
