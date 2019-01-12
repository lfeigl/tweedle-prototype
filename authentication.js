const _ = require('lodash');
const Twitter = require('twitter-lite');
const consumerKey = process.env.TWITTER_CONSUMER_KEY;
const consumerSecret = process.env.TWITTER_CONSUMER_SECRET;
let bearerToken = process.env.TWITTER_BEARER_TOKEN;

module.exports = authenticate;

async function authenticate() {
    if (_.isEmpty(bearerToken)) {
        bearerToken = await getBearerToken();
    }

    return new Twitter({
        bearer_token: bearerToken,
    });
}

async function getBearerToken() {
    const user = new Twitter({
        consumer_key: consumerKey,
        consumer_secret: consumerSecret,
    });

    const res = await user.getBearerToken();
    return res.access_token;
}
