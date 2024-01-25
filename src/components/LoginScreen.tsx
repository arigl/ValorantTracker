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
      <div className="flex flex-row justify-between">
        <h1 className="text-center font-bold text-xl p-5">Valorant Tracker</h1>
        <div className=" mr-5 flex flex-row items-center">
          <h1 className="opacity-75 mr-4">Apperance</h1>
          <ModeToggle />
        </div>
      </div>

      <div className="flex flex-row flex-grow">
        <div className="w-1/2">
          <div className="border m-5 p-5 text-center">
            <h1> Leaderboards</h1>
          </div>
        </div>
        <div className="w-1/2">
          <div className="border m-5 p-5 text-center">
            <h1> Login</h1>
            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                placeholder="Enter username + tag (Username#Tag)"
                value={usernameForm}
                onChange={handleUsernameChange}
                className="p-2 m-2 border border-gray-300 rounded-md text-black"
              />
              <button
                type="submit"
                className="p-2 border rounded-md hover:bg-red-400"
              >
                Submit
              </button>
            </form>
            <Separator className="bg-black opacity-20 flex justify-center items-center"></Separator>
            <div className="mt-3">
              <h1>Search History:</h1>
              {storedUsernames.slice(0, 10).map((storedUsername, index) => (
                <div
                  key={index}
                  onClick={() => handleStoredUsernameSelect(storedUsername)}
                  className="border rounded mb-5 p-3 hover:bg-red-400"
                >
                  {storedUsername}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <footer className="p-5 mt-auto">
        <h1>Developed by Rigl.Dev</h1>
      </footer>
    </div>
  );
};

export default LoginScreen;
