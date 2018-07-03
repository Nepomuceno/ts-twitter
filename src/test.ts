import { Twitter } from "./index";
import * as dotenv from "dotenv";
dotenv.load();

let twitter = new Twitter(
  process.env.TWITTER_CONSUMER_KEY,
  process.env.TWITTER_CONSUMER_SECRET
);

twitter.getUserTimeline({ screen_name: "similola", exclude_replies: false, count: 3000 })
  .then(t => {
    console.log(t.length);
    t.forEach(v => {
      console.info(v.text);
    });
  }) ;
