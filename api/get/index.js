const getTimeline = require('./get-timeline.js');
const extractMedia = require('./extract-media.js');
const finalize = require('./finalize.js');

module.exports = async (req, res, next) => {
  const params = req.body;

  try {
    const tweets = await getTimeline(res, params);
    const mediaDir = extractMedia(tweets, params);
    finalize(mediaDir);
  } catch (err) {
    next(err);
  }
};
