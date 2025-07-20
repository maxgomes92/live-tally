import { twitchApi } from "@/app/api/twitch";
import { Icons } from "@/app/icons";
import { SearchParams } from "@/app/types";
import { z } from "zod";

const ICON_SIZE = 32;

// http://localhost:3000/widgets/viewers?y=gaules&t=gaules&k=gaules&c=0101017f&f=russo%20one

const paramsScheme = z.object({
  y: z.string(), // youtube channel
  t: z.string(), // twitch channel
  k: z.string(), // kick channel
  c: z.string(), // color
  f: z.enum([
    "arial",
    "times new roman",
    "brush script mt",
    "copperplate",
    "helvética",
    "verdana",
    "georgia",
    "decorative",
    "impact",
    "teko",
    "russo one",
  ]), // font-family
});

type Props = {
  searchParams?: Promise<SearchParams>;
};

export default async function ViewersWidget({ searchParams }: Props) {
  const params = paramsScheme.parse(await searchParams);
  const counterStyle = {
    fontFamily: params.f,
  };

  let twitchStream;

  try {
    twitchStream = params.t ? await twitchApi.getStream(params.t) : null;
  } catch {
    twitchStream = { viewers: -1 };
  }

  return (
    <main className="flex flex-row justify-between">
      <Counter
        icon={<Icons.kick width={ICON_SIZE} height={ICON_SIZE} />}
        viewers={1810}
        style={counterStyle}
      />
      {params.t && (
        <Counter
          icon={<Icons.twitch width={ICON_SIZE} height={ICON_SIZE} />}
          viewers={twitchStream?.viewers || 0}
          style={counterStyle}
        />
      )}
      <Counter
        icon={<Icons.youtube width={ICON_SIZE} height={ICON_SIZE} />}
        viewers={2060}
        style={counterStyle}
      />
    </main>
  );
}

const Counter = ({
  icon,
  viewers,
  style,
}: {
  icon: React.ReactNode;
  viewers: number;
  style: {
    fontFamily: string;
  };
}) => (
  <div
    className="flex flex-row flex-wrap items-center gap-2 px-3 py-2 text-3xl"
    style={{
      backgroundColor: "rgba(1, 1, 1, 0.498)",
      color: "white",
      fontWeight: "bold",
      borderRadius: 14,
      fontFamily: style.fontFamily,
    }}
  >
    {icon}

    <h1>{viewers}</h1>
  </div>
);
