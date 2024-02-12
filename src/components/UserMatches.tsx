import { Key } from "react";
import "../styles.css";
import MatchSummary from "./children/MatchSummary";

const UserMatches = (props: { matchesData: any }) => {
  return (
    <div className="w-full">
      <h1 className="mb-2">Matches</h1>
      {props.matchesData &&
        props.matchesData.map(
          (
            match: {
              kills: number;
              deaths: number;
              assists: number;
              score: number;
              agentIcon: string;
              totalDamage: number;
              rounds: number;
              matchResult: any;
              map: string;
              roundWins: number;
              roundLosses: number;
              headshots: number;
              bodyshots: number;
              legshots: number;
              mode: any;
              matchData: any;
            },
            index: Key | null | undefined
          ) => (
            <div key={index}>
              <MatchSummary
                kills={match.kills}
                deaths={match.deaths}
                assists={match.assists}
                score={match.score}
                agentIcon={match.agentIcon}
                adr={match.totalDamage / match.rounds}
                matchResult={match.matchResult}
                map={match.map}
                rounds={match.rounds}
                roundsWon={match.roundWins}
                roundsLost={match.roundLosses}
                headshots={match.headshots}
                bodyshots={match.bodyshots}
                legshots={match.legshots}
                mode={match.mode}
                index={index}
                data={match.matchData}
              />
            </div>
          )
        )}
    </div>
  );
};

export default UserMatches;
