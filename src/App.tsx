import "./App.css";
import "./styles.css";
import UserProfile from "./components/UserProfile";
import UserRankInfo from "./components/UserRankInfo";
import ValMMRData from "./data/ValMMRData";
import ValMMRLifetimeData from "./data/ValMMRLifetimeData";
import ValUserData from "./data/ValUserData";
import ValMatchesData from "./data/ValMatchesData";
import { useState, useEffect } from "react";
import UserMatches from "./components/UserMatches";
import OverviewStats from "./components/OverviewStats";
import ModeSelect from "./components/ModeSelect";
import LoginScreen from "./components/LoginScreen";

function App() {
  const [fetchedUserData, setFetchedUserData] = useState(null);
  const [fetchedMMRData, setFetchedMMRData] = useState(null);
  const [fetchedLifetimeMMRData, setFetchedLifetimeMMRData] = useState(null);
  const [fetchedUnratedMatchesData, setFetchedUnratedMatchesData] =
    useState(null);
  const [fetchedCompetitiveMatchesData, setFetchedCompetitiveMatchesData] =
    useState(null);
  const [fetchedMatchesData, setFetchedMatchesData] = useState(null);
  const [modeSelected, selectMode] = useState<string>("competitive");
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    console.log("use effect");
    if (fetchedUserData != null) {
      if (modeSelected === "competitive") {
        console.log("competitive");
        console.log(fetchedCompetitiveMatchesData);
        setFetchedMatchesData(fetchedCompetitiveMatchesData);
      } else if (modeSelected === "unrated") {
        console.log("unrated");
        console.log(fetchedUnratedMatchesData);
        setFetchedMatchesData(fetchedUnratedMatchesData);
      }
    }
    return () => {
      console.log("Component unmounted or modeSelected changed.");
    };
  }, [modeSelected]);

  useEffect(() => {
    // Check if currentUser is not an empty string
    if (currentUser !== "") {
      // Call handleFetchData when currentUser changes
      handleFetchData();
    }
  }, [currentUser]);

  function goBackHome() {
    setCurrentUser("");
  }

  const handleFetchData = async () => {
    //   puuid: fetchedData.puuid,
    //   region: fetchedData.region,
    //   accountLevel: fetchedData.accountLevel,
    //   name: fetchedData.name,
    //   tag: fetchedData.tag,
    // Find the index of "#"
    console.log("current user");
    console.log(currentUser);
    const hashIndex = currentUser.indexOf("#");
    let user = "";
    let tag = "";
    // Check if "#" is present in the string
    if (hashIndex !== -1) {
      // Get substring before "#"
      user = currentUser.substring(0, hashIndex);

      // Get substring from "#" onwards
      tag = currentUser.substring(hashIndex + 1);

      console.log(user); // Output: "Hex"
      console.log(tag); // Output: "#mos"
    } else {
      // Handle case where "#" is not present
      console.log("No '#' found in the string.");
    }

    const fetchUserData = ValUserData({ userName: user, tag: tag });
    const userData = await fetchUserData();
    setFetchedUserData(userData);

    const fetchMMRData = ValMMRData({
      region: "NA",
      userName: user,
      tag: tag,
    });
    const mmrData = await fetchMMRData();
    setFetchedMMRData(mmrData);

    const fetchLifeMMRData = ValMMRLifetimeData({
      version: "v2",
      region: "NA",
      userName: user,
      tag: tag,
    });
    const mmrLifeData = await fetchLifeMMRData();
    setFetchedLifetimeMMRData(mmrLifeData);

    const fetchCompetitiveMatchesData = ValMatchesData({
      region: "NA",
      userName: user,
      tag: tag,
      modeFilter: "competitive",
    });
    const competitiveData = await fetchCompetitiveMatchesData();
    setFetchedCompetitiveMatchesData(competitiveData);
    setFetchedMatchesData(competitiveData);

    const fetchUnratedMatchesData = ValMatchesData({
      region: "NA",
      userName: user,
      tag: tag,
      modeFilter: "unrated",
    });
    const unratedData = await fetchUnratedMatchesData();
    setFetchedUnratedMatchesData(unratedData);
    //setFetchedMatchesData(matchesData);
  };

  const handleSelectMode = (mode: string) => {
    selectMode(mode);
  };

  return (
    <>
      {currentUser == "" && (
        <LoginScreen
          userName={currentUser}
          setUsername={setCurrentUser}
          fetchAPIData={handleFetchData}
        />
      )}

      {currentUser != "" && (
        <div className="flex flex-col">
          <div className="flex flex-row justify-between bg-slate-300 h-12">
            <UserProfile userData={fetchedUserData} />
            <div className="flex flex-row items-center flex-grow text-center">
              {/* <h1 className="text-xs flex-1">Overview</h1>
            <h1 className="text-xs flex-1">Matches</h1>
            <h1 className="text-xs flex-1">Agents</h1>
            <h1 className="text-xs flex-1">Maps</h1>
            <h1 className="text-xs flex-1">Weapons</h1> */}
            </div>

            <button
              className="bg-slate-500 text-white text-xs rounded-xl p-1 pl-3 pr-3 mt-2 mb-2 mr-5 text-sm hover:bg-slate-400"
              onClick={goBackHome}
            >
              Home
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
                  <UserRankInfo
                    mmrData={fetchedMMRData}
                    mmrLifeData={fetchedLifetimeMMRData}
                  />
                )}
              </div>

              <div className="flex flex-col gap-3 items-start w-full mr-5">
                <OverviewStats matchesData={fetchedMatchesData} />
                <UserMatches matchesData={fetchedMatchesData}></UserMatches>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
