import { useEffect, useState } from "preact/hooks";
import * as icons from "../components/icons.tsx";

export default function LightDarkToggle() {
  // dark mode
  const [darkMode, setDarkMode] = useState(true);
  useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  return (
    <button
      title={darkMode ? "toggle light mode" : "toggle dark mode"}
      class="focus:outline-none"
      onClick={() => {
        if (document.documentElement.classList.contains("dark")) {
          document.documentElement.classList.remove("dark");
          localStorage.theme = "light";
          setDarkMode(false);
        } else {
          document.documentElement.classList.add("dark");
          localStorage.theme = "dark";
          setDarkMode(true);
        }
      }}
    >
      {darkMode ? <icons.PhMoonBold class="w-6" /> : <icons.PhSunBold class="w-6" />}
    </button>
  );
}
