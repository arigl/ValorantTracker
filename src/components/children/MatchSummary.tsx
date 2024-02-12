import {
  Drawer,
  DrawerClose,
  DrawerContent,
  // DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  // DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";
import PlayerMatchSummary from "./PlayerMatchSummary";

const MatchSummary = (props) => {
  const backgroundColor = props.matchResult
    ? "border-green-500"
    : "border-red-500";
  return (
    <div
      className={`flex flex-row w-full border gap-2 ${backgroundColor} mb-5 rounded p-3 justify-between`}
    >
      <div className="flex flex-row gap-5">
        <img src={props.agentIcon} width={50}></img>
        <div className="flex flex-col">
          <h1 className="font-xs">{props.mode}</h1>
          <h1 className="font-bold">{props.map}</h1>
        </div>
        <div className="flex items-center">
          {props.roundsWon >= props.roundsLost && (
            <div className="flex flex-row items-center border gap-1 p-2 rounded-lg">
              <h1 className="text-green-500">{props.roundsWon}</h1>
              <h1> : </h1>
              <h1 className="text-red-500">{props.roundsLost}</h1>
            </div>
          )}
          {props.roundsWon < props.roundsLost && (
            <div className="flex flex-row items-center border gap-1 p-2 rounded-lg">
              <h1 className="text-red-500">{props.roundsWon}</h1>
              <h1> : </h1>
              <h1 className="text-green-500">{props.roundsLost}</h1>
            </div>
          )}
        </div>
        <div className="flex flex-col font-bold">
          <h1 className="font-normal">K / D / A</h1>
          <div className="flex flex-row">
            <p className="">{props.kills}</p>
            <p className="ml-2">{props.deaths}</p>
            <p className="ml-2">{props.assists}</p>
          </div>
        </div>

        {/* <h1 className="font-bold">
          Score: <span className="font-normal">{props.score}</span>
        </h1> */}
        <div className="flex flex-col">
          <h1 className="font-bold">K/D</h1>
          <p className="font-normal">
            {(props.kills / props.deaths).toFixed(2)}
          </p>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="font-bold">HS%</h1>
          <p className="font-normal">
            {(
              (props.headshots /
                (props.headshots + props.bodyshots + props.legshots)) *
              100
            ).toFixed(0)}
          </p>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="font-bold">ADR:</h1>
          <p className="font-normal">{props.adr.toFixed(2)}</p>
        </div>

        <div className="flex flex-col items-center">
          <h1 className="font-bold">ACS: </h1>
          <p className="font-normal">
            {(props.score / props.rounds).toFixed(2)}
          </p>
        </div>
      </div>
      <Drawer>
        <DrawerTrigger className="border p-3 rounded-lg hover:bg-slate-200">
          View Match
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            {/* <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription> */}
            <PlayerMatchSummary data={props.data} index={props.index} />
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
export default MatchSummary;
