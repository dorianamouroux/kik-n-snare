import React from "react";
import styled from "styled-components";

import Button from "components/button";

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const IncrementerButton = Button.extend`
  padding: 3px;
  width: 40px;
  height: 40px;
  margin: 0 2px;
  border-radius: 50%;
`;

const BpmLabel = styled.span`
  font-size: 20px;
  margin: 0 4px;
  width: 50px;
  text-align: center;
`;

export default class Drum extends React.PureComponent {
  decrement = value => () => {
    this.props.onUpdate(this.props.bpm - value);
  };

  increment = value => () => {
    this.props.onUpdate(this.props.bpm + value);
  };

  render() {
    return (
      <Container>
        <IncrementerButton onClick={this.decrement(5)}>-5</IncrementerButton>
        <IncrementerButton onClick={this.decrement(1)}>-1</IncrementerButton>
        <BpmLabel>{this.props.bpm}</BpmLabel>
        <IncrementerButton onClick={this.increment(1)}>+1</IncrementerButton>
        <IncrementerButton onClick={this.increment(5)}>+5</IncrementerButton>
      </Container>
    );
  }
}
