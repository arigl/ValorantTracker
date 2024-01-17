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
  const recentMatches = data.map((match) => {
    const rounds = match.rounds.length;
    let hasWon = "Blue";
    if (match.teams.blue.has_won == false) {
      hasWon = "Red";
    }
    //console.log(rounds);
    const myPlayer = match.players.all_players.find((player) => {
      const matchAccount =
        player.name.toLowerCase() === userName.toLowerCase() &&
        player.tag.toLowerCase() === tag.toLowerCase();
      return matchAccount;
    });
    let playerWinLose = false;
    if (hasWon == myPlayer.team) {
      playerWinLose = true;
    } else {
      //console.log(hasWon);
    }
    // totalKills += myPlayer.stats.kills;
    // totalDeaths += myPlayer.stats.deaths;
    return {
      kills: myPlayer.stats.kills,
      deaths: myPlayer.stats.deaths,
      assists: myPlayer.stats.assists,
      score: myPlayer.stats.score,
      agentIcon: myPlayer.assets.agent.small,
      character: myPlayer.character,
      totalDamage: myPlayer.damage_made,
      totalDamageRecieved: myPlayer.damage_received,
      headshots: myPlayer.stats.headshots,
      bodyshots: myPlayer.stats.bodyshots,
      legshots: myPlayer.stats.legshots,
      rounds: rounds,
      teamColor: myPlayer.team,
      matchResult: playerWinLose,
      // rounds: myPlayer.rounds.length,
    };
    //console.log(myPlayer);
  });
  return recentMatches;
}

const ValMatchesData = ({ region, userName, tag, modeFilter }) => {
  const VAPI = new HenrikDevValorantAPI();
  console.log(modeFilter);
  const fetchData = async () => {
    try {
      const response = await VAPI.getMatches({
        region: region,
        name: userName,
        tag: tag,
        filter: modeFilter,
        size: 10,
      });
      console.log(response.data);
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
