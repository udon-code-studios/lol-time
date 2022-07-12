/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Platform } from "riot/api/routes.ts";
import * as icons from "./icons.tsx";

export default function SearchSummoner(props: { hideSearch?: boolean }) {
  return (
    <div class={tw`w-full`}>
      <form action="/summoner" class={tw`flex gap-2`}>
        <input
          type="text"
          name="name"
          placeholder="Summoner name..."
          class={tw`border-b-1 focus:outline-none dark:bg-black`}
        />
        <select name="region" class={tw`h-8 dark:text-black`}>
          {Object.keys(Platform).map((key) => {
            // default to NA1
            return (
              <option value={key} selected={(key === "NA1") ? true : false}>
                {key}
              </option>
            );
          })}
        </select>
        <button type="submit" hidden={props.hideSearch} class={tw`p-1`}>
          <icons.PhMagnifyingGlassBold class={tw`w-6 text-gray-300 dark:text-current`} />
        </button>
      </form>
    </div>
  );
}
