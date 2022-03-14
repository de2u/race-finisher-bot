//the functino list is use for the dar/light mode
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
    setCookie("light");
}

function lightMode() {
    document.getElementById("nameMode").innerText = "Light Mode";
    $(cssSwitch).attr('href', 'https://maxcdn.bootstrapcdn.com/bootswatch/4.2.1/darkly/bootstrap.min.css');

    $(arrowLeft).attr('src', '/img/arrow_left_white.png');
    $(arrowRight).attr('src', '/img/arrow_right_white.png');
    setCookie("dark");
}

//we make a cookie to save the theme use
function setCookie(cvalue) {
    const d = new Date();
    d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = "theme=" + cvalue + ";" + expires;
}
//we get the cookie for the theme
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
//to set the theme use at the lauch
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
            // console.log(result);
            // console.log(result.websocket_url);
            socket = new WebSocket('wss://racetime.gg' + result.websocket_url);

            // Écouter les messages
            socket.addEventListener('message', function(event) {
                $.getJSON(event, function(data) {
                    $("tableauScore").innerHTML = (data.renders.entrants);

                });

            });
        });
    });

    $(urlChannelButton).click(function() {
        var url = $(urlChannel).val();
        url = isUrl(url);
        // console.log(url);
        $.post("https://pedago.univ-avignon.fr:3123/twitch", { urlChannel: url }, function(result) {
            // console.log(result);
        });
    });


});

//we get the name of the chanel twitch
function isUrl(message) {
    const regex = /(?!.*\/)(\w)+/g;
    url = message.match(regex);
    return url[0];
}
//to make work the modal
function HowItWork() {
    $('#ModalHowItWork').modal('show')
}