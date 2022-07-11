/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Platform } from "riot/api/routes.ts";

export default function SearchSummoner() {
  return (
    <div class={tw`w-full`}>
      <form action="/summoner" class={tw`flex gap-2`}>
        <input
          type="text"
          name="name"
          placeholder="Summoner name..."
          class={tw`border-b-1 focus:outline-none`}
        />
        <select name="region">
          {Object.keys(Platform).map((key) => {
            // default to NA1
            return (
              <option value={key} selected={(key === "NA1") ? true : false}>
                {key}
              </option>
            );
          })}
        </select>
        <button type="submit" class={tw`border-2 p-1`}>
          Search
        </button>
      </form>
    </div>
  );
}
