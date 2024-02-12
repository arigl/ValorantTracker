import HenrikDevValorantAPI, { Regions } from "unofficial-valorant-api";

interface ValorantMMRData {
  currenttierpatched: number;
  mmr_change_to_last_game: number;
  images: {
    small: string;
  };
}

const formatData = (data: ValorantMMRData | null) => {
  if (data === null) {
    return null; // Return null if data is null
  }

  return {
    rankText: String(data.currenttierpatched),
    rankImage: data.images.small,
    prevRankChange: data.mmr_change_to_last_game,
  };
};

const ValMMRData = (region: Regions, userName: string, tag: string) => {
  const VAPI = new HenrikDevValorantAPI();

  const fetchData = async () => {
    try {
      const response = await VAPI.getMMRHistory({
        region: region,
        name: userName,
        tag: tag,
      });

      // Perform a null check on response.data
      if (response.data === null) {
        return null;
      }

      // Ensure response.data is an array before accessing its elements
      if (Array.isArray(response.data) && response.data.length > 0) {
        console.log(response.data);
        return formatData(response.data[0] as ValorantMMRData);
      } else {
        // Handle case where response.data is not an array or is empty
        console.error("Unexpected response data:", response.data);
        return null;
      }
    } catch (error) {
      console.error("Error fetching Valorant API:", error);
      return null;
    }
  };

  return fetchData;
};

export default ValMMRData;
