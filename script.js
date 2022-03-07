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
    //lauchTheme();

    $(urlRaceButton).click(function() {

        //alert( "Alert" );
        var user= [{}];
        var url = $(urlRace).val();
        console.log("one");
        $.post("https://pedago.univ-avignon.fr:3123/race", { urlRace: url }, function(result) {
            console.log(result);
            console.log("ds");
            $.getJSON(result, function(data) {
                data.race.entrants.forEach(element => {
                    user.push({"place":element.place,"icon":null,"name": element.user.name,"status":element.status.value,"time":element.finish_time})
                    //user.push(element); //we get the user, all the info
                });
            });
        });
        var item = { "palce": 1, "icon": "url", "name": "test1", "status": "test2", "time": 2 };
        var demo = [item, item, item, item];
        //fillTable(demo);
        user.forEach(element => {
            console.log(element);
        });
    });
});


function fillTable(arr) {
    arr.forEach(element => {
        console.log(element);
    });
    arr.forEach(element => {
        var ligne1 = "<tr class='table-dark'><th>" + element.palce + "</th>";
        var ligne2 = "<th scope='row'><img src='https://racetime.gg/media/183a2529ffa914fa17101f376abfe5ef.png' alt='icon' width='22' height='22'>" + element.name + "</th>";
        var ligne3 = "<th>" + element.status + "</th>";
        var ligne4 = "<th>" + element.time + "</th></tr>";
        var ligneEnd = ligne1 + ligne2 + ligne3 + ligne4;
        $("table tbody").append(ligneEnd);

    });
}

