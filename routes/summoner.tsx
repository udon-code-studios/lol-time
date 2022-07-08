/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { tw } from "@twind";
import * as riot from "../utils/riot-api-types.d.ts";

interface Data {
  query: string;
  summoner: riot.SummonerDTO | null;
  leagueEntry: riot.LeagueEntryDTO | null;
  matches: string[];
}

export const handler: Handlers<Data> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const query = url.searchParams.get("name") || "";
    let summoner: riot.SummonerDTO | null = null;
    let leagueEntry: riot.LeagueEntryDTO | null = null;
    let matches: string[] = [];

    // get SummonerDTO from Riot API
    let resp = await fetch(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${query}`, {
      headers: { "X-Riot-Token": Deno.env.get("RIOT_API_KEY") || "" },
    });
    if (resp.status !== 200) {
      return ctx.render({ query, summoner, leagueEntry, matches });
    }
    summoner = await resp.json();

    // get LeagueEntryDTO from Riot API
    resp = await fetch(`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summoner?.id}`, {
      headers: { "X-Riot-Token": Deno.env.get("RIOT_API_KEY") || "" },
    });
    leagueEntry = await resp.json();

    // get UNIX time in seconds 7 days ago
    const start = Math.floor(new Date(Date.now() - 7 * (1000 * 60 * 60 * 24)).getTime() / 1000);

    // get Matches from Riot API
    resp = await fetch(
      `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${summoner?.puuid}/ids?startTime=${start}&count=100`,
      {
        headers: { "X-Riot-Token": Deno.env.get("RIOT_API_KEY") || "" },
      }
    );
    matches = await resp.json();

    return ctx.render({ query, summoner, leagueEntry, matches });
  },
};

export default function SummonerProfile({ data }: PageProps<Data>) {
  const { query, summoner, leagueEntry, matches } = data;
  return (
    <div class={tw`p-8 mx-auto max-w-screen-md space-y-2`}>
      <p class={tw`text-2xl font-bold`}>Summoner Profile</p>

      <a href="/" class={tw`block`}>
        <button class={tw`border-2 p-1`}>Go home.</button>
      </a>

      <p>
        <strong>query: </strong>
        <code class={tw`italic`}>{query}</code>
      </p>

      <p class={tw`font-bold`}>SummonerDTO:</p>
      <pre>{JSON.stringify(summoner, null, 2)}</pre>

      <p class={tw`font-bold`}>LeagueEntryDTO:</p>
      <pre>{JSON.stringify(leagueEntry, null, 2)}</pre>

      <p class={tw`font-bold`}>Last week of matches:</p>
      <pre>{JSON.stringify(matches, null, 2)}</pre>
    </div>
  );
}
