import React from "react";
import { connect } from "react-redux";

import { toggleBeat } from "store/sound";
import TrackCell from "./track-cell";

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
      <div>
        {this.props.name}
        <div style={{ display: "flex" }}>{this.renderBeats()}</div>
        <hr />
      </div>
    );
  }
}

export default connect(null, dispatch => ({
  toggleBeat: (track, index) => dispatch(toggleBeat(track, index))
}))(Track);
