const Tweet = require('../models/tweetModel');

const sendTweet = async () => {
    try {
        const tweet = await Tweet.findOne({ completed: false });
    
        if (!tweet) {
            return {
                status: 204,
                message: "No tweets found."
            };
        };
    
        const client = tweet.initialize();
        client.post('statuses/update', {status: tweet.tweet} );
        tweet.completed = true;
        await tweet.save()
        return {
            status: 201,
            message: "Tweet has been posted."
        };
    } catch (e) {
        console.log(e);
        return {
            status: 500,
            message: "server error."
        }
    };
    
};

module.exports = sendTweet;
