import { useEffect, useState } from "react";

const OverviewStats = (props: { matchesData: any }) => {
  const [kdRatio, setKdRatio] = useState(0);
  const [damagePerRound, setDamagePerRound] = useState(0);
  const [headshotPer, setHeadShotPer] = useState(0);
  const [winRate, setWinRate] = useState(0);
  const [ACS, setACS] = useState(0);
  const [totalKills, setTotalKills] = useState(0);
  const [totalDeaths, setTotalDeaths] = useState(0);
  const [totalAssists, setTotalAssists] = useState(0);

  useEffect(() => {
    //console.log(props.matchesData.length);
    let kills = 0;
    let deaths = 0;
    let assists = 0;
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
        assists += props.matchesData[i].assists;
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
        setTotalKills(kills);
        setTotalDeaths(deaths);
        setTotalAssists(assists);
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
        <div className="flex flex-col gap-5">
          <div className="flex flex-row gap-10">
            <div className="border pt-3 pb-3 pl-10 pr-10 rounded border border-blue-500 border-opacity-50 flex flex-row items-center">
              <div>
                <h1>K/D</h1>
                <p className="font-bold">{kdRatio.toFixed(2)}</p>
              </div>
              <p className="text-green-500 ml-5">^20%</p>
            </div>
            <div className="border pt-3 pb-3 pl-10 pr-10 rounded border border-blue-500 border-opacity-50">
              <h1>ADR</h1>
              <p className="font-bold">{damagePerRound.toFixed(2)}</p>
            </div>
            <div className="border pt-3 pb-3 pl-10 pr-10 rounded border border-blue-500 border-opacity-50">
              <h1>HS%</h1>
              <p className="font-bold">{headshotPer.toFixed(2)}</p>
            </div>
            <div className="border pt-3 pb-3 pl-10 pr-10 rounded border border-blue-500 border-opacity-50">
              <h1>Winrate%</h1>
              <p className="font-bold">{(winRate * 100).toFixed(2)}</p>
            </div>
            <div className="border pt-3 pb-3 pl-10 pr-10 rounded border border-blue-500 border-opacity-50">
              <h1>ACS</h1>
              <p className="font-bold">{ACS.toFixed(2)}</p>
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <div className="border p-3 rounded border border-blue-500 border-opacity-50">
              <h1>Kills</h1>
              <p className="font-bold">{totalKills}</p>
            </div>
            <div className="border p-3 rounded border border-blue-500 border-opacity-50">
              <h1>Deaths</h1>
              <p className="font-bold">{totalDeaths}</p>
            </div>
            <div className="border p-3 rounded border border-blue-500 border-opacity-50">
              <h1>Assists</h1>
              <p className="font-bold">{totalAssists}</p>
            </div>
            <div className="border p-3 rounded border border-blue-500 border-opacity-50">
              <h1>Wins</h1>
            </div>
            <div className="border p-3 rounded border border-blue-500 border-opacity-50">
              <h1>Damage</h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default OverviewStats;
