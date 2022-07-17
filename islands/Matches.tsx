/** @jsx h */
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { tw } from "@twind";
import * as riot from "riot";
import Match from "../islands/Match.tsx";

export default function Matches(props: { puuid: string; region: keyof typeof riot.routes.Platform }) {
  const [matchIds, setMatchIds] = useState<{ status: string; matches?: string[] }>();

  useEffect(() => {
    fetch(`/api/matches?puuid=${props.puuid}&region=${props.region}`).then((res) => {
      res.json().then((data) => {
        setMatchIds(data);
      });
    });
  }, [props]);

  return (
    <div class={tw`w-full flex flex-col justify-center gap-4`}>
      {matchIds?.matches?.map((id) => {
        return <Match puuid={props.puuid} matchId={id} region={props.region} />;
      })}
    </div>
  );
}
