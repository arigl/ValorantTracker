import { useEffect } from "react";
import HenrikDevValorantAPI from "unofficial-valorant-api";

const formatData = (data) => ({
  puuid: data.puuid,
  region: data.region,
  accountLevel: data.account_level,
  name: data.name,
  tag: data.tag,
  smallAvatar: data.card.small,
});

const ValUserData = ({ userName, tag }) => {
  const VAPI = new HenrikDevValorantAPI();

  const fetchData = async () => {
    try {
      const response = await VAPI.getAccount({
        name: userName,
        tag: tag,
      });
      //console.log(response.data);
      return formatData(response.data);
    } catch (error) {
      console.error("Error fetching Valorant API:", error);
      return null;
    }
  };

  return fetchData;
};

export default ValUserData;
