import { useState } from "react";
import { Separator } from "@/components/ui/separator";

import "../styles.css";

function getTotalShots(data) {
  let headshots = 0;
  let bodyshots = 0;
  let legshots = 0;
  for (let i = 0; i < data.length; i++) {
    console.log("data");
    headshots += data[i].headshots;
    bodyshots += data[i].bodyshots;
    legshots += data[i].legshots;
  }

  return { headshots, bodyshots, legshots };
}
const ShotGraph = (props: { matchData }) => {
  console.log(props.matchData);
  const shotArray = getTotalShots(props.matchData);
  return (
    <div className="flex flex-col justify-center ml-5 p-5 pt-2 border mt-2 rounded w-full">
      <div className="flex flex-row justify-between">
        <h1 className="text-center mb-2 font-bold">Accuracy</h1>
        <p className="opacity-50">Last {props.matchData.length} matches</p>
      </div>

      <Separator className="bg-black opacity-10 mb-3"></Separator>
      {props.matchData && (
        <div className="flex flex-row gap-5 pt-5 pb-5">
          <img src="/accuracy.png" width={70}></img>
          <div className="flex flex-col">
            <h1 className="font-bold">
              Head:{" "}
              <span className="font-normal">
                {(
                  (shotArray.headshots /
                    (shotArray.headshots +
                      shotArray.bodyshots +
                      shotArray.legshots)) *
                  100
                ).toFixed(1)}
                %
              </span>
              {""}
              <span className="ml-2">{shotArray.headshots} shots</span>
            </h1>

            <h1 className="font-bold">
              Body:{" "}
              <span className="font-normal">
                {(
                  (shotArray.bodyshots /
                    (shotArray.headshots +
                      shotArray.bodyshots +
                      shotArray.legshots)) *
                  100
                ).toFixed(1)}
                %
              </span>
              {""}
              <span className="ml-2">{shotArray.bodyshots} shots</span>
            </h1>
            <h1 className="font-bold">
              Leg:{" "}
              <span className="font-normal">
                {(
                  (shotArray.legshots /
                    (shotArray.headshots +
                      shotArray.bodyshots +
                      shotArray.legshots)) *
                  100
                ).toFixed(1)}
                %
              </span>
              {""}
              <span className="ml-2">{shotArray.legshots} shots</span>
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShotGraph;
