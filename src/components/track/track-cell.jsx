import React from "react";
import styled from "styled-components";

const Tile = styled.div`
  width: ${100 / 16}%;
  height: 50px;
  border: 1px solid black;
  border-right: 0;
  cursor: pointer;
  text-align: center;
  padding-top: 18px;
  font-size: 14px;
  color: #4e4e4e;
  background-color: ${props => (props.active ? "white" : "#2196F3")};

  &:last-child {
    border: 1px solid black;
  }

  @media (max-width: 720px) {
    height: 35px;
    padding-top: 11px;
  }
`;

export default class TrackCell extends React.PureComponent {
  handleClick = () => {
    this.props.onClick(this.props.index);
  };

  render() {
    const { active, index } = this.props;

    return (
      <Tile onClick={this.handleClick} active={active}>
        {index + 1}
      </Tile>
    );
  }
}
