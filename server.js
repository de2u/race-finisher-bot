require('dotenv').config();
const tmi = require("tmi.js");
const client = new tmi.Client({
    connection: {
      reconnect: true
    },
    identity: {
        username: process.env.TWITCH_BOT_USERNAME,
        password: process.env.TWITCH_OAUTH_TOKEN,
      },
    channels: [
      'twitch_channel_name'
    ]
  });
  
  client.connect();
  client.on('message', async (channel, context, message) => {
    const isNotBot = context.username.toLowerCase() !== process.env.TWITCH_BOT_USERNAME.toLowerCase();
  
    if ( isNotBot ) {
      client.say(channel, `Responding to ${context.username} message: ${message}`);
    }
  });