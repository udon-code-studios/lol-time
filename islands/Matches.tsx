import { useEffect, useState } from "preact/hooks";
import * as riot from "riot";
import Match from "../islands/Match.tsx";

export default function Matches(props: { puuid: string; region: keyof typeof riot.routes.Platform }) {
  const [matchIds, setMatchIds] = useState<{ status: string; matches?: string[] }>();
  const [loadingState, setLoadingState] = useState<"loading" | "complete" | "failed">("loading");

  useEffect(() => {
    setLoadingState("loading");
    fetch(`/api/matches?puuid=${props.puuid}&region=${props.region}`).then((res) => {
      res.json().then((data) => {
        setMatchIds(data);
        setLoadingState("complete");
      }).catch(() => {
        console.log("[ ERROR ] Failed to load matches.");
        setLoadingState("failed");
      });
    });
  }, [props]);

  if (loadingState === "loading") {
    return <div class="w-full flex flex-col justify-center gap-4 text-center">loading matches...</div>;
  }

  if (loadingState === "failed") {
    return (
      <div class="w-full flex flex-col justify-center gap-4 text-center">[ ERROR ] Failed to load matches.</div>
    );
  }

  return (
    <div class="w-full flex flex-col justify-center gap-4">
      {matchIds?.matches?.map((id) => {
        return <Match puuid={props.puuid} matchId={id} region={props.region} />;
      })}
    </div>
  );
}
