function darkwhiteMode() {

    if (document.getElementById("nameMode").innerText == "Light Mode") {
        darkMode();
    } else {
        lightMode();
    }

}

function darkMode() {
    document.getElementById("nameMode").innerText = "Dark Mode";
    $(cssSwitch).attr('href', 'https://maxcdn.bootstrapcdn.com/bootswatch/4.2.1/flatly/bootstrap.min.css');
    $(arrowLeft).attr('src', '/img/arrow_left_black.png');
    $(arrowRight).attr('src', '/img/arrow_right_black.png');
    // $(theadColor).toggleClass("bugColor");
    setCookie("light");
}

function lightMode() {
    document.getElementById("nameMode").innerText = "Light Mode";
    $(cssSwitch).attr('href', 'https://maxcdn.bootstrapcdn.com/bootswatch/4.2.1/darkly/bootstrap.min.css');

    $(arrowLeft).attr('src', '/img/arrow_left_white.png');
    $(arrowRight).attr('src', '/img/arrow_right_white.png');
    // $(theadColor).toggleClass("bugColor");
    setCookie("dark");
}

function setCookie(cvalue) {
    const d = new Date();
    d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = "theme=" + cvalue + ";" + expires;
}

function getCookie() {
    let name = "theme=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
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

function lauchTheme() {
    let tmp = getCookie();
    switch (tmp) {
        case "light":
            darkMode();
            break;
        case "":
        case "dark":
            lightMode();
            break;
    }
}

$(document).ready(function() {
    lauchTheme();

    $(urlRaceButton).click(function() {
        var url = $(urlRace).val();
        $.post("https://pedago.univ-avignon.fr:3123/race", { urlRace: url }, function(result) {
            var user = [{}];
            console.log(result);
            console.log(result.websocket_url);
            socket = new WebSocket('wss://racetime.gg' + result.websocket_url);


            // Écouter les messages
            socket.addEventListener('message', function(event) {
                $.getJSON(event, function(data) {
                    $("tableauScore").innerHTML = (data.renders.entrants);

                });

            });
        });
        var item = { "palce": 1, "icon": "url", "name": "test1", "status": "test2", "time": 2 };
        var demo = [item, item, item, item];
        //fillTable(user);
    });

    $(urlChannelButton).click(function() {
        var url = $(urlChannel).val();
        url = isUrl(url);
        console.log(url);
        $.post("https://pedago.univ-avignon.fr:3123/twitch", { urlChannel: url }, function(result) {
            console.log(result);
            // socket = new WebSocket('wss://racetime.gg' + result.websocket_url);


            // // Écouter les messages
            // socket.addEventListener('message', function(event) {
            //     $.getJSON(event, function(data) {
            //         $("tableauScore").append(data.renders.entrants);

            //     });

            // });
        });
    });


});

function isUrl(message) {
    var url = message.replace(('(?!.*/)(\w)+'), "$2");
    return url;
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

function HowItWork() {
    $('#ModalHowItWork').modal('show')
}