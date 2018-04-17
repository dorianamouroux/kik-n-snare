import React from "react";
import { connect } from "react-redux";

const baseStyle = {
  width: 30,
  height: 30,
  border: "1px solid black"
};
const EmptyBeat = () => (
  <div style={{ backgroundColor: "white", ...baseStyle }} />
);
const FilledBeat = () => (
  <div style={{ backgroundColor: "blue", ...baseStyle }} />
);

class Track extends React.PureComponent {
  renderBeats() {
    return this.props.pattern.split("").map((letter, index) => {
      if (letter == "1") return <EmptyBeat key={index} />;
      else return <FilledBeat key={index} />;
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

export default Track;
