import { ErrorPageProps } from "$fresh/server.ts";

export default function Error500Page({ error }: ErrorPageProps) {
  return (
    <div class="flex flex-col p-8 mx-auto max-w-screen-md gap-6">
      <p class="text-2xl font-bold">500 - Internal server error!</p>
      <p class="italic">{(error as Error).message}</p>
      <a href="/" class="border-2 p-1 w-min whitespace-nowrap">Go home.</a>
    </div>
  );
}
