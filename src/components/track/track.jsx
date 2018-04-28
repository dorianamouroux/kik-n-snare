import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { toggleBeat } from "store/sound";
import TrackCell from "./track-cell";

const Container = styled.div`
  margin: 20px 0;
`;

const ContainerTiles = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NameBeat = styled.h3`
  color: #4a4a4a;
  font-size: 24px;
  text-transform: capitalize;
`;

class Track extends React.PureComponent {
  handleClick = index => {
    this.props.toggleBeat(this.props.track, index);
  };

  renderBeats() {
    return this.props.pattern
      .split("")
      .map((letter, index) => (
        <TrackCell
          index={index}
          active={letter == "1"}
          onClick={this.handleClick}
          key={index}
        />
      ));
  }

  render() {
    return (
      <Container>
        <NameBeat>{this.props.name}</NameBeat>
        <ContainerTiles>{this.renderBeats()}</ContainerTiles>
      </Container>
    );
  }
}

export default connect(null, dispatch => ({
  toggleBeat: (track, index) => dispatch(toggleBeat(track, index))
}))(Track);
