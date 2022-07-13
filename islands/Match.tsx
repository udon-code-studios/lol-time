/** @jsx h */
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { tw } from "@twind";
import * as riot from "riot";
import * as assets from "league/assets/mod.ts";

export default function Match(props: { matchId: string; region: keyof typeof riot.routes.Platform }) {
  const [match, setMatch] = useState<{ status: string; match?: riot.MatchDTO }>();

  useEffect(() => {
    fetch(`/api/match?id=${props.matchId}&region=${props.region}`).then((res) => {
      res.json().then((data) => {
        setMatch(data);
      });
    });
  }, [props]);

  return (
    <div class={tw`w-full flex justify-center gap-4`}>
      {match?.status} {match?.match?.metadata?.matchId}
    </div>
  );
}
