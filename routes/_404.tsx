/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

export default function NotFoundPage() {
  return (
    <div class={tw`flex flex-col p-8 mx-auto max-w-screen-md gap-6`}>
      <p class={tw`text-2xl font-bold`}>404 - Page not found!</p>
      <a href="/" class={tw`border-2 p-1 w-min whitespace-nowrap`}>Go home.</a>
    </div>
  );
}
