import { useState } from "react";
import { Separator } from "@/components/ui/separator";

import "../styles.css";

function getRankImage(rank: string) {
  if (rank) {
    const imageUrl =
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/20/smallicon.png";

    // State to store the new number
    let newNumber = 0;
    if (rank == "Iron 1") {
      newNumber = 3;
    } else if (rank == "Iron 2") {
      newNumber = 4;
    } else if (rank == "Iron 3") {
      newNumber = 5;
    } else if (rank == "Bronze 1") {
      newNumber = 6;
    } else if (rank == "Bronze 2") {
      newNumber = 7;
    } else if (rank == "Bronze 3") {
      newNumber = 8;
    } else if (rank == "Silver 1") {
      newNumber = 9;
    } else if (rank == "Silver 2") {
      newNumber = 10;
    } else if (rank == "Silver 3") {
      newNumber = 11;
    } else if (rank == "Gold 1") {
      newNumber = 12;
    } else if (rank == "Gold 2") {
      newNumber = 13;
    } else if (rank == "Gold 3") {
      newNumber = 14;
    } else if (rank == "Platinum 1") {
      newNumber = 15;
    } else if (rank == "Platinum 2") {
      newNumber = 16;
    } else if (rank == "Platinum 3") {
      newNumber = 17;
    } else if (rank == "Diamond 1") {
      newNumber = 18;
    } else if (rank == "Diamond 2") {
      newNumber = 19;
    } else if (rank == "Diamond 3") {
      newNumber = 20;
    } else if (rank == "Ascendant 1") {
      newNumber = 21;
    } else if (rank == "Ascendant 2") {
      newNumber = 22;
    } else if (rank == "Ascendant 3") {
      newNumber = 23;
    } else if (rank == "Immortal 1") {
      newNumber = 24;
    } else if (rank == "Immortal 2") {
      newNumber = 25;
    } else if (rank == "Immortal 3") {
      newNumber = 26;
    } else if (rank == "Radiant") {
      newNumber = 27;
    }

    // Use a regular expression to extract the number before "smallicon.png"
    const modifiedImageUrl = imageUrl.replace(
      /\/(\d+)\/smallicon\.png/,
      `/${newNumber}/smallicon.png`
    );

    return modifiedImageUrl;
  } else {
    return "unable to fetch";
  }
}

function formatRankSeason(season: string) {
  const episodeNumber = season.substring(1, 2);
  const actNumber = season.substring(3, 4);

  return `Episode ${episodeNumber}: Act ${actNumber}`;
}
const UserRankInfo = (props: { mmrData: any; mmrLifeData: any }) => {
  return (
    <div className="flex flex-col justify-center ml-5 p-5 pt-2 border mt-2 rounded w-full">
      <h1 className="text-center mb-2 font-bold">Current Rating:</h1>
      <Separator className="bg-black opacity-10 mb-3"></Separator>
      {props.mmrData && props.mmrLifeData && (
        <div className="flex flex-col gap-5">
          <div className="flex flex-row gap-2">
            <img
              src={props.mmrData.rankImage}
              width={40}
              height={40} // Set height to maintain 1x1 aspect ratio
              style={{ objectFit: "contain" }} // Use object-fit to prevent stretching
            />
            <div className="flex flex-col">
              <h2 className="text-sm">Current Rank:</h2>
              <h1>{props.mmrData.rankText}</h1>
            </div>
          </div>
          {props.mmrLifeData && (
            <div className="flex flex-row gap-2">
              <img
                src={getRankImage(props.mmrLifeData.highest_rank.patched_tier)}
                width={40}
                height={40} // Set height to maintain 1x1 aspect ratio
                style={{ objectFit: "contain" }} // Use object-fit to prevent stretching
              ></img>
              <div className="flex flex-col">
                <h2 className="text-sm">Peak Rank:</h2>
                <h1>{props.mmrLifeData.highest_rank.patched_tier}</h1>
                <h1>
                  {formatRankSeason(props.mmrLifeData.highest_rank.season)}
                </h1>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserRankInfo;
