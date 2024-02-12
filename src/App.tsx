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
import LoadingScreen from "./components/LoadingScreen";
// import ValLeaderboardData from "./data/ValLeaderboardData";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "./components/ModeToggle";
import { Separator } from "@/components/ui/separator";
import ShotGraph from "./components/ShotGraph";
// import HenrikDevValorantAPI, { Modes, Regions } from "unofficial-valorant-api";

interface UserData {
  puuid: string;
  region: string;
  accountLevel: number;
  name: string;
  tag: string;
  smallAvatar: string;
}

interface MMRData {
  rankText: string;
  rankImage: string;
  prevRankChange: number;
}

interface MMRLifeData {
  rankText: string;
  rankImage: string;
  prevRankChange: number;
  patched_tier: number;
  season: string;
}

interface MatchData {
  kills: number;
  deaths: number;
  assists: number;
  score: number;
  agentIcon: string;
  character: string;
  totalDamage: number;
  totalDamageRecieved: number;
  headshots: number;
  bodyshots: number;
  legshots: number;
  rounds: number;
  teamColor: string;
  matchResult: boolean;
  map: string;
  mode: string;
  roundWins: number;
  roundLosses: number;
}

function App() {
  const [fetchedUserData, setFetchedUserData] = useState<UserData | null>(null);
  const [fetchedMMRData, setFetchedMMRData] = useState<MMRData | null>(null);
  const [fetchedLifetimeMMRData, setFetchedLifetimeMMRData] =
    useState<MMRLifeData | null>(null);
  const [fetchedUnratedMatchesData, setFetchedUnratedMatchesData] =
    useState<MatchData | null>(null);
  const [fetchedCompetitiveMatchesData, setFetchedCompetitiveMatchesData] =
    useState<MatchData | null>(null);

  //const [fetchedLeaderboardData, setFetchedLeaderboardData] = useState(null);
  const [fetchedMatchesData, setFetchedMatchesData] =
    useState<MatchData | null>(null);
  const [modeSelected, selectMode] = useState<string>("competitive");
  const [currentUser, setCurrentUser] = useState("");
  const [loading, toggleLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

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
    setLoadingProgress(0);
    toggleLoading(true);
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

    const fetchUserData = ValUserData(user, tag);
    const userData: UserData | null = await fetchUserData();
    setFetchedUserData(userData);
    setLoadingProgress(20);

    const fetchMMRData = ValMMRData("na", user, tag);
    const mmrData: MMRData | null = await fetchMMRData();
    setFetchedMMRData(mmrData);
    setLoadingProgress(40);

    const fetchLifeMMRData = ValMMRLifetimeData("v2", "na", user, tag);
    const mmrLifeData: MMRLifeData | null = await fetchLifeMMRData();
    setFetchedLifetimeMMRData(mmrLifeData);
    setLoadingProgress(60);

    const fetchCompetitiveMatchesData = ValMatchesData(
      "na",
      user,
      tag,
      "competitive"
    );
    const competitiveData: MatchData | null =
      await fetchCompetitiveMatchesData();
    setFetchedCompetitiveMatchesData(competitiveData);
    setFetchedMatchesData(competitiveData);
    setLoadingProgress(80);

    // const fetchLeaderBoardData = ValLeaderboardData({});
    // const leaderboardData = await fetchLeaderBoardData();
    // setFetchedLeaderboardData(leaderboardData);
    // setLoadingProgress(90);

    const fetchUnratedMatchesData = ValMatchesData("na", user, tag, "unrated");
    const unratedData = await fetchUnratedMatchesData();
    setFetchedUnratedMatchesData(unratedData);
    setLoadingProgress(100);

    toggleLoading(false);
    //setFetchedMatchesData(matchesData);
  };

  const handleSelectMode = (mode: string) => {
    selectMode(mode);
  };

  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        {currentUser == "" && (
          <LoginScreen
            userName={currentUser}
            setUsername={setCurrentUser}
            fetchAPIData={handleFetchData}
          />
        )}
        {currentUser != "" && loading && (
          <LoadingScreen bgcolor={"#6a1b9a"} completed={loadingProgress} />
        )}
        {currentUser != "" &&
          fetchedUserData &&
          fetchedLifetimeMMRData &&
          fetchedMatchesData &&
          loading == false && (
            <div className="flex flex-col">
              <div className="flex flex-row items-center justify-between h-16">
                <UserProfile userData={fetchedUserData} />
                <div className="flex flex-row items-center flex-grow text-center">
                  {/* <h1 className="text-xs flex-1">Overview</h1>
            <h1 className="text-xs flex-1">Matches</h1>
            <h1 className="text-xs flex-1">Agents</h1>
            <h1 className="text-xs flex-1">Maps</h1>
            <h1 className="text-xs flex-1">Weapons</h1> */}
                </div>
                <ModeToggle />
                <button
                  className="bg-slate-500 text-white text-xs rounded-xl p-3 pl-5 pr-5 mr-5 ml-2 text-sm hover:bg-slate-400"
                  onClick={goBackHome}
                >
                  Home
                </button>
              </div>
              <Separator className="w-11/12 ml-10" />
              <div className="flex flex-col">
                <ModeSelect
                  modeSelected={modeSelected}
                  selectMode={handleSelectMode}
                />
                <div className="flex flex-row gap-10 items-start">
                  <div className="w-1/5 flex flex-col items-start">
                    {modeSelected == "competitive" && (
                      <UserRankInfo
                        mmrData={fetchedMMRData}
                        mmrLifeData={fetchedLifetimeMMRData}
                      />
                    )}
                    <ShotGraph matchData={fetchedMatchesData} />
                  </div>

                  <div className="flex flex-col gap-3 items-start w-full mr-5">
                    <OverviewStats matchesData={fetchedMatchesData} />
                    <UserMatches matchesData={fetchedMatchesData}></UserMatches>
                  </div>
                </div>
              </div>
            </div>
          )}
      </ThemeProvider>
    </>
  );
}

export default App;
