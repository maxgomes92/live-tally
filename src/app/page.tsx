"use client";
import {
  Button,
  Checkbox,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { App } from "./app";
import { Counter } from "./components/counter";
import { Icons } from "./icons";
import { useEffect, useMemo, useState } from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { PlatformsIconCombo } from "./components/platforms-icon-combo";
import { capitalizeEachWord, fontFamilyList } from "./utils/constants";
import { HexAlphaColorPicker, HexColorPicker } from "react-colorful";

const ICON_SIZE = 32;

const getRandomViewers = () => Math.floor(Math.random() * 10000);

export default function HomePage() {
  const [mockViewers, setMockViewers] = useState({
    twitch: 0,
    kick: 0,
    youtube: 0,
  });
  const [url, setUrl] = useState<URL | null>(null);
  const [twitchSlug, setTwitchSlug] = useState("");
  const [kickSlug, setKickSlug] = useState("");
  const [youtubeStreamId, setYoutubeStreamId] = useState("");
  const [groupPlatforms, setGroupsPlatforms] = useState(false);
  const [typography, setTypography] = useState(fontFamilyList[0]);
  const [fontColor, setFontColor] = useState("#ffffff");
  const [bgColor, setBgColor] = useState("#0101017f");

  const counterStyle = {
    fontFamily: typography,
    backgroundColor: bgColor,
    color: fontColor,
  };

  useEffect(() => {
    setMockViewers({
      twitch: getRandomViewers(),
      kick: getRandomViewers(),
      youtube: getRandomViewers(),
    });

    if (typeof window !== "undefined") {
      setUrl(new URL(window.location.href));
    }
  }, []);

  const widgetUrl = useMemo(() => {
    const searchParams = new URLSearchParams();

    if (youtubeStreamId) searchParams.set("y", youtubeStreamId);
    if (twitchSlug) searchParams.set("t", twitchSlug);
    if (kickSlug) searchParams.set("k", kickSlug);
    searchParams.set("c", fontColor);
    searchParams.set("bg", bgColor);
    searchParams.set("f", typography);
    searchParams.set("g", groupPlatforms ? "1" : "0");

    return `${url?.origin}/widgets/viewers?${searchParams.toString()}`;
  }, [
    bgColor,
    fontColor,
    groupPlatforms,
    kickSlug,
    twitchSlug,
    typography,
    url,
    youtubeStreamId,
  ]);

  const copyWidgetUrlToClipboard = () => {
    navigator.clipboard.writeText(widgetUrl);
  };

  const isAnyStreamDefined = !!kickSlug || !!youtubeStreamId || !!twitchSlug;

  return (
    <App>
      <div className="flex min-h-screen flex-col">
        <Header />

        <main className="flex-grow bg-sky-950 font-sans text-white">
          <div className="container m-auto flex flex-col gap-10 p-4">
            <h1 className="text-center text-2xl font-bold">
              Customize your view counters
            </h1>

            <div className="flex flex-row gap-2">
              <TextField
                label="Widget URL"
                variant="outlined"
                fullWidth
                size="small"
                value={widgetUrl}
              />
              <Button
                variant="contained"
                color="success"
                className="shrink-0"
                onClick={copyWidgetUrlToClipboard}
              >
                <span className="font-bold text-gray-50">Copy</span>
              </Button>
              <Button
                variant="contained"
                href={widgetUrl}
                target="_blank"
                color="success"
                disabled={!isAnyStreamDefined}
                className="shrink-0"
              >
                <span className="pr-1 font-bold text-gray-50">Preview</span>
                <OpenInNewIcon className="text-gray-50" />
              </Button>
            </div>

            <div className="flex flex-col gap-4 bg-gray-600 p-4">
              {groupPlatforms && (
                <div className="flex flex-row justify-center">
                  <Counter
                    icon={
                      <PlatformsIconCombo
                        kick={!isAnyStreamDefined || !!kickSlug}
                        twitch={!isAnyStreamDefined || !!twitchSlug}
                        youtube={!isAnyStreamDefined || !!youtubeStreamId}
                      />
                    }
                    viewers={
                      (kickSlug ? mockViewers.kick : 0) +
                      (twitchSlug ? mockViewers.twitch : 0) +
                      (youtubeStreamId ? mockViewers.youtube : 0)
                    }
                    style={counterStyle}
                  />
                </div>
              )}

              <div className="flex flex-col items-center md:justify-between gap-4 md:flex-row">
                <div className="flex flex-col gap-2 w-65">
                  {!groupPlatforms && (
                    <div className="m-auto">
                      <Counter
                        icon={
                          <Icons.kick width={ICON_SIZE} height={ICON_SIZE} />
                        }
                        viewers={mockViewers.kick}
                        style={counterStyle}
                      />
                    </div>
                  )}

                  <TextField
                    label="Kick Slug"
                    variant="outlined"
                    value={kickSlug}
                    size="small"
                    fullWidth
                    onChange={(event) => setKickSlug(event.target.value)}
                  />
                  <span className="text-xs text-gray-50">
                    Eg: kick.com/
                    <span className="font-bold">gaules</span>
                  </span>
                </div>

                <div className="flex flex-col gap-2 w-65">
                  {!groupPlatforms && (
                    <div className="m-auto">
                      <Counter
                        icon={
                          <Icons.twitch width={ICON_SIZE} height={ICON_SIZE} />
                        }
                        viewers={mockViewers.twitch}
                        style={counterStyle}
                      />
                    </div>
                  )}
                  <TextField
                    label="Twitch Slug"
                    variant="outlined"
                    value={twitchSlug}
                    size="small"
                    fullWidth
                    onChange={(event) => setTwitchSlug(event.target.value)}
                  />
                  <span className="text-xs text-gray-50">
                    Eg: twitch.com/
                    <span className="font-bold">gaules</span>
                  </span>
                </div>

                <div className="flex flex-col gap-2 w-65">
                  {!groupPlatforms && (
                    <div className="m-auto">
                      <Counter
                        icon={
                          <Icons.youtube width={ICON_SIZE} height={ICON_SIZE} />
                        }
                        viewers={mockViewers.youtube}
                        style={counterStyle}
                      />
                    </div>
                  )}
                  <TextField
                    label="YouTube Stream ID"
                    variant="outlined"
                    value={youtubeStreamId}
                    size="small"
                    onChange={(event) => setYoutubeStreamId(event.target.value)}
                  />
                  <span className="text-xs text-gray-50 truncate">
                    Eg: youtube.com/watch?v=
                    <span className="font-bold">GQzoHropQgA</span>
                  </span>
                </div>
              </div>
              <div className="mt-10 flex flex-row items-center">
                <div className="shrink-0 flex-grow">
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={groupPlatforms}
                        onChange={() => setGroupsPlatforms(!groupPlatforms)}
                      />
                    }
                    label="Group platforms"
                  />
                </div>

                <div className="shrink-0 flex-grow">
                  <InputLabel id="typography">Typography</InputLabel>
                  <Select
                    fullWidth
                    labelId="typography"
                    id="demo-simple-select"
                    value={typography}
                    size="small"
                    label="Typography"
                    onChange={(event) => setTypography(event.target.value)}
                  >
                    {fontFamilyList.map((fontFamily) => (
                      <MenuItem key={fontFamily} value={fontFamily}>
                        {capitalizeEachWord(fontFamily)}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 md:gap-20">
                <div className="flex flex-grow flex-row items-center gap-4">
                  <TextField
                    fullWidth
                    label="Font Color"
                    variant="outlined"
                    value={fontColor}
                    size="small"
                  />
                  <HexColorPicker onChange={(color) => setFontColor(color)} />
                </div>

                <div className="flex flex-grow flex-row items-center gap-4">
                  <TextField
                    fullWidth
                    label="Background Color"
                    variant="outlined"
                    value={bgColor}
                    size="small"
                  />
                  <HexAlphaColorPicker
                    onChange={(color) => setBgColor(color)}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </App>
  );
}
