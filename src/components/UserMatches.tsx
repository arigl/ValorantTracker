import "../styles.css";
import React from "react";
import MatchSummary from "./children/MatchSummary";

const UserMatches = (props: { matchesData: any }) => {
  return (
    <div>
      <h1>Matches</h1>
      {props.matchesData &&
        props.matchesData.map((match, index) => (
          <div key={index}>
            <MatchSummary
              kills={match.kills}
              deaths={match.deaths}
              assists={match.assists}
              score={match.score}
            />
          </div>
        ))}
    </div>
  );
};

export default UserMatches;
