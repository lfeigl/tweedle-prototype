const _ = require('lodash');
const authentication = require('../authentication.js');
const CONST_PARAMS = {
    count: 200,
    trim_user: true,
    include_rts: false,
    tweet_mode: 'extended',
};

module.exports = async (res, params) => {
    if (!params.screen_name) return res.sendStatus(400);

    params = {
        ...params,
        ...CONST_PARAMS,
    };

    const app = authentication.getApp();
    let timeline = [];
    let timelineChunk = [];
    let lastId = null;
    let duplicate = null;

    do {
        try {
            if (lastId) params.max_id = lastId;
            timelineChunk = await app.get('statuses/user_timeline', params);
            lastId = _.last(timelineChunk).id_str;
            timeline = timeline.concat(timelineChunk);
            duplicate = timeline.pop();
        } catch (err) {
            return err;
        }
    } while (timelineChunk.length > 1);

    res.sendStatus(200);

    timeline.push(duplicate);

    return _.filter(timeline, 'extended_entities').reverse();
};
