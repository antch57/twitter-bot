const Tweet = require('../models/tweetModel');

const tweetSave = async (data) => {
    try {
        if(!data) {
            return {
                status: 204,
                message: "enter something dude..."
            }
        };

        const tweet = new Tweet({ "tweet" : data });
        await tweet.save();
        return {
            status: 201,
            message: "tweet saved"
        }
    } catch (e) {
        console.log(e);
        return {
            status: 500,
            error: "system error"
        }
    };    
};

module.exports = tweetSave;