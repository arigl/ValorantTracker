import React, { useEffect, useState } from "react";

const LoadingScreen = ({ bgcolor, completed, progress = 0 }) => {
  const [progressLabel, setProgressLabel] = useState(
    getProgressLabel(completed)
  );

  useEffect(() => {
    // Update progress label when progress changes
    setProgressLabel(getProgressLabel(completed));
  }, [completed]);

  const containerStyles = {
    height: 20,
    width: "60%",
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    margin: 50,
  };

  const fillerStyles = {
    height: "100%",
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: "inherit",
    textAlign: "right" as const,
  };

  const labelStyles = {
    padding: 5,
    color: "white",
    fontWeight: "bold",
  };

  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center">
      <div style={containerStyles}>
        <div style={fillerStyles}>
          <span style={labelStyles}>{`${completed}%`}</span>
        </div>
      </div>
      <p>{progressLabel}</p>
    </div>
  );
};

function getProgressLabel(completed: number) {
  if (completed === 20) {
    return "Retrieving user data...";
  } else if (completed === 40) {
    return "Calculating chance of throwing...";
  } else if (completed === 60) {
    return "Setting up for post plant...";
  } else if (completed === 80) {
    return "Wrapping up final steps...";
  } else {
    return `Progress: ${completed}%`;
  }
}

export default LoadingScreen;
