import { JSXInternal } from "https://esm.sh/v95/preact@10.11.0/src/jsx.d.ts";
import { useEffect, useState } from "preact/hooks";
import * as riot from "riot";
import * as icons from "../components/icons.tsx";
import Match from "../components/Match.tsx";

export default function Matches(props: { puuid: string; region: keyof typeof riot.routes.Platform }) {
  const [loadingState, setLoadingState] = useState<"loading" | "complete" | "failed">("loading");
  const [newMatchIds, setNewMatchIds] = useState<string[]>([]);
  const [matches, setMatches] = useState<{
    match: riot.MatchDTO;
    player: riot.MatchDTO["info"]["participants"][0];
  }[]>([]);

  // fetch five match IDs on load
  useEffect(() => {
    fetchMatchIds(5);
  }, [props]);

  // fetch match info whenever new match IDs are loaded
  useEffect(() => {
    newMatchIds.forEach((id) => fetchMatch(id));
  }, [newMatchIds]);

  /** fetch 'count' more matches replace newMatchIds */
  const fetchMatchIds = (count: number) => {
    setLoadingState("loading");
    const startIndex = (matches?.length !== undefined) ? matches.length : 0;
    fetch(`/api/matches?puuid=${props.puuid}&region=${props.region}&count=${count}&start=${startIndex}`)
      .then((res) => {
        res.json().then((data: { status: string; matches?: string[] }) => {
          data.matches && setNewMatchIds(data.matches);
          setLoadingState("complete");
        }).catch(() => {
          console.log("[ ERROR ] Failed to load matches.");
          setLoadingState("failed");
        });
      });
  };

  /** fetch match data and add to matches */
  const fetchMatch = (matchId: string) => {
    fetch(`/api/match?id=${matchId}&region=${props.region}`).then((res) => {
      res.json().then((data: { status: string; match?: riot.MatchDTO }) => {
        const match = data.match;
        const player = data.match?.info.participants.find((participant) => participant.puuid === props.puuid);
        match && player && setMatches((oldMatches) => [...oldMatches, { match: match, player: player }]);
      });
    });
  };

  if (loadingState === "loading") {
    return <div class="w-full flex flex-col justify-center gap-4 text-center">loading matches...</div>;
  }

  if (loadingState === "failed") {
    return <div class="w-full flex flex-col justify-center gap-4 text-center">[ ERROR ] Failed to load matches.</div>;
  }

  return (
    <div class="w-full flex flex-col justify-center items-center gap-4">
      {/* matches */}
      {matches.map((match) => <Match match={match.match} player={match.player} region={props.region} />)}

      {/* load more matches button */}
      <div class="w-min flex space-x-2 p-3 border-1 border-current" onClick={() => fetchMatchIds(10)}>
        <p class="text-sm whitespace-nowrap">load more</p>
        <icons.PhCaretDoubleDownLight class="w-5" />
      </div>
    </div>
  );
}
