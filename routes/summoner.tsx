/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { tw } from "@twind";
import * as riot from "riot";
import * as assets from "league/assets/mod.ts";
import { capitalize } from "../utils/funcs.ts";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import Profile from "../components/Profile.tsx";

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

    const matches = await riot.match.byPuuid(summoner.summoner.puuid, {
      region: riot.routes.PlatformToRegional(riot.routes.Platform[region]),
    });
    console.log(matches);
    if (matches.status !== 200 || !matches.matches) {
      return ctx.render({ query: query, summoner: summoner.summoner, leagueEntry: leagueEntry.leagueEntry });
    }

    return ctx.render({
      query,
      summoner: summoner.summoner,
      leagueEntry: leagueEntry.leagueEntry,
      matches: matches.matches,
    });
  },
};

export default function SummonerProfile({ data }: PageProps<Data>) {
  const { query, summoner, leagueEntry, matches } = data;

  /** Ranked Solo/Duo 5v5 LeagueEntryDTO */
  const rankedSolo5v5LeagueEntry = leagueEntry?.find((entry) => entry.queueType === "RANKED_SOLO_5x5");
  /** e.g. GOLD */
  const rankedSolo5v5Tier = rankedSolo5v5LeagueEntry &&
    rankedSolo5v5LeagueEntry.tier as keyof typeof assets.tiers.OldEmblems;
  /** e.g. III */
  const rankedSolo5v5Division = rankedSolo5v5LeagueEntry &&
    rankedSolo5v5LeagueEntry.rank;
  /** e.g. Platinum IV */
  const rankedSolo5v5Rank = rankedSolo5v5Tier ? `${capitalize(rankedSolo5v5Tier)} ${rankedSolo5v5Division}` : "";

  return (
    <div class={tw`min-h-screen min-w-screen dark:bg-black dark:text-gray-100`}>
      <div
        class={tw`min-h-screen flex flex-col justify-between items-center p-8 mx-auto max-w-screen-md gap-14`}
      >
        <div class={tw`w-full flex flex-col gap-8`}>
          <Header />
          {summoner && leagueEntry && <Profile summoner={summoner} leagueEntry={leagueEntry} />}
          <div class={tw`border-t-1 w-3/4 mx-auto border-current`} />
          <div>
            <p class={tw`font-bold`}>Last 20 matches:</p>
            <pre>{JSON.stringify(matches, null, 2)}</pre>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
