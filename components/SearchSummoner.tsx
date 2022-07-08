/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

export default function SearchSummoner() {
  return (
    <div class={tw`w-full`}>
      <form action="/summoner" class={tw`flex gap-2`}>
        <input type="text" name="name" placeholder="Summoner name..." class={tw`border-b-1`} />
        <button type="submit" class={tw`border-2 p-1`}>
          Search
        </button>
      </form>
    </div>
  );
}
