const _ = require('lodash');
const Twitter = require('twitter-lite');

const consumerKey = process.env.TWITTER_CONSUMER_KEY;
const consumerSecret = process.env.TWITTER_CONSUMER_SECRET;
let bearerToken = process.env.TWITTER_BEARER_TOKEN;
let app = null;

async function getBearerToken() {
  const user = new Twitter({
    consumer_key: consumerKey,
    consumer_secret: consumerSecret,
  });

  const res = await user.getBearerToken();

  if (res.errors) {
    const err = _.head(res.errors);
    throw new Error(`Twitter API error ${err.code}: ${err.message}`);
  } else {
    return res.access_token;
  }
}

async function authenticate() {
  if (_.isEmpty(bearerToken)) {
    try {
      bearerToken = await getBearerToken();
    } catch (err) {
      throw err;
    }
  }

  app = new Twitter({
    bearer_token: bearerToken,
  });

  try {
    await app.get('statuses/user_timeline', { screen_name: 'TwitterAPI', count: 1 });
  } catch (res) {
    const err = _.head(res.errors);
    throw new Error(`Twitter API error ${err.code}: ${err.message}`);
  }
}

module.exports = {
  authenticate,
  getApp: () => app,
};
