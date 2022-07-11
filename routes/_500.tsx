/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { ErrorPageProps } from "$fresh/server.ts";

export default function Error500Page({ error }: ErrorPageProps) {
  return (
    <div class={tw`flex flex-col p-8 mx-auto max-w-screen-md gap-6`}>
      <p class={tw`text-2xl font-bold`}>500 - Internal server error!</p>
      <p class={tw`italic`}>{(error as Error).message}</p>
      <a href="/" class={tw`border-2 p-1 w-min whitespace-nowrap`}>Go home.</a>
    </div>
  );
}
