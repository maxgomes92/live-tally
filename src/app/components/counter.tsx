export const Counter = ({
  icon,
  viewers,
  style,
}: {
  icon: React.ReactNode;
  viewers: number | string;
  style: {
    fontFamily?: string;
    backgroundColor?: string;
    color?: string;
  };
}) => (
  <div
    className="flex flex-row flex-wrap items-center gap-2 px-3 py-2 text-3xl"
    style={{
      // backgroundColor: "rgba(1, 1, 1, 0.6)",
      fontWeight: "bold",
      borderRadius: 14,
      fontFamily: style.fontFamily,
      color: style.color,
      backgroundColor: style.backgroundColor,
    }}
  >
    {icon}

    <h1>{viewers}</h1>
  </div>
);
