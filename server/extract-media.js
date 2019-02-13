const _ = require('lodash');
const path = require('path');
const fs = require('fs');
const https = require('https');
const moment = require('moment');
const mediaDir = path.resolve('media');

module.exports = (tweets) => {
    let lastDate = null;
    let dateCounter = 1;
    tweets.forEach((tweet) => {
        const twitterDate = new Date(tweet.created_at);
        const tpmdlDate = moment(twitterDate).format('YYYY-MM-DD');
        tweet.extended_entities.media.forEach((media) => {
            let url = null;
            let ext = null;

            lastDate === tpmdlDate ? dateCounter++ : dateCounter = 1;
            lastDate = tpmdlDate;

            if (media.type === 'video') {
                const extRegExp = /\/\w+$/;
                let bestVideo = _.find(media.video_info.variants, 'bitrate');

                media.video_info.variants.forEach((video) => {
                    if (video.bitrate > bestVideo.bitrate) {
                        bestVideo = video;
                    }
                });

                url = bestVideo.url;
                ext = _.head(bestVideo.content_type.match(extRegExp)).replace('/', '.');
            } else {
                const extRegExp = /\.\w+$/;

                if (media.type === 'photo') {
                    url = media.media_url_https;
                } else {
                    url = _.head(media.video_info.variants).url;
                }

                ext = _.head(url.match(extRegExp));
            }

            const fileName = `${tpmdlDate} (${dateCounter})${ext}`;
            const filePath = path.join(mediaDir, fileName);
            const fileStream = fs.createWriteStream(filePath);

            https.get(url, (res) => {
                res.pipe(fileStream);
            });
        });
    });
};
