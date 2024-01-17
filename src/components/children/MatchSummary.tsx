const MatchSummary = (props) => {
  const backgroundColor = props.matchResult
    ? "border-green-500"
    : "border-red-500";
  return (
    <div
      className={`flex flex-row w-full border gap-2 ${backgroundColor} mb-5 rounded p-3 justify-between`}
    >
      <div className="flex flex-row gap-2">
        <img src={props.agentIcon} width={30}></img>
        <h1 className="font-bold">
          Kills: <span className="font-normal">{props.kills}</span>
        </h1>
        <h1 className="font-bold">
          Deaths: <span className="font-normal">{props.deaths}</span>
        </h1>
        <h1 className="font-bold">
          Assists: <span className="font-normal">{props.assists}</span>
        </h1>
        <h1 className="font-bold">
          Score: <span className="font-normal">{props.score}</span>
        </h1>
        <h1 className="font-bold">
          ADR: <span className="font-normal">{props.adr.toFixed(2)}</span>
        </h1>
        <h1 className="font-bold">
          ACS:{" "}
          <span className="font-normal">
            {(props.score / props.rounds).toFixed(2)}
          </span>
        </h1>
      </div>
      <button className="bg-slate-300 rounded-md pt-1 pb-1 pl-2 pr-2 hover:bg-slate-400">
        <p className="text-xs">View Match</p>
      </button>
    </div>
  );
};
export default MatchSummary;
