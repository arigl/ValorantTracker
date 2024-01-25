import React, { useEffect, useState } from "react";

interface LoadingScreenProps {
  bgcolor: string;
  completed: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  bgcolor,
  completed,
}) => {
  const [progressLabel, setProgressLabel] = useState(
    getProgressLabel(completed)
  );

  useEffect(() => {
    // Update progress label when progress changes
    setProgressLabel(getProgressLabel(completed));
  }, [completed]);

  const containerStyles: React.CSSProperties = {
    height: 20,
    width: "60%",
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    margin: 50,
  };

  const fillerStyles: React.CSSProperties = {
    height: "100%",
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: "inherit",
    textAlign: "right" as const,
  };

  const labelStyles: React.CSSProperties = {
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

function getProgressLabel(completed: number): string {
  if (completed === 20) {
    return "Retrieving user data...";
  } else if (completed === 40) {
    return "Calculating chance of throwing...";
  } else if (completed === 60) {
    return "Setting up for post plant...";
  } else if (completed === 80) {
    return "Wrapping up final steps...";
  } else if (completed === 90) {
    return "Almost done...";
  } else {
    return `Progress: ${completed}%`;
  }
}

export default LoadingScreen;
