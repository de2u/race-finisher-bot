function darkwhiteMode()
{
            
    if(document.getElementById("nameMode").innerText=="Light Mode")
    {
        document.getElementById("nameMode").innerText="Dark Mode";
        document.getElementById("cssSwitch").herf="https://maxcdn.bootstrapcdn.com/bootswatch/4.2.1/flatly/bootstrap.min.css";
    }
    else
    {
        document.getElementById("nameMode").innerText="Light Mode";
        document.getElementById("cssSwitch").herf="https://maxcdn.bootstrapcdn.com/bootswatch/4.2.1/darkly/bootstrap.min.css";
    }
            
}

$(document).ready(function(){
  $(urlRaceButton).click(function(){
    //alert( "Alert" );
    var url = $(urlRace).val();
    console.log("one");
    $.post("/race", {urlRace: url}, function(result){
      console.log(result);
    });
  });
});
  /*
$(document).ready(function(){
    $("urlRaceButton").click(function(){
      $.post("https://pedago.univ-avignon.fr:3123/race", function(data, status){
        //alert("Data: " + data + "\nStatus: " + status);
        var $from = $(this);
        urlRace = $from.find("input[name='urlRace']").val();
        console.log(data.Type);

        var
        
      });
    });
});
*/

/*
const actRace = document.getElementById('actRace');

actRace.addEventListener('submit', (event) => {
    // handle the form data
    console.log(data);
});

*/