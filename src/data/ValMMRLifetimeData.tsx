import HenrikDevValorantAPI, {
  Regions,
  MMRVersions,
} from "unofficial-valorant-api";

interface ValorantMMRData {
  currenttierpatched: number;
  mmr_change_to_last_game: number;
  patched_tier: number;
  current_data: {
    images: {
      small: string;
    };
  };
  // images: {
  //   small: string;
  // };
  highest_rank: {
    patched_tier: number;
    season: string;
  };
}

const formatData = (data: ValorantMMRData | null) => {
  if (data === null) {
    return null; // Return null if data is null
  }

  return {
    rankText: String(data.currenttierpatched),
    rankImage: data.current_data.images.small,
    prevRankChange: data.mmr_change_to_last_game,
    patched_tier: data.highest_rank.patched_tier,
    season: data.highest_rank.season,
  };
};

const ValMMRLifetimeData = (
  version: MMRVersions,
  region: Regions,
  userName: string,
  tag: string
) => {
  const VAPI = new HenrikDevValorantAPI();

  const fetchData = async () => {
    try {
      const response = await VAPI.getMMR({
        version: version,
        region: region,
        name: userName,
        tag: tag,
      });

      if (response.data === null) {
        return null;
      }

      console.log("Lifetime mmr");
      console.log(response.data);
      //return formatData(response.data[0]);
      return formatData(response.data as ValorantMMRData);
    } catch (error) {
      console.error("Error fetching Valorant API:", error);
      return null;
    }
  };

  return fetchData;
};

export default ValMMRLifetimeData;
