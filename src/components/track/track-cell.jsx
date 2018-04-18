import React from "react";

export default class TrackCell extends React.PureComponent {
  handleClick = () => {
    this.props.onClick(this.props.index);
  };

  composeStyle() {
    const baseStyle = {
      width: 30,
      height: 30,
      border: "1px solid black"
    };

    if (this.props.active) return { ...baseStyle, backgroundColor: "white" };
    else return { ...baseStyle, backgroundColor: "blue" };
  }

  render() {
    return <div onClick={this.handleClick} style={this.composeStyle()} />;
  }
}
