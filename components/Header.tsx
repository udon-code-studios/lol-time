import Search from "../components/Search.tsx";
import LightDarkToggle from "../islands/LightDarkToggleIcon.tsx";

export default function Header() {
  return (
    <div class="w-full pb-4 flex justify-between gap-8 flex-wrap">
      <a href="/" class="font-serif font-semibold text-4xl whitespace-nowrap">LoL Time</a>
      <div class="flex items-center gap-8">
        <Search hideSearch />
        <LightDarkToggle />
      </div>
    </div>
  );
}
