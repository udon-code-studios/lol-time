/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import * as icons from "./icons.tsx";

export default function Footer() {
  return (
    <div class={tw`w-full flex flex-col gap-2`}>
      {/* <div class={tw`w-full border-1 border-current`} /> */}
      <div class={tw`w-full flex justify-between items-end gap-8`}>
        <a href="https://udon.studio" target="_blank">
          <div>
            <icons.UdonLogoBgBlack class={tw`w-24 dark:w-0`} />
            <icons.UdonLogoBgWhite class={tw`w-0 dark:w-24`} />
          </div>
        </a>

        <div class={tw`flex gap-4 pr-4`}>
          <a href="https://github.com/udon-code-studios/lol-time" target="_blank" class={tw`hover:underline`}>GitHub</a>
          <a href="mailto:leo.battalora@gmail.com" target="_blank" class={tw`hover:underline`}>Email</a>
          <a href="https://twitter.com/subpar_program" target="_blank" class={tw`hover:underline`}>Twitter</a>
        </div>
      </div>
      <div class={tw`w-full border-1 border-current`} />
      <p class={tw`text-xs`}>
        Copyright © 2022 Udon Code Studios. All rights reserved.
      </p>
    </div>
  );
}
