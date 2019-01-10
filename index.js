const _ = require('lodash');
const Twitter = require('twitter-lite');
const consumerKey = process.env.TWITTER_CONSUMER_KEY;
const consumerSecret = process.env.TWITTER_CONSUMER_SECRET;
let bearerToken = process.env.TWITTER_BEARER_TOKEN;
let app = null;

authenticate();

async function authenticate() {
    if (_.isUndefined(bearerToken)) {
        bearerToken = await getBearerToken();
    }

    app = new Twitter({
        bearer_token: bearerToken,
    });
}

async function getBearerToken() {
    const user = new Twitter({
        consumer_key: consumerKey,
        consumer_secret: consumerSecret,
    });

    try {
        const res = await user.getBearerToken();
        return res.access_token;
    } catch (err) {
        catchError(err);
    }
}

function catchError(err) {
    if ('errors' in err) {
        err = err.errors[0];
        console.error(`Twitter API error ${err.code}: ${err.message}`);

        if (err.code === 88) {
            console.error('Rate limit will reset on', new Date(err._headers['x-rate-limit-reset'] * 1000));
        }
    } else {
        console.error('Non-API error:');
        console.error(err);
    }
}
