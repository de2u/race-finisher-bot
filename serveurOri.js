const body = require('body-parser');
const express = require('express');
const fs = require('fs');
const https = require('https');
const WebSocket = require('ws');
//clientId = fs.readFile('clientId.txt');
//secret = fs.readFile('secret.txt');
const axios = require('axios');
token = "";
const app = express();


const options = {
    key: fs.readFileSync('selfsigned.key'),
    cert: fs.readFileSync('selfsigned.crt')
};




const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '100mb'}));
// Parse the request body as JSON
var lastFinish = "";
const fileOptions = {root: '.'};

//Fonction pour récupérer le token pour l'utilisation de l'API de gestion de races.
function getToken(){
    axios.post("https://racetime.gg/o/token", {
        client_id: clientId,
        client_secret: secret,
        grant_type: "client_credentials",
        rejectUnauthorized: false
    }).then(
        function(response){
            token = response.access_token;
        }
    ).catch(
        function (error) {
        console.log(error);
    });
}

app.use(express.static("."));



app.all('/', function(request, response){
    response.sendFile("./index.html", fileOptions);

})

//Api permettant de récupérer les informations de la race entrée.
app.all('/race', function(request, response){
    console.log(request.body);
    axios.get(request.body.urlRace+"/data", {}).then(
        function(res){
            response.send(res.data);
            var wsRace = new WebSocket("wss://racetime.gg"+res.data.websocket_bot_url);
            wsRace.on('message', function(data, flags) {
            let donne = JSON.parse(data);
            if(donne.type=="race.data"){
                console.log(donne.race.entrants);
                let player = donne.race.entrants[donne.race.entrants_count_finished-1]
                if(player.status.value == 'done' && player.user.id != lastFinish){
                    lastFinish = player.user.id;
                    let time = player.finish_time.replace("(\d+)H(\d+)M(\d+)","$1:$2:$3");
                    //printTwitch(player.user.name+" "+player.status.verbose_value+" "+player.place_ordinal+" in "+time);
                }
            }
        });
    }
    ).catch(function (error){
        console.log(error);
    })
})

app.all('/twitch', function(request, response){
    //botTwitch.setUrl(request.urlChannel);
})

const server = https.createServer(options, app).listen(3123);

