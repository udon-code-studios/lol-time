/** @jsx h */
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { tw } from "@twind";
import * as icons from "../components/icons.tsx";

export default function LightDarkToggle(props: { class?: string }) {
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
      title="Toggle Dark Mode"
      class={tw`focus:outline-none`}
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
      {darkMode ? <p {...props}>toggle light mode</p> : <p {...props}>toggle dark mode</p>}
    </button>
  );
}
