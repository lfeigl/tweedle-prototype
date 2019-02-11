const _ = require('lodash');
const path = require('path');
const fs = require('fs');
const https = require('https');
const mediaDir = path.resolve('media');

module.exports = (tweets) => {
    tweets.forEach((tweet) => {
        tweet.extended_entities.media.forEach((media) => {
            let url = null;
            let ext = null;

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

            const filePath = path.join(mediaDir, media.id_str + ext);
            const fileStream = fs.createWriteStream(filePath);

            https.get(url, (res) => {
                res.pipe(fileStream);
            });
        });
    });
};
