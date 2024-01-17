import HenrikDevValorantAPI from "unofficial-valorant-api";

const formatData = (data) => ({
  //   puuid: data.puuid,
  //   region: data.region,
  //   accountLevel: data.account_level,
  //   name: data.name,
  //   tag: data.tag,
  //   smallAvatar: data.card.small,
  rankText: data.currenttierpatched,
  rankImage: data.images.small,
  prevRankChange: data.mmr_change_to_last_game,
});

const ValMMRData = ({ region, userName, tag }) => {
  const VAPI = new HenrikDevValorantAPI();

  const fetchData = async () => {
    try {
      const response = await VAPI.getMMRHistory({
        region: region,
        name: userName,
        tag: tag,
      });
      //console.log(response.data);
      return formatData(response.data[0]);
    } catch (error) {
      console.error("Error fetching Valorant API:", error);
      return null;
    }
  };

  return fetchData;
};

export default ValMMRData;
