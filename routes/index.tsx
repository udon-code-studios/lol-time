/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import SearchSummoner from "../components/SearchSummoner.tsx";

export default function Home() {
  return (
    <div class={tw`p-8 mx-auto max-w-screen-md space-y-6`}>
      <p class={tw`text-2xl font-bold`}>Get SummonerDTO by summoner name. (NA only!)</p>
      <p>“Imagine if I had a real weapon!”</p>
      <SearchSummoner />
    </div>
  );
}
