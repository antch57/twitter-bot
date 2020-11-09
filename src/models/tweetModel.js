const mongoose = require('mongoose');
const Twitter = require('twitter');

const tweetSchema = new mongoose.Schema({
    tweet: {
        type: String,
        required: true,
        maxlength: 280
    },

    completed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// initialize client
tweetSchema.methods.initialize = function () {
    const client = new Twitter({
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token_key: process.env.ACCESS_TOKEN_KEY,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET
    });
    return client
};

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;