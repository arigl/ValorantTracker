import HenrikDevValorantAPI from "unofficial-valorant-api";

interface ValorantData {
  puuid: string;
  region: string;
  account_level: number;
  name: string;
  tag: string;
  card: {
    small: string;
  };
}

const formatData = (data: ValorantData | null) => {
  if (data === null) {
    return null; // Return null if data is null
  }

  return {
    puuid: data.puuid,
    region: data.region,
    accountLevel: data.account_level,
    name: data.name,
    tag: data.tag,
    smallAvatar: data.card?.small, // Added optional chaining for 'card'
  };
};

const ValUserData = (userName: string, tag: string) => {
  const VAPI = new HenrikDevValorantAPI();

  const fetchData = async () => {
    try {
      const response = await VAPI.getAccount({
        name: userName,
        tag: tag,
      });
      //console.log(response.data);
      return formatData(response.data as ValorantData);
    } catch (error) {
      console.error("Error fetching Valorant API:", error);
      return null;
    }
  };

  return fetchData;
};

export default ValUserData;
