import { kickApi, twitchApi, youtubeApi } from "@/app/api";
import { Counter } from "@/app/components/counter";
import { PlatformsIconCombo } from "@/app/components/platforms-icon-combo";
import { Icons } from "@/app/icons";
import { SearchParams } from "@/app/types";
import { fontFamilyList, isNumeric } from "@/app/utils/constants";
import { z } from "zod";

const ICON_SIZE = 32;

// http://localhost:3000/widgets/viewers?y=w1wx7riotD4&t=gaules&k=gaules&c=0101017f&f=russo%20one&g=1

const paramsScheme = z.object({
  y: z.string().optional(), // youtube channel
  t: z.string().optional(), // twitch channel
  k: z.string().optional(), // kick channel
  c: z.string().optional(), // color
  bg: z.string().optional(), // background color
  f: z.enum(fontFamilyList), // font-family
  g: z.enum(["0", "1"]), // group all viewers
});

type Props = {
  searchParams?: Promise<SearchParams>;
};

export default async function ViewersWidget({ searchParams }: Props) {
  const params = paramsScheme.parse(await searchParams);
  const counterStyle = {
    fontFamily: params.f,
    backgroundColor: params.bg,
    color: params.c,
  };

  let twitchStream;

  try {
    twitchStream = params.t ? await twitchApi.getStream(params.t) : null;
  } catch {
    twitchStream = { viewers: -1 };
  }

  let youtubeStream;

  try {
    youtubeStream = params.y ? await youtubeApi.getStream(params.y) : null;
  } catch {
    youtubeStream = { liveStreamingDetails: { concurrentViewers: -1 } };
  }

  let kickStream;

  try {
    kickStream = params.k ? await kickApi.getStream(params.k) : null;
  } catch {
    kickStream = { viewer_count: -1 };
  }

  const totalOfViewers =
    (kickStream?.viewer_count || 0) +
    (twitchStream?.viewers || 0) +
    (isNumeric(youtubeStream?.liveStreamingDetails?.concurrentViewers)
      ? Number.parseInt(
          youtubeStream?.liveStreamingDetails?.concurrentViewers as string,
        )
      : 0);

  console.log("[Widget]: Load Viewers", params);

  return (
    <main className="flex flex-row justify-between">
      {params.g === "1" ? (
        <Counter
          icon={
            <PlatformsIconCombo
              kick={!!params.k}
              youtube={!!params.y}
              twitch={!!params.t}
            />
          }
          viewers={totalOfViewers}
          style={counterStyle}
        />
      ) : (
        <>
          {params.k && (
            <Counter
              icon={<Icons.kick width={ICON_SIZE} height={ICON_SIZE} />}
              viewers={kickStream?.viewer_count || 0}
              style={counterStyle}
            />
          )}
          {params.t && (
            <Counter
              icon={<Icons.twitch width={ICON_SIZE} height={ICON_SIZE} />}
              viewers={twitchStream?.viewers || 0}
              style={counterStyle}
            />
          )}
          {params.y && (
            <Counter
              icon={<Icons.youtube width={ICON_SIZE} height={ICON_SIZE} />}
              viewers={
                youtubeStream?.liveStreamingDetails?.concurrentViewers || 0
              }
              style={counterStyle}
            />
          )}
        </>
      )}
    </main>
  );
}
