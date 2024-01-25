import { useEffect, useState } from "react";

const OverviewStats = (props: { matchesData: any }) => {
  const [kdRatio, setKdRatio] = useState(0);
  const [damagePerRound, setDamagePerRound] = useState(0);
  const [headshotPer, setHeadShotPer] = useState(0);
  const [winRate, setWinRate] = useState(0);
  const [ACS, setACS] = useState(0);

  useEffect(() => {
    //console.log(props.matchesData.length);
    let kills = 0;
    let deaths = 0;
    let totalDamage = 0;
    let rounds = 0;
    let headShots = 0;
    let shots = 0;
    let wins = 0;
    let losses = 0;
    let score = 0;
    if (props.matchesData) {
      for (let i = 0; i < props.matchesData.length; i++) {
        //console.log(props.matchesData[i]);
        kills += props.matchesData[i].kills;
        deaths += props.matchesData[i].deaths;
        totalDamage += props.matchesData[i].totalDamage;
        headShots += props.matchesData[i].headshots;
        score += props.matchesData[i].score;
        if (props.matchesData[i].matchResult == true) {
          wins += 1;
        } else {
          losses += 1;
        }
        shots +=
          props.matchesData[i].headshots +
          props.matchesData[i].bodyshots +
          props.matchesData[i].legshots;
        // rounds += props.matchesData[i].rounds.length;
        if (props.matchesData[i].rounds) {
          //console.log(props.matchesData[i].rounds.length);
          rounds += props.matchesData[i].rounds;
        }

        //console.log(kills);
      }
      if (deaths !== 0) {
        setKdRatio(kills / deaths);
        setDamagePerRound(totalDamage / rounds);
        setHeadShotPer(headShots / shots);
        setWinRate(wins / (wins + losses));
        setACS(score / rounds);
      }
    }
  }, [props.matchesData]);
  return (
    <div className="p-2 w-full mt-2 rounded-l border">
      <h1 className="mt-1 mb-1 font">
        Overview Stats{" "}
        <span className="ml-0.5 opacity-75 text-xs">(past 10 games)</span>
      </h1>
      {props.matchesData && (
        <div className="flex flex-row gap-10">
          <div className="border p-3 rounded border border-blue-500 border-opacity-50">
            <h1>K/D/A</h1>
            <p className="font-bold">{kdRatio.toFixed(2)}</p>
          </div>
          <div className="border p-3 rounded border border-blue-500 border-opacity-50">
            <h1>ADR</h1>
            <p className="font-bold">{damagePerRound.toFixed(2)}</p>
          </div>
          <div className="border p-3 rounded border border-blue-500 border-opacity-50">
            <h1>HS%</h1>
            <p className="font-bold">{headshotPer.toFixed(2)}</p>
          </div>
          <div className="border p-3 rounded border border-blue-500 border-opacity-50">
            <h1>Winrate%</h1>
            <p className="font-bold">{(winRate * 100).toFixed(2)}</p>
          </div>
          <div className="border p-3 rounded border border-blue-500 border-opacity-50">
            <h1>ACS</h1>
            <p className="font-bold">{ACS.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
};
export default OverviewStats;
