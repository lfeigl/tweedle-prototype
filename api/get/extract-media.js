const _ = require('lodash');
const path = require('path');
const fs = require('fs');
const https = require('https');
const moment = require('moment');

const mediaDir = path.resolve('media');
const DEFAULT_PARAMS = {
  media_types: {
    photo: false,
    video: false,
    animated_gif: false,
  },
};

module.exports = (tweets, userParams) => {
  let lastDate = null;
  let dateCounter = 1;
  const params = {
    ...DEFAULT_PARAMS,
    ...userParams,
  };

  tweets.forEach((tweet) => {
    const twitterDate = new Date(tweet.created_at);
    const tweedleDate = moment(twitterDate).format('Y-MM-DD');
    const allMedia = _.filter(tweet.extended_entities.media,
      media => params.media_types[media.type]);

    allMedia.forEach((media) => {
      let url = null;
      let ext = null;
      const mediaType = {
        photo: false,
        video: false,
        animated_gif: false,
      };

      mediaType[media.type] = true;

      if (lastDate === tweedleDate) {
        dateCounter += 1;
      } else {
        dateCounter = 1;
      }

      lastDate = tweedleDate;

      if (mediaType.video) {
        const extRegExp = /\/\w+$/;
        let bestVideo = _.find(media.video_info.variants, 'bitrate');

        media.video_info.variants.forEach((video) => {
          if (video.bitrate > bestVideo.bitrate) {
            bestVideo = video;
          }
        });

        url = bestVideo.url;
        ext = bestVideo.content_type.match(extRegExp)[0].replace('/', '.');
      } else {
        const extRegExp = /\.\w+$/;

        if (mediaType.photo) {
          url = media.media_url_https;
        } else if (mediaType.animated_gif) {
          url = media.video_info.variants[0].url;
        }

        ext = url.match(extRegExp)[0];
      }

      const fileName = `${tweedleDate} (${dateCounter})${ext}`;
      const filePath = path.join(mediaDir, fileName);
      const fileStream = fs.createWriteStream(filePath);

      https.get(url, (res) => {
        res.pipe(fileStream);
      });
    });
  });

  return mediaDir;
};
