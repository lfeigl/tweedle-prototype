const _ = require('lodash');
const authentication = require('./authentication.js');
const CONST_PARAMS = {
    count: 200,
    trim_user: true,
    include_rts: false,
};

module.exports = async (req, res, next) => {
    const app = authentication.getApp();
    const params = {
        ...req.body,
        ...CONST_PARAMS,
    };
    let timeline = [];
    let timelineChunk = [];
    let lastId = null;
    let duplicate = null;

    do {
        try {
            if (lastId) {
                params.max_id = lastId;
            }

            timelineChunk = await app.get('statuses/user_timeline', params);
            lastId = _.last(timelineChunk).id_str;
            timeline = timeline.concat(timelineChunk);
            duplicate = timeline.pop();
        } catch (err) {
            return next(err);
        }
    } while (timelineChunk.length >= CONST_PARAMS.count);

    timeline.push(duplicate);
    res.send(timeline);
};
