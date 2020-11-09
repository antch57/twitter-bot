const express = require('express');
const cron = require('node-cron');
const path = require('path');
const tweet = require('./routers/tweet');
const sendTweet = require('./utils/tweetSend');
require('./db/mongoose');

const app = express();
const port = process.env.PORT;
const publicDir = path.join(__dirname, '../public');
const nodeDir = path.join(__dirname, '../node_modules');

app.use(express.json());
app.use(express.static(publicDir))
app.use(express.static(nodeDir));
app.use(tweet);
app.set('view engine', 'hbs');

cron.schedule(" 15 12 * * * ", async () => {
    console.log('in the cron job.');
    const res = await sendTweet();
    console.log(res);
});

app.get('/port', (req, res) => {
    res.send(process.env.PORT);
});
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
}); 