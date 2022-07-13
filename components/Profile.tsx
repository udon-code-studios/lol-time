/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import * as riot from "riot";
import * as assets from "league/assets/mod.ts";
import { capitalize } from "../utils/funcs.ts";

export default function Profile(props: { summoner: riot.SummonerDTO; leagueEntry: riot.LeagueEntryDTO[] }) {
  /** Ranked Solo/Duo 5v5 LeagueEntryDTO */
  const rankedSolo5v5LeagueEntry = props.leagueEntry.find((entry) => entry.queueType === "RANKED_SOLO_5x5");
  /** e.g. GOLD */
  const rankedSolo5v5Tier = rankedSolo5v5LeagueEntry &&
    rankedSolo5v5LeagueEntry.tier as keyof typeof assets.tiers.OldEmblems;
  /** e.g. III */
  const rankedSolo5v5Division = rankedSolo5v5LeagueEntry &&
    (rankedSolo5v5Tier == "MASTER" || rankedSolo5v5Tier == "GRANDMASTER" || rankedSolo5v5Tier == "CHALLENGER"
      ? ""
      : rankedSolo5v5LeagueEntry.rank);
  /** e.g. Platinum IV */
  const rankedSolo5v5Rank = rankedSolo5v5Tier ? `${capitalize(rankedSolo5v5Tier)} ${rankedSolo5v5Division}` : undefined;

  const winRate = rankedSolo5v5LeagueEntry &&
    Math.round(rankedSolo5v5LeagueEntry.wins / (rankedSolo5v5LeagueEntry.wins + rankedSolo5v5LeagueEntry.losses) * 100);

  return (
    <div class={tw`w-full flex justify-center gap-4`}>
      {/* Ranked Solo/Duo 5x5 Rank Emblem */}
      {rankedSolo5v5Tier
        ? <img src={assets.tiers.OldEmblems[rankedSolo5v5Tier]} class={tw`w-32`} />
        : <img src={assets.tiers.OldEmblems.UNRANKED} class={tw`w-32`} />}

      {rankedSolo5v5LeagueEntry
        ? (
          <div class={tw`flex flex-col justify-center gap-1`}>
            <p class={tw`text-3xl`}>{props.summoner.name}</p>
            <div class={tw`flex items-center text-lg`}>
              <span class={tw`font-serif text-2xl font-bold`}>{rankedSolo5v5Rank}</span>
              <span class={tw`pl-2 font-serif text-lg`}>{rankedSolo5v5LeagueEntry.leaguePoints} lp (solo/duo)</span>
            </div>
            <p class={tw`font-serif`}>
              {rankedSolo5v5LeagueEntry.wins}w {rankedSolo5v5LeagueEntry.losses}l · {winRate}%
            </p>
          </div>
        )
        : (
          <div class={tw`flex flex-col justify-center gap-1`}>
            <p class={tw`text-3xl`}>{props.summoner.name}</p>
            <div class={tw`flex items-center text-lg`}>
              <span class={tw`font-serif text-2xl font-bold`}>Unranked</span>
              <span class={tw`pl-2 font-serif text-lg`}>(solo/duo)</span>
            </div>
          </div>
        )}
    </div>
  );
}
