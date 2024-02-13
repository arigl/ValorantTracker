import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import "../styles.css";
import { ModeToggle } from "./ModeToggle";

const LoginScreen = (props: {
  userName: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  fetchAPIData: () => Promise<void>;
}) => {
  const [usernameForm, setUsernameForm] = useState("");
  const [storedUsernames, setStoredUsernames] = useState<string[]>([]);
  const MAX_HISTORY_LENGTH = 10;

  useEffect(() => {
    // Retrieve stored usernames from localStorage
    const storedUsernamesString = localStorage.getItem("usernames");
    if (storedUsernamesString) {
      const storedUsernamesArray = JSON.parse(storedUsernamesString);
      setStoredUsernames(storedUsernamesArray);
    }
  }, []);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsernameForm(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Save the input value to localStorage, keeping only the latest 10
    const updatedUsernames = [usernameForm, ...storedUsernames].slice(
      0,
      MAX_HISTORY_LENGTH
    );
    localStorage.setItem("usernames", JSON.stringify(updatedUsernames));

    // Update state with the new username
    setStoredUsernames(updatedUsernames);

    // Set the username using props
    props.setUsername(usernameForm);
  };

  const handleStoredUsernameSelect = (selectedUsername: string) => {
    // Handle the selected stored username as if it were submitted through the form
    setUsernameForm(selectedUsername);
    // Trigger form submission
    // const updatedUsernames = [selectedUsername, ...storedUsernames].slice(
    //   0,
    //   MAX_HISTORY_LENGTH
    // );
    // localStorage.setItem("usernames", JSON.stringify(updatedUsernames));

    // // Update state with the new username
    // setStoredUsernames(updatedUsernames);

    // Set the username using props
    props.setUsername(selectedUsername);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row justify-between bg-header">
        <div className="flex flex-row justify-center items-center gap-5 ml-10 pt-5 pb-5">
          <img src="/ValTrackerLogo.png" width={40}></img>
          <h1 className="text-center font-bold text-xl">Valorant Tracker</h1>
        </div>

        <div className=" mr-8 flex flex-row items-center">
          <h1 className="opacity-75 mr-4">Apperance</h1>
          <ModeToggle />
        </div>
      </div>
      <div className="flex flex-row flex-grow">
        {/* <div className="w-1/2">
          <div className="border m-5 p-5 text-center">
            <h1> Leaderboards</h1>
          </div>
        </div> */}
        <div className="w-screen flex flex-col">
          <div className="w-screen flex flex-row items-center">
            <div className="flex flex-col w-1/2 h-1/2 m-5 p-5 text-left items-center gap-8">
              {/* <h1> Login</h1> */}
              <form
                onSubmit={handleFormSubmit}
                className="w-full flex flex-row"
              >
                <input
                  type="text"
                  placeholder="Find a Player, i.e. Player#NA1"
                  value={usernameForm}
                  onChange={handleUsernameChange}
                  className="p-3 m-2 border border-gray-300 rounded-md text-black w-full"
                />
                <button
                  type="submit"
                  className="p-2 mt-2 mb-2 border rounded-md hover:bg-red-400"
                >
                  Submit
                </button>
              </form>
              {/* <Separator className="flex justify-center items-center"></Separator> */}
              {/* <div className="mt-2">
              <h1 className="mb-3">Search History:</h1>
              {storedUsernames.slice(0, 1).map((storedUsername, index) => (
                <div
                  key={index}
                  onClick={() => handleStoredUsernameSelect(storedUsername)}
                  className="border rounded mb-5 p-3 hover:bg-red-400"
                >
                  {storedUsername}
                </div>
              ))}
            </div> */}
              <div className="flex flex-row items-center gap-5 justify-center">
                <Separator className="bg-white opacity-20" />
                <h1 className="opacity-50">or</h1>
                <Separator className="bg-white opacity-20" />
              </div>
              <button className="bg-red-500 p-3 w-full mb-5 rounded ml-5 hover:bg-red-700">
                Sign in with Riot Account
              </button>
            </div>
            <div className="w-1/2 h-1/2 m-5 flex flex-row gap-10 items-center justify-center">
              <div className="bg-header flex flex-col rounded ">
                <div className="pl-10 pr-10 pt-5 pb-5">
                  <h1>SEN TenZ</h1>
                  <h1>NA #1</h1>
                </div>
                <button className="bg-red-500 text-center p-3 rounded hover:bg-red-700">
                  <p>View Leaderboard</p>
                </button>
              </div>
              <div className="bg-header flex flex-col rounded ">
                <div className="pl-10 pr-10 pt-5 pb-5">
                  <h1>FNC Derke</h1>
                  <h1>EU #1</h1>
                </div>
                <button className="bg-red-500 text-center p-3 rounded hover:bg-red-700">
                  <p>View Leaderboard</p>
                </button>
              </div>
              <div className="bg-header flex flex-col rounded ">
                <div className="pl-10 pr-10 pt-5 pb-5">
                  <h1>PRX Jingg</h1>
                  <h1>PAC #1</h1>
                </div>
                <button className="bg-red-500 text-center p-3 rounded hover:bg-red-700">
                  <p>View Leaderboard</p>
                </button>
              </div>
            </div>
          </div>
          <Separator className="mt-10 mb-10 bg-white opacity-20"></Separator>
          <div className="h-1/3 m-5 flex flex-row justify-center gap-10">
            <div className="bg-header p-5 w-1/4">
              <h1>Your Stat Overview</h1>
            </div>
            <div className="bg-header p-5 w-1/3">
              <h1>Focus on Individual Improvement</h1>
            </div>
            <div className="bg-header p-5 w-1/4">
              <h1>Identify issues with your performance</h1>
            </div>
          </div>
        </div>
      </div>
      <footer className="p-5 mt-auto bg-header flex flex-row justify-between">
        <h1 className="opacity-30">Developed by Rigl.Dev</h1>
        <h1 className="opacity-30">Not Endorsed by Riot Games</h1>
      </footer>
    </div>
  );
};

export default LoginScreen;
