import { Icons } from "@/app/icons";

type Props = {
  kick?: boolean;
  youtube?: boolean;
  twitch?: boolean;
};

export function PlatformsIconCombo({ kick, youtube, twitch }: Props) {
  return (
    <div className="flex flex-row gap-0.5">
      {kick && (
        <div className="m-auto shrink-0">
          <Icons.kick width={24} height={24} />
        </div>
      )}
      {twitch && (
        <div className="m-auto shrink-0 translate-y-0.5">
          <Icons.twitch width={28} height={28} />
        </div>
      )}
      {youtube && (
        <div className="shrink-0">
          <Icons.youtube width={32} height={32} />
        </div>
      )}
    </div>
  );
}
