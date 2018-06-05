import React from "react";
import range from "lodash.range";
import { connect } from "react-redux";
import debounce from "lodash.debounce";
import styled from "styled-components";

import Button from "components/button";
import Track from "components/track";
import ProgressTrack from "components/track/progress-track";
import PaceMaker from "components/pacemaker";
import { loadFew, library } from "library";

const Container = styled.div`
  width: 100%;
  margin: auto;
  max-width: 900px;

  @media (max-width: 900px) {
    padding: 0 20px;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 10px;
  margin-bottom: 30px;
  position: relative;

  @media (max-width: 720px) {
    padding-top: 40px;
  }

  @media (max-width: 500px) {
    flex-direction: column-reverse;
  }
`;

const Footer = styled.footer`
  font-family: "Pacifico", cursive;
  text-align: center;
  margin-top: 50px;
  font-size: 18px;
  margin-bottom: 30px;
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

const ContainerTracks = styled.div`
  overflow: scroll;
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
    this.sounds = range(16).map(index => {
      return this.props.sounds
        .filter(({ pattern }) => pattern[index] === "1")
        .map(({ name }) => library[name]);
    });
  }

  createListSounds(sounds) {
    return sounds.map(sound => sound.name);
  }

  loadAndPlay() {
    // we start the request, then update the sound (while IO event)
    // then return the promise
    loadFew(this.createListSounds(this.props.sounds));
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
      prevState.current !== this.state.current ||
      prevState.isPlaying !== this.state.isPlaying
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
          <PaceMaker bpm={this.state.bpm} onUpdate={this.onUpdateBpm} />
        </Header>
        <ContainerTracks>
          <ProgressTrack current={current} />
          {this.props.sounds.map((sound, index) => (
            <Track track={index} {...sound} key={index} />
          ))}
        </ContainerTracks>
        <Footer>
          Made with <span>❤</span> by{" "}
          <a target="blank" href="https://www.github.com/dorianamouroux">
            Dorian
          </a>
        </Footer>
      </Container>
    );
  }
}

export default connect(state => ({
  sounds: state.sound
}))(Index);
