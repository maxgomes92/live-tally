import axios from "axios";

const CACHE_TTL_IN_MINUTES = Number.parseInt(process.env.CACHE_TTL_IN_MINUTES!);

export type KickChannel = { stream: { viewer_count: number } };

class KickApi {
  private adapter;

  private clientId;
  private clientSecret;
  private credentials: { accessToken: string; expiresAt: number } | undefined;

  private streamCache: Map<
    string,
    { stream: KickChannel["stream"]; expireAt: number }
  > = new Map();

  constructor() {
    this.clientId = process.env.KICK_CLIENT_ID!;
    this.clientSecret = process.env.KICK_CLIENT_SECRET!;

    if (!this.clientId || !this.clientSecret) {
      throw new Error("Missing KICK_CLIENT_ID and/or KICK_CLIENT_SECRET");
    }

    this.adapter = axios.create({
      baseURL: "https://api.kick.com/public/v1",
    });
  }

  private async updateCredentials() {
    const payload = new URLSearchParams();
    payload.append("client_id", this.clientId);
    payload.append("client_secret", this.clientSecret);
    payload.append("grant_type", "client_credentials");

    const { data: response } = await this.adapter.post<{
      access_token: string;
      expires_in: number;
    }>("https://id.kick.com/oauth/token", payload, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    });

    this.credentials = {
      accessToken: response.access_token,
      expiresAt: new Date().getTime() + response.expires_in,
    };

    console.info("[KickApi]: access token update");
  }

  private async checkCredentials() {
    if (this.credentials && this.credentials.expiresAt > new Date().getTime()) {
      console.info("[KickApi]: access token from cache");
      return;
    }

    await this.updateCredentials();
  }

  async getStream(slug: string) {
    const streamCache = this.streamCache.get(slug);

    if (streamCache && streamCache.expireAt > new Date().getTime()) {
      console.info(`[KickApi]: stream from channel '${slug}' from cache`);
      return streamCache.stream;
    }
    
    await this.checkCredentials();
    
    console.info(`[KickApi]: fetch stream from channel '${slug}'`);

    const { data: response } = await this.adapter.get<{
      data: KickChannel[];
    }>(`/channels?slug=${slug}`, {
      headers: { Authorization: "Bearer " + this.credentials?.accessToken },
    });

    if (!response.data[0]) {
      return null;
    }

    const stream = response.data[0].stream;

    this.streamCache.set(slug, {
      expireAt: new Date().getTime() + 1000 * 60 * CACHE_TTL_IN_MINUTES,
      stream,
    });

    return stream;
  }
}

export const kickApi = new KickApi();
