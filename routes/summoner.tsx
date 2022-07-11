/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { tw } from "@twind";
import * as riot from "riot";

interface Data {
  query?: string;
  summoner?: riot.SummonerDTO;
  leagueEntry?: riot.LeagueEntryDTO[];
  matches?: string[];
}

export const handler: Handlers<Data> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const query = url.searchParams.get("name") || "";
    const region = url.searchParams.get(
      "region",
    ) as keyof typeof riot.routes.Platform || "NA1";

    // get SummonerDTO from Riot API
    const summoner = await riot.summoner.byName(query, {
      region: riot.routes.Platform[region],
    });
    if (summoner.status !== 200 || !summoner.summoner) {
      return ctx.render({ query: query });
    }

    // get LeagueEntryDTO from Riot API
    const leagueEntry = await riot.league.bySummonerId(summoner.summoner.id, {
      region: riot.routes.Platform[region],
    });
    if (leagueEntry.status !== 200 || !leagueEntry.leagueEntry) {
      return ctx.render({ query: query, summoner: summoner.summoner });
    }

    // get UNIX time in seconds 7 days ago
    // const start = Math.floor(new Date(Date.now() - 7 * (1000 * 60 * 60 * 24)).getTime() / 1000);
    // `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${summoner?.puuid}/ids?startTime=${start}&count=100`

    return ctx.render({
      query,
      summoner: summoner.summoner,
      leagueEntry: leagueEntry.leagueEntry,
      matches: [],
    });
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
        <strong>query:</strong>
        <code class={tw`italic`}>{" "}{query}</code>
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
