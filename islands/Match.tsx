/** @jsx h */
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { tw } from "@twind";
import * as riot from "riot";
import * as assets from "league/assets/mod.ts";

export default function Match(props: { puuid: string; matchId: string; region: keyof typeof riot.routes.Platform }) {
  const [match, setMatch] = useState<{ status: string; match?: riot.MatchDTO }>();
  const [player, setPlayer] = useState<riot.MatchDTO["info"]["participants"][0]>();

  useEffect(() => {
    fetch(`/api/match?id=${props.matchId}&region=${props.region}`).then((res) => {
      res.json().then((data: { status: string; match?: riot.MatchDTO }) => {
        setMatch(data);
        console.log(data.match);
        setPlayer(data.match?.info.participants.find((participant) => {
          return participant.puuid === props.puuid;
        }));
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

  return (
    match?.match &&
    (
      <div class={tw`w-full p-2 flex justify-center items-center gap-4 border-1 border-current`}>
        <div class={tw`flex flex-col items-center`}>
          <p>Solo/Duo {match.match.info.gameMode}</p>
          <p>7/13 · 4:27</p>
          <p>Victory</p>
        </div>
        <div class={tw`flex flex-col items-center`}>
          <img src={assets.champion.icons.get(player!.championId)} class={tw`w-16`} />
        </div>
        <div class={tw`flex flex-col items-center`}>
          <p>0 / 0 / 69</p>
          <p>0 (0.0) CS</p>
        </div>
        <div class={tw`w-20 overflow-hidden whitespace-nowrap flex flex-col items-start font-serif text-sm`}>
          {blueTeamParticipants()?.map((participant) => {
            return (
              <div class={tw`flex items-center`}>
                <img src={assets.champion.icons.get(participant.championId)} class={tw`w-5`} />
                <p class={tw`pl-1`}>{participant.summonerName}</p>
              </div>
            );
          })}
        </div>
        <div class={tw`w-20 overflow-hidden whitespace-nowrap flex flex-col items-start font-serif text-sm`}>
          {redTeamParticipants()?.map((participant) => {
            return (
              <div class={tw`flex items-center`}>
                <img src={assets.champion.icons.get(participant.championId)} class={tw`w-5`} />
                <p class={tw`pl-1`}>{participant.summonerName}</p>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
}
