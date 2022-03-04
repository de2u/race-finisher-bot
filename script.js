function darkwhiteMode() {

    if (document.getElementById("nameMode").innerText == "Light Mode") {
        document.getElementById("nameMode").innerText = "Dark Mode";
        $(cssSwitch).attr('href', 'https://maxcdn.bootstrapcdn.com/bootswatch/4.2.1/flatly/bootstrap.min.css');
        $(theadColor).toggleClass("bugColor");
    } else {
        document.getElementById("nameMode").innerText = "Light Mode";
        $(cssSwitch).attr('href', 'https://maxcdn.bootstrapcdn.com/bootswatch/4.2.1/darkly/bootstrap.min.css');
        $(theadColor).toggleClass("bugColor");
    }

}

$(document).ready(function() {

    var user;
    $(urlRaceButton).click(function() {
        //alert( "Alert" );
        var url = $(urlRace).val();
        //console.log("one");
        /*$.post("https://pedago.univ-avignon.fr:3123/race", {urlRace: url}, function(result){
          console.log(result);
          $.getJSON(result, function(jd) {
           jd.entrants.forEach(element => {
             user.push(element);//we get the user, all the info
           }); 
         });
        });*/
        var item = { "palce": 1, "icon": "url", "name": "test1", "status": "test2", "time": 2 };
        var demo = [item, item, item, item];
        fillTable(demo);
        /*user.forEach(element => {
            console.log(element);
        });*/
    });

    if (user != null) {
        //get name, avatar, place, 
        Temporal.Duration.from(element.finish_time);
    }
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