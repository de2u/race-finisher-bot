const tmi = require("tmi.js");
const fs = require("fs");
tokenKey = ''
botName = ''
/*fs.readFile("token.txt", (error, data) => {
    if(error) {
        throw error;
    }
    global.tokenKey = data;
    console.log(data.toString());
});
fs.readFile("bot.txt", (error, data) => {
    if(error) {
        throw error;
    }
    global.botName=data;
    console.log(data.toString());
});*/
require('dotenv').config();
global.channelName = '';
const options = {
    options:{
        debug : true,
    },
    identity:{
        username: process.env.TWITCH_BOT_USERNAME,
        password: process.env.TWITCH_OAUTH_TOKEN,
    },
    channels:[channelName],
};
const client = new tmi.client(options);
function setChannel(channelName) {
 global.channelName = channelName
}
async function startBot(message) {
    client.connect();
}
function sendInfo(message) {
    client.on('connected',(address,port)=>{
        sendMessages(message);
        });
}
function sendMessages(message){
    client.say('fronkeybot','hello i am realy good ');
}
setChannel('fronkeybot');
startBot("dhfsskd");
client.on("chat", (fronkeybot, user, message, self) => {
    if(self) {
        return;
    }
    client.say(fronkeybot, "pong");
});
sendInfo('hello how are you my friend');

