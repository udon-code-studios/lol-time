/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import Search from "../components/Search.tsx";
import LightDarkToggle from "../islands/LightDarkToggleIcon.tsx";

export default function Header() {
  return (
    <div class={tw`w-full pb-4 flex justify-between gap-8`}>
      <a href="/" class={tw`font-serif font-semibold text-4xl`}>LoL Time</a>
      <div class={tw`flex items-center gap-8`}>
        <Search hideSearch />
        <LightDarkToggle />
      </div>
    </div>
  );
}
