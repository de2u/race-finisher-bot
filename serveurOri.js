const body = require('body-parser');
const express = require('express');
const fs = require('fs');
const clientId = fs.readFile('clientId.txt');
const secret = fs.readFile('secret.txt');
const axios = require('axios');
token = "";
const app = express();



const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '100mb'}));
// Parse the request body as JSON

const fileOptions = {root: '.'};

function getToken(){
    axios.post("https://racetime.gg/o/token", {
        client_id: clientId,
        client_secret: secret,
        grant_type: "client_credentials"
    }).then(
        function(response){
            token = response.access_token;
        }
    )
}

function createRace(){
    truc;
}



app.get('/', function(request, response){
    response.sendFile("./truc.html", fileOptions);
})

app.post('/truc', function(request, response){

})

app.post('/machin', function(request, response){

})

app.listen(3123);