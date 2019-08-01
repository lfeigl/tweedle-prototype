const _ = require('lodash');
const TwitterClient = require('twitter-lite');

const consumerKey = process.env.TWITTER_CONSUMER_KEY;
const consumerSecret = process.env.TWITTER_CONSUMER_SECRET;
let bearerToken = process.env.TWITTER_BEARER_TOKEN;
let client = null;

async function getBearerToken() {
  client = new TwitterClient({
    consumer_key: consumerKey,
    consumer_secret: consumerSecret,
  });

  try {
    const res = await client.getBearerToken();

    return res.access_token;
  } catch (error) {
    throw error;
  }
}

async function authenticate() {
  if (_.isEmpty(bearerToken)) {
    try {
      bearerToken = await getBearerToken();
    } catch (error) {
      throw error;
    }
  }

  client = new TwitterClient({
    bearer_token: bearerToken,
  });

  try {
    await client.get('statuses/user_timeline', {
      screen_name: 'TwitterAPI',
      count: 1,
    });
  } catch (res) {
    const error = res.errors[0];
    throw new Error(`Twitter API error ${error.code}: ${error.message}`);
  }
}

module.exports = {
  authenticate,
  getClient: () => client,
};
