import HenrikDevValorantAPI from "unofficial-valorant-api";

const formatData = (data) => ({
  puuid: data.puuid,
  region: data.region,
  accountLevel: data.account_level,
  name: data.name,
  tag: data.tag,
  smallAvatar: data.card.small,
});

function formatMatchData(data, userName, tag) {
  //console.log("format match dat");
  const recentMatches = data.map((match) => {
    const myPlayer = match.players.all_players.find((player) => {
      const matchAccount =
        player.name.toLowerCase() === userName.toLowerCase() &&
        player.tag.toLowerCase() === tag.toLowerCase();
      return matchAccount;
    });

    return {
      kills: myPlayer.stats.kills,
      deaths: myPlayer.stats.deaths,
      assists: myPlayer.stats.assists,
      score: myPlayer.stats.score,
    };
    //console.log(myPlayer);
  });
  return recentMatches;
}

const ValMatchesData = ({ region, userName, tag }) => {
  const VAPI = new HenrikDevValorantAPI();

  const fetchData = async () => {
    try {
      const response = await VAPI.getMatches({
        region: region,
        name: userName,
        tag: tag,
        size: 5,
      });
      //console.log(response);
      //formatMatchData(response.data, userName, tag);
      return formatMatchData(response.data, userName, tag);
    } catch (error) {
      console.error("Error fetching Valorant API:", error);
      return null;
    }
  };

  return fetchData;
};

export default ValMatchesData;
