/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { tw } from "@twind";

interface Data {
  summoner: SummonerDTO | null;
  query: string;
}

/** Summoner Data Transfer Object from the SUMMONER-V4 Riot API */
interface SummonerDTO {
  accountId: string; // Encrypted account ID. Max length 56 characters.
  profileIconId: number; // ID of the summoner icon associated with the summoner.
  revisionDate: number; // Date summoner was last modified specified as epoch milliseconds. The following events will update this timestamp: summoner name change, summoner level change, or profile icon change.
  name: string; // Summoner name.
  id: string; // Encrypted summoner ID. Max length 63 characters.
  puuid: string; // Encrypted PUUID. Exact length of 78 characters.
  summonerLevel: number; // Summoner level associated with the summoner.
}

export const handler: Handlers<Data> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const query = url.searchParams.get("name") || "";
    let summoner: SummonerDTO | null = null;

    // get SummonerDTO from Riot API
    const resp = await fetch(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${query}`, {
      headers: { "X-Riot-Token": Deno.env.get("RIOT_API_KEY") || "" },
    });
    if (resp.status !== 200) {
      return ctx.render({ summoner, query });
    }
    summoner = await resp.json();

    return ctx.render({ summoner, query });
  },
};

export default function SummonerProfile({ data }: PageProps<Data>) {
  const { summoner, query } = data;
  return (
    <div class={tw`p-8 mx-auto max-w-screen-md space-y-2`}>
      <p class={tw`text-2xl font-bold`}>Summoner Profile</p>
      <p>
        <strong>query: </strong>
        <code class={tw`italic`}>{query}</code>
      </p>

      <p class={tw`font-bold`}>SummonerDTO:</p>
      <pre>{JSON.stringify(summoner, null, 2)}</pre>

      <a href="/" class={tw`block`}>
        <button class={tw`border-2 p-1`}>Go home.</button>
      </a>
    </div>
  );
}
