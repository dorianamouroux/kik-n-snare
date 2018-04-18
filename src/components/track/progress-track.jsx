import React from "react";
import range from "lodash.range";

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
  return (
    <div style={{ display: "flex" }}>
      {range(16).map(index => (
        <ProgressTrackCell key={index} current={index === current} />
      ))}
    </div>
  );
}
