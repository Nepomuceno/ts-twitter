# TS Twitter

An oppinionated twitter library for query (in the future interact) with twitter

```typescript
import { Twitter } from "ts-twitter";

let twitter = new Twitter(
  process.env.TWITTER_CONSUMER_KEY,
  process.env.TWITTER_CONSUMER_SECRET
);

twitter.getUserTimeline({ screen_name: "gbico" })
  .then(tweets => {
    console.log(tweets);
});
```

## Installation

```sh
npm install ts-twitter --save
yarn add ts-twitter
```

## Goals

1. The goal it si to be able to manage twitter including a type consistent library

## Contributing

### Generating new version

```bash
npm version patch -m "Version %s - {your version annotation}"
git push origin master --tags
npm publish
```
