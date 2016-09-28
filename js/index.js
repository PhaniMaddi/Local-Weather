$(document).ready(function() {

  $.getJSON("https://jsonip.com/?callback=?", function(user) {
    var ip = user.ip;
    console.log(ip);
    var ipGeo = "https://geoip.nekudo.com/api/" + ip;
    $.getJSON(ipGeo, function(data) {
      var latitude = data.location.latitude;
      var longitude = data.location.longitude;
      var city = data.city;
      var country = data.country;
      console.log(longitude, latitude);

      $.getJSON("https://crossorigin.me/https://api.forecast.io/forecast/2e591f122507ef51a781deaff8643744/" + latitude + "," + longitude + "?callback=?", function getWeather(data) {
        var conditions = data.currently.summary;
        var tempF = data.currently.temperature;
        var tempC = Math.floor((tempF - 32) * 5 / 9);
        var icon = data.currently.icon;
        var skycons = new Skycons({
          "color": "white"
        }); //this line generates the set of Skycons, and also changes the default color to a hint of purple
        skycons.set("icon1", icon); //this first points to the <canvas> element with ID "icon1," and the sets the var icon above to it
        skycons.play(); //and the animation starts!
        $("#currentLocation").html("<span>Location : </span>" + city);
        $("#currentWeather").html("<span>Condition : </span>" + conditions);
        $("#currentTemperature").html("<span>Temperature : </span>" + Math.floor(tempF) + "°");
        $("#tUnits").text("F");

        $("#btn").click(function() {
          if ($("#tUnits").text() === "F") {
            $("#currentTemperature").text("Temperature : " + Math.floor(tempC) + "°");
            $("#tUnits").text("C");
          } else {
            $("#currentTemperature").text("Temperature : " + Math.floor(tempF) + "°");
            $("#tUnits").text("F");
          }
        });

      });
    });
  });
});