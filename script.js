function darkwhiteMode() {

    if (document.getElementById("nameMode").innerText == "Light Mode") {
        document.getElementById("nameMode").innerText = "Dark Mode";
        $(cssSwitch).attr('href', 'https://maxcdn.bootstrapcdn.com/bootswatch/4.2.1/flatly/bootstrap.min.css');
        $(theadColor).toggleClass("bugColor");
        setCookie("light");
    } else {
        document.getElementById("nameMode").innerText = "Light Mode";
        $(cssSwitch).attr('href', 'https://maxcdn.bootstrapcdn.com/bootswatch/4.2.1/darkly/bootstrap.min.css');
        $(theadColor).toggleClass("bugColor");
        setCookie("dark");
    }

}

function setCookie(cvalue) {
    const d = new Date();
    d.setTime(d.getTime() + (365*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = "theme=" + cvalue + ";" + expires;
}

function getCookie() {
    let name = "theme=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function lauchTheme(){
    let tmp = getCookie();
    switch (tmp) {
        case "light":
            document.getElementById("nameMode").innerText = "Dark Mode";
            $(cssSwitch).attr('href', 'https://maxcdn.bootstrapcdn.com/bootswatch/4.2.1/flatly/bootstrap.min.css');
            $(theadColor).toggleClass("bugColor");
            break;
        case "":
        case "dark":
            document.getElementById("nameMode").innerText = "Light Mode";
            $(cssSwitch).attr('href', 'https://maxcdn.bootstrapcdn.com/bootswatch/4.2.1/darkly/bootstrap.min.css');
            break;
    }
}

$(document).ready(function() {
    lauchTheme();

    $(urlRaceButton).click(function() {
        var url = $(urlRace).val();
        $.post("https://pedago.univ-avignon.fr:3123/race", { urlRace: url }, function(result) {
            var user= [{}];
            console.log(result);
            console.log("ds");
            $.getJSON(result, function(data) {
                /*data.race.entrants.forEach(element => {
                    user.push({"place":element.place,"icon":null,"name": element.user.name,"status":element.status.value,"time":element.finish_time})
                    //user.push(element); //we get the user, all the info
                });*/
                fillTable(data.race.entrants);

            });
        });
        var item = { "palce": 1, "icon": "url", "name": "test1", "status": "test2", "time": 2 };
        var demo = [item, item, item, item];
        //fillTable(user);
    });

    $(urlChannelButton).click(function (){
        var url = $(urlChannel).val();
        url = isUrl(url);
        $.post("https://pedago.univ-avignon.fr:3123/race", { urlChannel: url }, function(result) {
            console.log(result);
            socket = new WebSocket('wss://racetime.gg'+result.websocket_url);


            // Écouter les messages
            socket.addEventListener('message', function (event) {
                $.getJSON(event, function(data) {
                    $("tableauScore").append(data.renders.entrants);

                });

            });
        });
    });


});

function isUrl(message)
{
    var url = new RegExp('^https?:');

    if (!url.test(VAL)) {
        return "https://www.twitch.tv/"+message;
    }
    return message;
}

function fillTable(arr) {
    arr.forEach(element => {
        console.log(element);
    });
    arr.forEach(element => {
        var ligne1 = "<tr class='table-dark'><th>" + element.palce + "</th>";
        var ligne2 = "<th scope='row'><img src='' alt='icon' width='22' height='22'>" + element.name + "</th>";
        var ligne3 = "<th>" + element.status + "</th>";
        var ligne4 = "<th>" + element.time + "</th></tr>";
        var ligneEnd = ligne1 + ligne2 + ligne3 + ligne4;
        $("table tbody").append(ligneEnd);

    });
}

