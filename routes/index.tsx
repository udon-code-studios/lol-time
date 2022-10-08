import Footer from "../components/Footer.tsx";
import Search from "../components/Search.tsx";
import LightDarkToggleText from "../islands/LightDarkToggleText.tsx";

export default function Home() {
  return (
    <div class="min-h-screen min-w-screen dark:bg-black dark:text-gray-100">
      <div
        class="min-h-screen flex flex-col justify-between items-center p-8 mx-auto max-w-screen-md gap-6"
      >
        <div class="py-[20%] flex flex-col gap-2">
          <p class="font-serif font-semibold text-5xl">LoL Time</p>
          <Search />
          <LightDarkToggleText class="pt-2 text-sm hover:underline" />
        </div>

        <Footer />
      </div>
    </div>
  );
}
