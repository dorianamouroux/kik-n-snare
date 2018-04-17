import React from "react";
import { connect } from "react-redux";

import { toggleBeat } from "store/sound";

const baseStyle = {
  width: 30,
  height: 30,
  border: "1px solid black"
};
const FilledBeat = props => (
  <div {...props} style={{ backgroundColor: "white", ...baseStyle }} />
);
const EmptyBeat = props => (
  <div {...props} style={{ backgroundColor: "blue", ...baseStyle }} />
);

class Track extends React.PureComponent {
  handleClick = index => {
    this.props.toggleBeat(this.props.track, index);
  };

  renderBeats() {
    return this.props.pattern.split("").map((letter, index) => {
      const Component = letter == "1" ? FilledBeat : EmptyBeat;
      return <Component onClick={() => this.handleClick(index)} key={index} />;
    });
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
