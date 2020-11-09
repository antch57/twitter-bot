const express = require('express');
const Tweet = require('../models/tweetModel');
const saveTweet = require('../utils/tweetSave');
const sendTweet = require('../utils/tweetSend');

const router = new express.Router();

router.get('/', (req, res) => {
        res.render('index', {
            title: 'random ant thoughts',
            name: 'worked'
        })
});

router.get('/tweet/save', async (req, res) => {
    if(!req.query.tweet) {
        return res.send({
            error: 'You must submit something dude...'
        });
    } else if (req.query.tweet.length > 280){
        return res.send({
            error: 'tweet is too long.'
        })
    };
    try {
        const tweet = await saveTweet(req.query.tweet);
        res.send({
            message: tweet
        });    
    } catch (e) {
        console.log(e);
        res.status(500).send()
    }
});

router.get('/tweet', async (req, res) => {
    try {
        const send = await sendTweet();
        console.log(send);
        res.send("cron job.");
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;