import { useEffect, useState } from "react";
import "../styles.css";

const LoginScreen = (props: {
  userName: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  fetchAPIData: () => Promise<void>;
}) => {
  const [usernameForm, setUsernameForm] = useState("");

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsernameForm(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("form submitted");
    console.log(usernameForm);
    props.setUsername(usernameForm);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <h1 className="text-center font-bold text-lg p-5 bg-slate-200">
        Valorant Tracker
      </h1>
      <div className="flex flex-row flex-grow">
        <div className="w-1/2 ">
          <div className="bg-slate-200 m-5 p-5 text-center">
            <h1> Leaderboards</h1>
          </div>
        </div>
        <div className="w-1/2">
          <div className="bg-slate-200 m-5 p-5 text-center">
            <h1> Login</h1>
            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                placeholder="Enter username + tag (Username#Tag)"
                value={usernameForm}
                onChange={handleUsernameChange}
                className="p-2 m-2 border border-gray-300 rounded-md"
              />
              <button
                type="submit"
                className="p-2 bg-blue-500 text-white rounded-md"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <footer className="bg-slate-200 p-5 mt-auto">
        <h1>Developed by Rigl.Dev</h1>
      </footer>
    </div>
  );
};

export default LoginScreen;
