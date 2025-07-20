import { google, youtube_v3 } from "googleapis";

const CACHE_TTL_IN_MINUTES = Number.parseInt(process.env.CACHE_TTL_IN_MINUTES!);

class YoutubeApi {
  private apiClient: youtube_v3.Youtube;
  private streamCache: Map<
    string,
    { stream: youtube_v3.Schema$Video; expireAt: number }
  > = new Map();

  constructor() {
    const apiKey = process.env.YOUTUBE_API_KEY;

    if (!apiKey) {
      throw new Error("Missing TWITCH_CLIENT_ID and/or TWITCH_CLIENT_SECRET");
    }

    this.apiClient = google.youtube({
      version: "v3",
      auth: apiKey,
    });
  }

  async getStream(videoId: string) {
    const streamCache = this.streamCache.get(videoId);

    if (streamCache && streamCache.expireAt > new Date().getTime()) {
      console.info(`[YouTubeApi]: stream from channel '${videoId}' from cache`);
      return streamCache.stream;
    }

    const { data: response } = await this.apiClient.videos.list({
      part: ["liveStreamingDetails", "snippet"],
      id: [videoId],
    });

    const stream = response.items?.[0];

    if (stream) {
      this.streamCache.set(videoId, {
        expireAt: new Date().getTime() + 1000 * 60 * CACHE_TTL_IN_MINUTES,
        stream,
      });
    }

    return stream;
  }
}

export const youtubeApi = new YoutubeApi();
