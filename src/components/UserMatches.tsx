import "../styles.css";
import MatchSummary from "./children/MatchSummary";

const UserMatches = (props: { matchesData: any }) => {
  return (
    <div className="w-full">
      <h1 className="mb-2">Matches</h1>
      {props.matchesData &&
        props.matchesData.map((match, index) => (
          <div key={index}>
            <MatchSummary
              kills={match.kills}
              deaths={match.deaths}
              assists={match.assists}
              score={match.score}
              agentIcon={match.agentIcon}
              adr={match.totalDamage / match.rounds}
              matchResult={match.matchResult}
              rounds={match.rounds}
            />
          </div>
        ))}
    </div>
  );
};

export default UserMatches;
