import { useEffect, useState } from "preact/hooks";
import * as riot from "riot";
import * as assets from "league/assets/mod.ts";
import * as queues from "league/data/queues.ts";
import { formatDuration } from "../utils/funcs.ts";

export default function Match(props: { match: riot.MatchDTO; player: riot.MatchDTO["info"]["participants"][0] }) {
  const isWin = () => {
    const playerTeam = props.match.info.teams.find((team) => team.teamId == props.player.teamId);
    return (playerTeam) ? playerTeam?.win : false;
  };

  const blueTeamParticipants = () => {
    return (props.match.info.participants.filter((_participant, index) => {
      return index < 5;
    }));
  };

  const redTeamParticipants = () => {
    return (props.match.info.participants.filter((_participant, index) => {
      return index >= 5;
    }));
  };

  const gameType = () => {
    // get queue type
    const queueId = props.match.info.queueId;
    const queue = queues.info.find((queue) => queue.queueId == queueId);

    // filter display name
    let displayName = queue?.description;
    displayName = displayName?.replace(" games", ""); // remove " games" suffix
    displayName = displayName?.replace("5v5 ", ""); // remove "5v5 " prefix
    switch (queue?.queueId) {
      case 420: // 5v5 Ranked Solo games
        displayName = "Ranked Solo";
        break;
      case 440: // 5v5 Ranked Flex games
        displayName = "Ranked Flex";
        break;
      case 400: // 5v5 Draft Pick games
      case 430: // 5v5 Blind Pick games
        displayName = "Normal";
        break;
      default:
        displayName = displayName?.replace(" games", ""); // remove potential " games" suffix
        displayName = displayName?.replace("5v5 ", ""); // remove potential "5v5 " prefix
    }

    return (displayName) ? displayName : "";
  };

  return (
    <div class="w-full p-2 flex justify-center items-center gap-4 border-1 border-current">
      {isWin() ? <div class="bg-blue-300 w-6 h-12" /> : <div class="bg-red-300 w-6 h-12" />}
      <div class="flex flex-col items-center">
        <p class="text-sm font-bold">{gameType()}</p>
        <p class="text-sm">{formatDuration(props.match.info.gameDuration)}</p>
        <p class="text-sm">{isWin() ? "Victory" : "Defeat"}</p>
      </div>
      <div class="flex items-center gap-1">
        <img src={assets.champion.icons.get(props.player.championId)} class="w-16 rounded" />
        <div class="flex flex-col items-center gap-1">
          <img src={assets.summoner.icons.get(props.player.summoner1Id)} class="w-7 rounded" />
          <img src={assets.summoner.icons.get(props.player.summoner2Id)} class="w-7 rounded" />
        </div>
      </div>
      <div class="flex flex-col items-center">
        <p class="font-bold">{props.player.kills} / {props.player.deaths} / {props.player.assists}</p>
        <p class="text-sm">{props.player.totalMinionsKilled} (0.0) CS</p>
      </div>

      {/* blue team participants */}
      <div class="w-20 overflow-hidden whitespace-nowrap flex flex-col items-start font-serif text-sm -space-y-1">
        {blueTeamParticipants().map((participant) => {
          return (
            <div class="flex items-center">
              <img src={assets.champion.icons.get(participant.championId)} class="w-4" />
              <p class="pl-1 text-sm">{participant.summonerName}</p>
            </div>
          );
        })}
      </div>

      {/* read team participants */}
      <div class="w-24 overflow-hidden whitespace-nowrap flex flex-col items-start font-serif text-sm -space-y-1">
        {redTeamParticipants().map((participant) => {
          return (
            <div class="flex items-center">
              <img src={assets.champion.icons.get(participant.championId)} class="w-4" />
              <p class="pl-1 text-sm">{participant.summonerName}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
