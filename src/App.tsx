import "./App.css";
import "./styles.css";
import UserProfile from "./components/UserProfile";
import UserRankInfo from "./components/UserRankInfo";
import ValMMRData from "./data/ValMMRData";
import ValUserData from "./data/ValUserData";
import ValMatchesData from "./data/ValMatchesData";
import { useState } from "react";
import UserMatches from "./components/UserMatches";
import OverviewStats from "./components/OverviewStats";

function App() {
  const [fetchedUserData, setFetchedUserData] = useState(null);
  const [fetchedMMRData, setFetchedMMRData] = useState(null);
  const [fetchedMatchesData, setFetchedMatchesData] = useState(null);

  const handleFetchData = async () => {
    //   puuid: fetchedData.puuid,
    //   region: fetchedData.region,
    //   accountLevel: fetchedData.accountLevel,
    //   name: fetchedData.name,
    //   tag: fetchedData.tag,
    const fetchUserData = ValUserData({ userName: "Hex", tag: "Mos" });
    const userData = await fetchUserData();
    console.log(userData);
    setFetchedUserData(userData);

    const fetchMMRData = ValMMRData({
      region: "NA",
      userName: "Hex",
      tag: "Mos",
    });
    const mmrData = await fetchMMRData();
    console.log(mmrData);
    setFetchedMMRData(mmrData);

    const fetchMatchesData = ValMatchesData({
      region: "NA",
      userName: "Hex",
      tag: "Mos",
    });
    const matchesData = await fetchMatchesData();
    console.log(matchesData);
    setFetchedMatchesData(matchesData);
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row justify-between bg-slate-300">
          <UserProfile userData={fetchedUserData} />
          <div className="flex flex-row items-center gap-20">
            <h1>Overview</h1>
            <h1>Matches</h1>
            <h1>Performance</h1>
            <h1>Agents</h1>
            <h1>Maps</h1>
          </div>

          <button
            className="bg-slate-500 text-white rounded-md p-1 m-5 text-sm"
            onClick={handleFetchData}
          >
            Sign in
          </button>
        </div>
        <div className="flex flex-row gap-10 items-start">
          <UserRankInfo mmrData={fetchedMMRData} />
          <div className="flex flex-col gap-10">
            <OverviewStats userData={fetchedUserData} />
            <UserMatches matchesData={fetchedMatchesData}></UserMatches>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
