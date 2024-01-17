import "../styles.css";
const UserRankInfo = (props: { mmrData: any }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      {props.mmrData && (
        <div className="flex flex-col">
          <div className="flex flex-row">
            <img src={props.mmrData.rankImage} width={30}></img>
            <div className="flex flex-col">
              <h2 className="text-xsm">Current Rank:</h2>
              <h1>{props.mmrData.rankText}</h1>
            </div>
          </div>
          <div className="flex flex-row">
            <img src={props.mmrData.rankImage} width={30}></img>
            <div className="flex flex-col">
              <h2 className="text-xsm">Peak Rank:</h2>
              <h1>{props.mmrData.rankText}</h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRankInfo;
