import { Platform } from "riot/api/routes.ts";
import * as icons from "./icons.tsx";

export default function Search(props: { hideSearch?: boolean }) {
  return (
    <div class="w-full">
      <form action="/summoner" class="flex gap-2">
        <input
          type="text"
          name="name"
          placeholder="Summoner name..."
          class="border-b-1 border-current focus:outline-none dark:bg-black"
        />
        <select name="region" class="h-8 dark:text-black">
          {Object.keys(Platform).map((key) => {
            // default to NA1
            return (
              <option value={key} selected={(key === "NA1") ? true : false}>
                {key}
              </option>
            );
          })}
        </select>
        <button type="submit" hidden={props.hideSearch} class="p-1">
          <icons.PhMagnifyingGlassBold class="w-6" />
        </button>
      </form>
    </div>
  );
}
