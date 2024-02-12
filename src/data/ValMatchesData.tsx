import HenrikDevValorantAPI, { Modes, Regions } from "unofficial-valorant-api";

interface MatchData {
  players: {
    all_players: {
      stats: {
        kills: number;
        deaths: number;
        assists: number;
        score: number;
        headshots: number;
        bodyshots: number;
        legshots: number;
      };
      assets: {
        agent: {
          small: string;
        };
      };
      damage_made: number;
      damage_received: number;
      character: string;
      team: string;
    };
  };
  teams: {
    blue: {
      has_won: boolean;
      rounds_won: number;
      rounds_lost: number;
    };
    red: {
      rounds_won: number;
      rounds_lost: number;
    };
  };
  rounds: {
    length: number;
  };
  metadata: {
    map: string;
    mode: string;
  };
}
// const formatData = (data) => ({
//   puuid: data.puuid,
//   region: data.region,
//   accountLevel: data.account_level,
//   name: data.name,
//   tag: data.tag,
//   smallAvatar: data.card.small,
// });

function formatMatchData(
  data: [MatchData] | null,
  userName: string,
  tag: string
) {
  if (data === null) {
    return null;
  }
  const recentMatches = data.map((match) => {
    const rounds = match.rounds.length;
    let hasWon = "Blue";
    if (match.teams.blue.has_won == false) {
      hasWon = "Red";
    }
    const map = match.metadata.map;
    const mode = match.metadata.mode;
    let roundWins = 0;
    let roundLosses = 0;
    //console.log(rounds);
    const myPlayer = Array.isArray(match.players.all_players)
      ? match.players.all_players.find(
          (player: { name: string; tag: string }) => {
            const matchAccount =
              player.name.toLowerCase() === userName.toLowerCase() &&
              player.tag.toLowerCase() === tag.toLowerCase();
            return matchAccount;
          }
        )
      : null;

    let playerWinLose = false;
    if (hasWon == myPlayer.team) {
      playerWinLose = true;
    } else {
      //console.log(hasWon);
    }
    if (myPlayer.team == "Blue") {
      console.log("Blue ");
      roundWins = match.teams.blue.rounds_won;
      roundLosses = match.teams.blue.rounds_lost;
    } else {
      console.log("Red ");
      roundWins = match.teams.red.rounds_won;
      roundLosses = match.teams.red.rounds_lost;
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
      map: map,
      mode: mode,
      roundWins: roundWins,
      roundLosses: roundLosses,
      matchData: data,
      // rounds: myPlayer.rounds.length,
    };
    //console.log(myPlayer);
  });
  return recentMatches;
}
//{ region, userName, tag, modeFilter }
const ValMatchesData = (
  region: Regions,
  userName: string,
  tag: string,
  modeFilter: Modes
) => {
  const VAPI = new HenrikDevValorantAPI();
  // console.log(modeFilter);
  const fetchData = async () => {
    try {
      const response = await VAPI.getMatches({
        region: region,
        name: userName,
        tag: tag,
        filter: modeFilter,
        size: 10,
      });
      // console.log(response.data);
      //formatMatchData(response.data, userName, tag);
      return formatMatchData(response.data as [MatchData], userName, tag);
    } catch (error) {
      console.error("Error fetching Valorant API:", error);
      return null;
    }
  };

  return fetchData;
};

export default ValMatchesData;
