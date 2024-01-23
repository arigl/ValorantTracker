import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";

const PlayerMatchSummary = (props) => {
  console.log(props);
  const backgroundColor = props.matchResult
    ? "border-green-500"
    : "border-red-500";
  return (
    <div>
      {props.data &&
        props.data[props.index].players.all_players.map((player, index) => (
          <div key={index}>
            <div
              className={`flex flex-row w-full border gap-2 ${backgroundColor} mb-2 rounded p-3`}
            >
              <div className="flex flex-row gap-5">
                <img src={player.assets.agent.small} width={50}></img>
              </div>
              <div className="flex flex-col font-bold">
                <h1 className="font-normal">Name</h1>
                <div className="flex flex-row">
                  <p className="">{player.name}</p>
                </div>
              </div>
              <div className="flex flex-col font-bold">
                <h1 className="font-normal">K / D / A</h1>
                <div className="flex flex-row">
                  <p className="">{player.stats.kills}</p>
                  <p className="ml-2">{player.stats.deaths}</p>
                  <p className="ml-2">{player.stats.assists}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
export default PlayerMatchSummary;
