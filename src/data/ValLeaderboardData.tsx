// import { useEffect } from "react";

const ValLeaderboardData = ({}) => {
  const url = "https://api.henrikdev.xyz/valorant/v1/leaderboard/na";

  // const getApiKeyFromFile = async () => {
  //   try {
  //     const response = await fetch("./api-key.txt");
  //     const apiKey = await response.text();
  //     console.log("API KEY");
  //     console.log(apiKey.trim());
  //     return apiKey.trim(); // Trim any leading/trailing whitespaces
  //   } catch (error) {
  //     console.error("Error reading API key from file:", error);
  //     return null;
  //   }
  // };

  // const headers = {
  //   Authorization: apiKey,
  // };
  const fetchData = async () => {
    try {
      const apiKey = import.meta.env.VITE_API_KEY;

      if (!apiKey) {
        console.error("API key is not available.");
        return null;
      }

      const headers = {
        Authorization: apiKey,
      };
      fetch(url, { headers })
        .then((response) => {
          console.log("LEADERBOARD DATA");
          console.log(response.json());
          return response;
          // Process response here.
        })
        .catch((error: string) => {
          // Handle errors here.
          console.log(error);
          return null;
        });
    } catch (error) {
      console.error("Error fetching Valorant API:", error);
      return null;
    }
  };
  return fetchData;
};

export default ValLeaderboardData;
