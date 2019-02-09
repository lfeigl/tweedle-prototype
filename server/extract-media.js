const _ = require('lodash');
const path = require('path');
const fs = require('fs');
const https = require('https');
const mediaDir = path.resolve('media');
const MEDIA_TYPES = {
    photo: {
        ext: '.jpg',
        url: 'media_url_https',
    },
    video: {
        ext: '.mp4',
        url: null,
    },
    animated_gif: {
        ext: '.mp4',
        url: 'video_info.variants[0].url',
    },
};

module.exports = (tweets) => {
    tweets.forEach((tweet) => {
        tweet.extended_entities.media.forEach((media) => {
            const ext = MEDIA_TYPES[media.type].ext;
            const filePath = path.join(mediaDir, media.id_str + ext);
            const fileStream = fs.createWriteStream(filePath);
            let url = null;

            if (media.type === 'video') {
                let bestVideo = _.head(media.video_info.variants);

                media.video_info.variants.forEach((video) => {
                    if (video.bitrate > bestVideo.bitrate) {
                        bestVideo = video;
                    }
                });

                url = bestVideo.url;
            } else {
                url = _.get(media, MEDIA_TYPES[media.type].url);
            }

            https.get(url, (res) => {
                res.pipe(fileStream);
            });
        });
    });
};
