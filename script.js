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
    //console.log("one");
    $.post("https://pedago.univ-avignon.fr:3123/race", {urlRace: url}, function(result){
      console.log(result);
      $.getJSON(result, function(jd) {
        
     });
    });
  });
});
