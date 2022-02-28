const body = require('body-parser');
const express = require('express');
const fs = require('fs');
const https = require('https');
//clientId = fs.readFile('clientId.txt');
//secret = fs.readFile('secret.txt');
const axios = require('axios');
token = "";
const app = express();


const options = {
    key: fs.readFileSync('selfsigned.key'),
    cert: fs.readFileSync('selfsigned.crt')};




const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '100mb'}));
// Parse the request body as JSON

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


app.get('/', function(request, response){
    response.sendFile("./truc.html", fileOptions);
})

//Api permettant de récupérer les informations de la race entrée.
app.all('/race', function(request, response){
    axios.get(request.body.urlRace+"/data", {
    }).then(
        function(res){
            console.log(res.data);
            response.send(res.data);
        }
    ).catch(function (error){
        console.log(error);
    })
})


https.createServer(options, app).listen(3123);