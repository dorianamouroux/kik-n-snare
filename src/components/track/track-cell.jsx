import React from "react";
import styled from "styled-components";

const Tile = styled.div`
  width: ${100 / 16}%;
  height: 50px;
  border: 1px solid black;
  cursor: pointer;
  background-color: ${props => (props.active ? "white" : "#2196F3")};
`;

export default class TrackCell extends React.PureComponent {
  handleClick = () => {
    this.props.onClick(this.props.index);
  };

  render() {
    return <Tile onClick={this.handleClick} active={this.props.active} />;
  }
}
