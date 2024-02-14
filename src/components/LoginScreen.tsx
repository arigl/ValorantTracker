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
  const [showDropdown, setShowDropDown] = useState(false);
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

  const handleUsernameSelect = (selectedUsername: string) => {
    // Handle the selected stored username as if it were submitted through the form
    setUsernameForm(selectedUsername);

    const updatedUsernames = [selectedUsername, ...storedUsernames].slice(
      0,
      MAX_HISTORY_LENGTH
    );
    localStorage.setItem("usernames", JSON.stringify(updatedUsernames));

    // Update state with the new username
    setStoredUsernames(updatedUsernames);

    // Set the username using props
    props.setUsername(selectedUsername);
  };

  const handleInputFocus = () => {
    console.log("focused");
    console.log(showDropdown);
    setShowDropDown(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      console.log("Input field lost focus");
      setShowDropDown(false);
      // Call any method you want here
    }, 100); // Adjust the delay as needed
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
            <div className="flex flex-col w-1/2 h-1/2 m-5 p-5 text-left items-center">
              <form
                onSubmit={handleFormSubmit}
                className="w-full flex flex-row"
              >
                <input
                  type="text"
                  placeholder="Find a Player, i.e. Player#NA1"
                  value={usernameForm}
                  onChange={handleUsernameChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  className="p-3 m-2 border border-gray-300 rounded-md text-black w-full"
                />
              </form>
              {showDropdown && (
                <div className="dropdown-menu fixed bg-header mt-16 pl-5 pr-5 z-20 left-10 w-1/2 rounded flex flex-col">
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-row mb-3 gap-5 items-center">
                      <button className="bg-red-500 p-3 pl-8 pr-8 rounded border">
                        Search
                      </button>
                      <Separator className="w-1 bg-primary" />
                      <button className="p-3 pl-8 pr-8 rounded border hover:bg-red-500">
                        History
                      </button>
                      <button className="bg-header p-3 pl-8 pr-8 rounded border hover:bg-red-500">
                        Favorites
                      </button>
                    </div>
                    <button className="bg-red-500 p-3 rounded m-3">
                      Reset
                    </button>
                  </div>

                  <Separator />
                  {usernameForm.length == 0 &&
                    storedUsernames.map((storedUsername, index) => (
                      <div
                        key={index}
                        onClick={async () => {
                          setUsernameForm(storedUsername);
                          setShowDropDown(false);
                          handleUsernameSelect(storedUsername);
                          console.log(storedUsername); // Ensure console log is displayed
                        }}
                        className="dropdown-item p-3 rounded hover:bg-red-500"
                      >
                        {storedUsername}
                      </div>
                    ))}
                  <div
                    className="p-3 hover:bg-red-500"
                    onClick={async () => {
                      setShowDropDown(false);
                      handleUsernameSelect(usernameForm);
                      console.log(usernameForm); // Ensure console log is displayed
                    }}
                  >
                    {usernameForm}
                  </div>
                </div>
              )}
              <div className="flex flex-row items-center gap-5 justify-center mt-5">
                <Separator className="bg-white opacity-20" />
                <h1 className="opacity-50">or</h1>
                <Separator className="bg-white opacity-20" />
              </div>
              <button className="bg-red-500 p-3 w-full mb-5 mt-5 rounded ml-5 hover:bg-red-700">
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
