import React from "react";

export default class Drum extends React.PureComponent {
  decrement = value => () => {
    this.props.onUpdate(this.props.bpm - value);
  };

  increment = value => () => {
    this.props.onUpdate(this.props.bpm + value);
  };

  render() {
    return (
      <div>
        <button onClick={this.decrement(5)}>-5</button>
        <button onClick={this.decrement(1)}>-1</button>
        {this.props.bpm}
        <button onClick={this.increment(1)}>+1</button>
        <button onClick={this.increment(5)}>+5</button>
      </div>
    );
  }
}
