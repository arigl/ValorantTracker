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

import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import React from "react";

import "./table.css";
type Player = {
  name: string;
  acs: number;
  kills: number;
  deaths: number;
  assists: number;
  kd: number;
  adr: number;
  hs: number;
  // fk: number;
  // fd: number;
};

function formatPlayerData(data, rounds: number) {
  const playerData: Player[] = [];
  //console.log(data);
  const bluePlayers = data.blue.map((player) => ({
    name: player.name,
    acs: (player.stats.score / rounds).toFixed(0),
    kills: player.stats.kills,
    deaths: player.stats.deaths,
    assists: player.stats.assists,
    kd: (player.stats.kills / player.stats.deaths).toFixed(1),
    adr: (player.damage_made / rounds).toFixed(0),
    hs: (
      (player.stats.headshots /
        (player.stats.headshots +
          player.stats.bodyshots +
          player.stats.legshots)) *
      100
    ).toFixed(1),
    // fk: player.stats.fk,
    // fd: player.stats.fd,
  }));

  const redPlayers = data.red.map((player) => ({
    name: player.name,
    acs: (player.stats.score / rounds).toFixed(0),
    kills: player.stats.kills,
    deaths: player.stats.deaths,
    assists: player.stats.assists,
    kd: (player.stats.kills / player.stats.deaths).toFixed(1),
    adr: (player.damage_made / rounds).toFixed(0),
    hs: (
      (player.stats.headshots /
        (player.stats.headshots +
          player.stats.bodyshots +
          player.stats.legshots)) *
      100
    ).toFixed(1),
    // fk: player.stats.fk,
    // fd: player.stats.fd,
  }));

  // Concatenate blue and red players for each match
  playerData.push(...bluePlayers, ...redPlayers);
  console.log("PLAYER DATA");
  console.log(playerData);
  return playerData;
}

const columnHelper = createColumnHelper<Player>();

const columns = [
  columnHelper.accessor("name", {
    header: () => "Name",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("acs", {
    header: () => "ACS",
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("kills", {
    header: () => "Kills",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("deaths", {
    header: "Deaths",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("assists", {
    header: "Assists",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("kd", {
    header: "K/D",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("adr", {
    header: "ADR",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("hs", {
    header: "HS%",
    footer: (info) => info.column.id,
  }),
  // columnHelper.accessor("fk", {
  //   header: "FK",
  //   footer: (info) => info.column.id,
  // }),
  // columnHelper.accessor("fd", {
  //   header: "FD",
  //   footer: (info) => info.column.id,
  // }),
];

const PlayerMatchSummary = (props) => {
  console.log(props);
  // const backgroundColor = props.matchResult
  //   ? "border-green-500"
  //   : "border-red-500";
  const [data, setData] = React.useState(() => [
    ...formatPlayerData(
      props.data[props.index].players,
      props.data[props.index].metadata.rounds_played
    ),
  ]);
  const rerender = React.useReducer(() => ({}), {})[1];

  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    columns,
    data,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: " 🔼",
                          desc: " 🔽",
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {/* <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot> */}
      </table>
      {/* {props.data &&
        props.data[props.index].players.blue.map((player, index) => (
          <div key={index}>
            <div
              className={`flex flex-row w-full border gap-2 ${backgroundColor} mb-2 rounded p-3`}
            >
              <div className="flex flex-row gap-5">
                <img src={player.assets.agent.small} width={40}></img>
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
      <div>
        <h1 className="bg-red-500">Team B</h1>
      </div>
      {props.data &&
        props.data[props.index].players.red.map((player, index) => (
          <div key={index} className="mb-0">
            <div
              className={`flex flex-row w-full border gap-2 ${backgroundColor} mb-2 rounded p-3`}
            >
              <div className="flex flex-row gap-5">
                <img src={player.assets.agent.small} width={40}></img>
              </div>
              <div className="flex flex-col">
                <p className="font-bold">{player.name}</p>
                <p className="">{player.currenttier_patched}</p>
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
        ))} */}
    </div>
  );
};
export default PlayerMatchSummary;
