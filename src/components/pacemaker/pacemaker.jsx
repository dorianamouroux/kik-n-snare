import React from "react";

export default class Drum extends React.PureComponent {
  decrement = () => {
    this.props.onUpdate(this.props.bpm - 1);
  };

  increment = () => {
    this.props.onUpdate(this.props.bpm + 1);
  };

  render() {
    return (
      <div>
        <button onClick={this.decrement}>-1</button>
        {this.props.bpm}
        <button onClick={this.increment}>+1</button>
      </div>
    );
  }
}
