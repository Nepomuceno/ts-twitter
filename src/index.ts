import got from "got";
import { Tweet } from "./interfaces";

export class Twitter {
  _twitter_api: string = "https://api.twitter.com/1.1/";
  _oauth2_url: string = "https://api.twitter.com/oauth2/token";
  client_id: string;
  client_secret: string;
  application_key?: string;
  application_secret?: string;
  access_token?: string;

  constructor(
    client_id?: string,
    client_secret?: string,
    application_key?: string,
    application_secret?: string,
    access_token?: string
  ) {
    if (!client_id) throw "Client_id must be defined";
    if (!client_secret) throw "client_secret must be defined";
    this.client_id = client_id;
    this.client_secret = client_secret;
    if (application_key) this.application_key = application_key;
    if (application_secret) this.application_secret = application_secret;
    if (access_token) {
      this.access_token = access_token;
    } else this.GetOAuthToken();
  }

  async getUserTimeline(
    parameters: UserTimelineOptions
  ): Promise<Array<Tweet>> {
    if (!this.access_token) {
      await this.GetOAuthToken();
    }
    let body = await this.getFromApi("statuses/user_timeline", parameters);
    
    let content: Array<Tweet> = JSON.parse(body);
    return content;
  }
  
  async GetOAuthToken(): Promise<void> {
    var userIdEncoded = Buffer.from(
      `${encodeURI(this.client_id)}:${encodeURI(this.client_secret)}`
    ).toString("base64");
    try {
      console.log(`Basic ${userIdEncoded}`);
      let postResult = await got.post(`${this._oauth2_url}`, {
        headers: {
          Authorization: `Basic ${userIdEncoded}`,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "grant_type=client_credentials"
      });
      console.log(postResult);
      this.access_token = JSON.parse(postResult.body).access_token;
    } catch (err) {
      console.log(err);
    }
  }

  private async getFromApi(url: string, parameters: object): Promise<string> {
    var result = await got.get(`${this._twitter_api}${url}.json`, {
      headers: { Authorization: `Bearer ${this.access_token}` },
      query: parameters
    });
    return result.body;
  }
}

export class UserTimelineOptions {
  user_id?: number;
  screen_name?: string;
  since_id?: number;
  count?: number;
  max_id?: number;
  trim_user?: boolean;
  exclude_replies?: boolean;
  include_rts?: boolean;
  constructor() {}
}
