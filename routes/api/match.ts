import { HandlerContext } from "$fresh/server.ts";
import * as riot from "riot";

export const handler = async (_req: Request, _ctx: HandlerContext): Promise<Response> => {
  const url = new URL(_req.url);
  const matchId = url.searchParams.get("id");
  const region = url.searchParams.get("region") as keyof typeof riot.routes.Platform;

  if (!matchId) {
    return new Promise((resolve) => {
      resolve(new Response(JSON.stringify({ error: "missing 'id' param" })));
    });
  }
  if (!region) {
    return new Promise((resolve) => {
      resolve(new Response(JSON.stringify({ error: "missing 'region' param" })));
    });
  }

  const match = await riot.match.match(matchId, {
    region: riot.routes.PlatformToRegional(riot.routes.Platform[region]),
  });

  return new Promise((resolve) => {
    resolve(new Response(JSON.stringify(match)));
  });
};
