import { Options } from "$fresh/plugins/twind.ts";

export default {
  selfURL: import.meta.url,
  darkMode: "class",
  mode: "silent",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito"],
        serif: ["Cormorant SC"],
      },
    },
  },
  preflight: {
    // Import external stylesheet
    "@import": `url('https://fonts.googleapis.com/css2?family=Cormorant+SC:wght@300;400;500;600;700&family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap')`,
  },
} as Options;
