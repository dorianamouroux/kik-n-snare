import React from "react";

const baseStyle = {
  width: 30,
  height: 5,
  border: "1px solid pink",
  backgroundColor: "white"
};

function ProgressTrackCell({ current }) {
  const style = {
    ...baseStyle,
    ...(current ? { backgroundColor: "pink" } : {})
  };
  return <div style={style} />;
}

export default function ProgressTrack({ current }) {
  const test = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  return (
    <div style={{ display: "flex" }}>
      {test.map(index => (
        <ProgressTrackCell key={index} current={index === current} />
      ))}
    </div>
  );
}
