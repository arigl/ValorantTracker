const MatchSummary = (props) => {
  return (
    <div className="flex flex-row gap-2 bg-gray-500 mb-5 rounded ml-2 p-3">
      <h1>Kills: {props.kills}</h1>
      <h1>Deaths: {props.deaths}</h1>
      <h1>Assists: {props.assists}</h1>
      <h1>Score: {props.score}</h1>
    </div>
  );
};
export default MatchSummary;
