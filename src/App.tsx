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
import ModeSelect from "./components/ModeSelect";

function App() {
  const [fetchedUserData, setFetchedUserData] = useState(null);
  const [fetchedMMRData, setFetchedMMRData] = useState(null);
  const [fetchedMatchesData, setFetchedMatchesData] = useState(null);
  const [modeSelected, selectMode] = useState<string>("competitive");

  const handleFetchData = async () => {
    //   puuid: fetchedData.puuid,
    //   region: fetchedData.region,
    //   accountLevel: fetchedData.accountLevel,
    //   name: fetchedData.name,
    //   tag: fetchedData.tag,
    const fetchUserData = ValUserData({ userName: "Hex", tag: "Mos" });
    const userData = await fetchUserData();
    setFetchedUserData(userData);

    const fetchMMRData = ValMMRData({
      region: "NA",
      userName: "Hex",
      tag: "Mos",
    });
    const mmrData = await fetchMMRData();
    setFetchedMMRData(mmrData);

    const fetchMatchesData = ValMatchesData({
      region: "NA",
      userName: "Hex",
      tag: "Mos",
      modeFilter: "competitive",
    });
    const matchesData = await fetchMatchesData();
    setFetchedMatchesData(matchesData);
  };

  const handleSelectMode = (mode: string) => {
    selectMode(mode);
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row justify-between bg-slate-300 h-12">
          <UserProfile userData={fetchedUserData} />
          <div className="flex flex-row items-center flex-grow text-center">
            <h1 className="text-xs flex-1">Overview</h1>
            <h1 className="text-xs flex-1">Matches</h1>
            <h1 className="text-xs flex-1">Agents</h1>
            <h1 className="text-xs flex-1">Maps</h1>
            <h1 className="text-xs flex-1">Weapons</h1>
          </div>

          <button
            className="bg-slate-500 text-white text-xs rounded-xl p-1 pl-3 pr-3 mt-2 mb-2 mr-5 text-sm hover:bg-slate-400"
            onClick={handleFetchData}
          >
            Sign in
          </button>
        </div>
        <div className="flex flex-col">
          <ModeSelect
            modeSelected={modeSelected}
            selectMode={handleSelectMode}
          />
          <div className="flex flex-row gap-10 items-start">
            <div className="w-1/5 flex items-start">
              {modeSelected == "competitive" && (
                <UserRankInfo mmrData={fetchedMMRData} />
              )}
            </div>

            <div className="flex flex-col gap-3 items-start w-full mr-5">
              <OverviewStats matchesData={fetchedMatchesData} />
              <UserMatches matchesData={fetchedMatchesData}></UserMatches>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
