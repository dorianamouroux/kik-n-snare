import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import Button from "components/button";
import Track from "components/track";
import ProgressTrack from "components/track/progress-track";
import PaceMaker from "components/pacemaker";
import { Player } from "library";

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

  state = {
    current: 0,
    isPlaying: false
  };

  playSound = () => {
    this.player.play(this.state.current);

    // increment current
    this.setState((prevState, props) => ({
      current: (prevState.current + 1) % 16
    }));
  };

  startPlaying = () => {
    clearInterval(this.interval);
    const intervalTime = 15000 / this.props.bpm;
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
    this.player = new Player();
    this.player.load().then(() => {
      if (this.state.isPlaying) setTimeout(this.startPlaying, 500);
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.bpm !== prevProps.bpm && this.state.isPlaying) {
      this.startPlaying();
    }
  }

  componentWillUnmount() {
    this.player.tearDown();
  }

  renderTrack = (sound, index) => {
    return <Track track={index} {...sound} key={index} />;
  };

  render() {
    const { isPlaying, current } = this.state;
    return (
      <Container>
        <Header>
          <Button width="120px" onClick={this.onClickPlayPause}>
            {isPlaying ? "Pause" : "Play"}
          </Button>
          <PaceMaker />
        </Header>
        <ContainerTracks>
          <ProgressTrack current={current} />
          {this.props.sounds.beats.map(this.renderTrack)}
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
  sounds: state.sound,
  bpm: state.sound.bpm
}))(Index);
