import { useEffect, useState } from "preact/hooks";
import * as riot from "riot";
import * as assets from "league/assets/mod.ts";
import * as queues from "league/data/queues.ts";

export default function Match(props: { puuid: string; matchId: string; region: keyof typeof riot.routes.Platform }) {
  const [match, setMatch] = useState<{ status: string; match?: riot.MatchDTO }>();
  const [player, setPlayer] = useState<riot.MatchDTO["info"]["participants"][0]>();
  const [loadingState, setLoadingState] = useState<"loading" | "complete" | "failed">("loading");

  useEffect(() => {
    setLoadingState("loading");
    fetch(`/api/match?id=${props.matchId}&region=${props.region}`).then((res) => {
      res.json().then((data: { status: string; match?: riot.MatchDTO }) => {
        setMatch(data);
        setPlayer(data.match?.info.participants.find((participant) => {
          return participant.puuid === props.puuid;
        }));
        setLoadingState("complete");
      }).catch(() => {
        setLoadingState("failed");
      });
    });
  }, [props]);

  const blueTeamParticipants = () => {
    return (match?.match?.info.participants.filter((_participant, index) => {
      return index < 5;
    }));
  };

  const redTeamParticipants = () => {
    return (match?.match?.info.participants.filter((_participant, index) => {
      return index >= 5;
    }));
  };

  const gameType = () => {
    // get queue type
    const queueId = match?.match?.info.queueId;
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

    return displayName;
  };

  if (loadingState === "loading") {
    return (
      <div class="w-full p-2 flex justify-center items-center gap-4 border-1 border-current text-center">
        loading match...
      </div>
    );
  }

  if (loadingState === "failed") {
    return (
      <div class="w-full p-2 flex justify-center items-center gap-4 border-1 border-current text-center">
        [ ERROR ] Failed to load matches.
      </div>
    );
  }

  return (
    <div class="w-full p-2 flex justify-center items-center gap-4 border-1 border-current">
      <div class="bg-blue-300 w-6 h-10" />
      <div class="flex flex-col items-center">
        <p>{gameType()}</p>
        <p>7/13 · 4:27</p>
        <p>Victory</p>
      </div>
      <div class="flex items-center gap-1">
        <img src={assets.champion.icons.get(player!.championId)} class="w-16 rounded" />
        <div class="flex flex-col items-center gap-1">
          <img src={assets.summoner.icons.get(player!.summoner1Id)} class="w-7 rounded" />
          <img src={assets.summoner.icons.get(player!.summoner2Id)} class="w-7 rounded" />
        </div>
      </div>
      <div class="flex flex-col items-center">
        <p>{player?.kills} / {player?.deaths} / {player?.assists}</p>
        <p>{player?.totalMinionsKilled} (0.0) CS</p>
      </div>
      <div class="w-20 overflow-hidden whitespace-nowrap flex flex-col items-start font-serif text-sm">
        {blueTeamParticipants()?.map((participant) => {
          return (
            <div class="flex items-center">
              <img src={assets.champion.icons.get(participant.championId)} class="w-5" />
              <p class="pl-1">{participant.summonerName}</p>
            </div>
          );
        })}
      </div>
      <div class="w-20 overflow-hidden whitespace-nowrap flex flex-col items-start font-serif text-sm">
        {redTeamParticipants()?.map((participant) => {
          return (
            <div class="flex items-center">
              <img src={assets.champion.icons.get(participant.championId)} class="w-5" />
              <p class="pl-1">{participant.summonerName}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
