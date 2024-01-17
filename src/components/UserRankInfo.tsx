import "../styles.css";
const UserRankInfo = (props: { mmrData: any }) => {
  return (
    <div className="flex flex-col flex-1 justify-center items-start ml-5 p-5 bg-slate-200 mt-2 rounded">
      <h1>Current Rating</h1>
      {props.mmrData && (
        <div className="flex flex-col gap-2">
          <div className="flex flex-row">
            <img src={props.mmrData.rankImage} width={30}></img>
            <div className="flex flex-col">
              <h2 className="text-sm">Current Rank:</h2>
              <h1>{props.mmrData.rankText}</h1>
            </div>
          </div>
          <div className="flex flex-row">
            <img src={props.mmrData.rankImage} width={30}></img>
            <div className="flex flex-col">
              <h2 className="text-sm">Peak Rank:</h2>
              <h1>{props.mmrData.rankText}</h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRankInfo;
