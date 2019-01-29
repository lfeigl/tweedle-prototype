const authentication = require('./authentication.js');
const CONST_PARAMS = {
    count: 200,
    trim_user: true,
    include_rts: false,
};

module.exports = async (req, res, next) => {
    const app = authentication.getApp();

    try {
        const timeline = await app.get('statuses/user_timeline', {
            ...CONST_PARAMS,
            ...req.body,
        });

        res.send(timeline);
    } catch (err) {
        next(err);
    }
};
