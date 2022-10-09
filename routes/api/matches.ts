import { HandlerContext } from "$fresh/server.ts";
import * as riot from "riot";

export const handler = async (_req: Request, _ctx: HandlerContext): Promise<Response> => {
  const url = new URL(_req.url);
  const puuid = url.searchParams.get("puuid");
  const region = url.searchParams.get("region") as keyof typeof riot.routes.Platform;
  const count = parseInt(url.searchParams.get("count") || "5");
  const startIndex = parseInt(url.searchParams.get("start") || "0");

  if (!puuid) {
    return new Promise((resolve) => {
      resolve(new Response(JSON.stringify({ error: "missing 'puuid' param" })));
    });
  }
  if (!region) {
    return new Promise((resolve) => {
      resolve(new Response(JSON.stringify({ error: "missing 'region' param" })));
    });
  }

  const matches = await riot.match.byPuuid(puuid, {
    region: riot.routes.PlatformToRegional(riot.routes.Platform[region]),
    count: count,
    start: startIndex,
  });

  return new Promise((resolve) => {
    resolve(new Response(JSON.stringify(matches)));
  });
};
