import { Icons } from "../../icons";

const ICON_SIZE = 32;

// Reference: /widgets/viewers/?platform=twitch&font=Arial&c=0101017f#ffffff

export default function Widget() {
  return (
    <main className="flex flex-row justify-between">
      <Counter
        icon={<Icons.kick width={ICON_SIZE} height={ICON_SIZE} />}
        viewers={3035}
      />
      <Counter
        icon={<Icons.twitch width={ICON_SIZE} height={ICON_SIZE} />}
        viewers={1810}
      />
      <Counter
        icon={<Icons.youtube width={ICON_SIZE} height={ICON_SIZE} />}
        viewers={2060}
      />
    </main>
  );
}

const Counter = ({
  icon,
  viewers,
}: {
  icon: React.ReactNode;
  viewers: number;
}) => (
  <div
    className="flex flex-row flex-wrap items-center gap-2 px-3 py-2 text-3xl"
    style={{
      backgroundColor: "rgba(1, 1, 1, 0.498)",
      color: "white",
      fontWeight: "bold",
      borderRadius: 16,
    }}
  >
    {icon}

    <h1>{viewers}</h1>
  </div>
);
