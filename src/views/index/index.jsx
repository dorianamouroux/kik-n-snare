import React from "react";
import { connect } from "react-redux";
import debounce from "lodash.debounce";
import styled from "styled-components";

import Button from "components/button";
import Track from "components/track";
import ProgressTrack from "components/track/progress-track";
import PaceMaker from "components/pacemaker";
import { loadFew, library } from "library";

const Container = styled.div`
  width: 100;
  margin: auto;
  max-width: 900px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 10px;
  margin-bottom: 30px;
  position: relative;
`;

const Logo = styled.h1`
  font-family: "Pacifico", cursive;
  text-align: center;
  width: 100%;
  z-index: -1;
  font-size: 30px;
  color: ${props => props.theme.primary};
  position: absolute;
`;

const Footer = styled.footer`
  font-family: "Pacifico", cursive;
  text-align: center;
  margin-top: 50px;
  font-size: 18px;
  color: #b2b2b2;

  span {
    color: red;
    position: relative;
    top: 2px;
  }

  a {
    color: inherit;
  }
`;

class Index extends React.PureComponent {
  interval = null;
  sounds = [];

  state = {
    current: 0,
    bpm: 100,
    isPlaying: false
  };

  constructor(props) {
    super(props);
    this.debouncedStartPlaying = debounce(this.startPlaying, 600);
  }

  playSound = () => {
    this.sounds[this.state.current].forEach(sound => sound.wrapper.play());

    // increment current
    this.setState((prevState, props) => ({
      current: (prevState.current + 1) % 16
    }));
  };

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

  createListSounds(sounds) {
    return sounds.map(sound => sound.name);
  }

  loadAndPlay() {
    // we start the request, then update the sound (while IO event)
    // then return the promise
    const promiseLoading = loadFew(this.createListSounds(this.props.sounds));
    this.hydrateSounds();
  }

  startPlaying = () => {
    clearInterval(this.interval);
    const intervalTime = 15000 / this.state.bpm;
    this.interval = setInterval(this.playSound, intervalTime);
  };

  onClickPlayPause = () => {
    if (this.state.isPlaying) {
      this.setState({ isPlaying: false });
      clearInterval(this.interval);
      this.interval = null;
    } else {
      this.setState({ isPlaying: true });
      this.startPlaying();
    }
  };

  componentDidMount() {
    this.loadAndPlay();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    this.interval = null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.current != this.state.current ||
      prevState.isPlaying != this.state.isPlaying
    ) {
      return; // just a current update
    }

    // list of sound is update
    this.loadAndPlay();
  }

  onUpdateBpm = bpm => {
    this.setState({ bpm }, () => {
      if (this.state.isPlaying) {
        this.debouncedStartPlaying();
      }
    });
  };

  render() {
    const { isPlaying, current } = this.state;
    return (
      <Container>
        <Header>
          <Button width="120px" onClick={this.onClickPlayPause}>
            {isPlaying ? "Pause" : "Play"}
          </Button>
          <Logo>Kik'n'Snare</Logo>
          <PaceMaker bpm={this.state.bpm} onUpdate={this.onUpdateBpm} />
        </Header>
        <ProgressTrack current={current} />
        {this.props.sounds.map((sound, index) => (
          <Track track={index} {...sound} key={index} />
        ))}
        <Footer>
          Made with <span>❤</span> by{" "}
          <a href="https://www.github.com/dorianamouroux">Dorian</a>
        </Footer>
      </Container>
    );
  }
}

export default connect(state => ({
  sounds: state.sound
}))(Index);
