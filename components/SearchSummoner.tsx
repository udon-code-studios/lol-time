/** @jsx h */
import { h } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { tw } from "@twind";

export default function SearchSummoner() {
  return (
    <div class={tw`flex gap-2 w-full`}>
      <form action="/summoner">
        <input type="text" name="name" placeholder="Summoner name..." />
        <button type="submit" disabled={!IS_BROWSER} class={tw`border-2 p-1`}>
          Search
        </button>
      </form>
    </div>
  );
}
