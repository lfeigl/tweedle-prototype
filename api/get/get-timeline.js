/* eslint no-await-in-loop: 0 */

const _ = require('lodash');
const authentication = require('../../utils/authentication.js');

const CONST_PARAMS = {
  count: 200,
  trim_user: true,
  include_rts: false,
  tweet_mode: 'extended',
};

module.exports = async (res, userParams) => {
  if (!userParams.screen_name) return res.sendStatus(400);

  const params = {
    ...userParams,
    ...CONST_PARAMS,
  };

  const client = authentication.getClient();
  let timeline = [];
  let timelineChunk = [];
  let lastId = null;
  let duplicate = null;

  do {
    try {
      if (lastId) params.max_id = lastId;
      timelineChunk = await client.get('statuses/user_timeline', params);
      lastId = _.last(timelineChunk).id_str;
      timeline = timeline.concat(timelineChunk);
      duplicate = timeline.pop();
    } catch (error) {
      throw error;
    }
  } while (timelineChunk.length > 1);

  res.sendStatus(200);

  timeline.push(duplicate);

  return _.filter(timeline, 'extended_entities').reverse();
};
