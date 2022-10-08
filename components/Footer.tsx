import { tw } from "twind";
import * as icons from "./icons.tsx";

export default function Footer() {
  return (
    <div class="w-full flex flex-col gap-2">
      {/* <div class={tw`w-full border-1 border-current`} /> */}
      <div class="w-full flex justify-between items-end gap-8">
        <a href="https://udon.studio" target="_blank">
          <div>
            <icons.UdonLogoBgBlack class="w-16 sm:w-20 dark:w-0" />
            <icons.UdonLogoBgWhite class="w-0 dark:w-16 sm:dark:w-20" />
          </div>
        </a>

        <div class="flex gap-4 pr-4">
          <a href="https://github.com/udon-code-studios/lol-time" target="_blank" class="hover:underline">GitHub</a>
          <a href="mailto:leo.battalora@gmail.com" target="_blank" class="hover:underline">Email</a>
          <a href="https://twitter.com/subpar_program" target="_blank" class="hover:underline">Twitter</a>
        </div>
      </div>
      <div class="w-full border-1 border-current" />
      <p class="text-xs">
        Copyright © 2022 Udon Code Studios. All rights reserved.
      </p>
    </div>
  );
}
