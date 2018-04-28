import React from "react";
import range from "lodash.range";
import styled from "styled-components";

const sizeBorderRadius = "3px";

const Container = styled.div`
  width: 100%;
  display: flex;
  margin: 20px 0 40px;
`;

const Tile = styled.div`
  width: ${100 / 16}%;
  height: 5px;
  border: 1px solid pink;
  background-color: ${props => (props.current ? "white" : "pink")};

  &:first-child {
    border-radius: ${sizeBorderRadius} 0 0 ${sizeBorderRadius};
  }

  &:last-child {
    border-radius: 0 ${sizeBorderRadius} ${sizeBorderRadius} 0;
  }
`;

function ProgressTrackCell({ current }) {
  return <Tile current={current} />;
}

export default function ProgressTrack({ current }) {
  return (
    <Container>
      {range(16).map(index => (
        <ProgressTrackCell key={index} current={index === current} />
      ))}
    </Container>
  );
}
