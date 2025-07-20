import { ApiClient, HelixStream, HelixUser } from "@twurple/api";
import { AppTokenAuthProvider } from "@twurple/auth";

class TwitchApi {
  private apiClient;
  private usersCache: Map<string, HelixUser> = new Map();
  private streamCache: Map<string, { stream: HelixStream; expireAt: number }> =
    new Map();

  constructor() {
    const clientId = process.env.TWITCH_CLIENT_ID;
    const clientSecret = process.env.TWITCH_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error("Missing TWITCH_CLIENT_ID and/or TWITCH_CLIENT_SECRET");
    }

    const authProvider = new AppTokenAuthProvider(clientId, clientSecret);
    this.apiClient = new ApiClient({ authProvider });
  }

  private async getUser(slug: string) {
    const userCache = this.usersCache.get(slug);

    if (userCache) {
      console.info(`[TwitchApi]: user from channel '${slug}' from cache`);
    }

    const user =
      userCache ?? (await this.apiClient.users.getUserByName(slug));

    if (!user) return null;

    this.usersCache.set(slug, user);

    return user;
  }

  async getStream(channelName: string) {
    const user = await this.getUser(channelName);

    if (!user) {
      return null;
    }

    const streamCache = this.streamCache.get(channelName);

    if (streamCache && streamCache.expireAt > new Date().getTime()) {
      console.info(
        `[TwitchApi]: stream from channel '${channelName}' from cache`,
      );
      return streamCache.stream;
    }

    const stream = await user.getStream();

    if (stream) {
      this.streamCache.set(channelName, {
        expireAt: new Date().getTime() + 1000 * 60, // 1 minute
        stream,
      });
    }

    return stream;
  }
}

export const twitchApi = new TwitchApi();
