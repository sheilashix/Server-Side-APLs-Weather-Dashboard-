let weather={
    apikey: "441b24606df27814f69b776678e3bb3a",
    fetchweather:function (city) {
        fetch( /*"http://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid=441b24606df27814f69b776678e3bb3a"*/

           "http://api.openweathermap.org/data/2.5/weather?q="+ city +"&units=metric&appid=441b24606df27814f69b776678e3bb3a")
        .then((response)=>response.json())
        .then((data)=>this.displayweather(data));
    },

    displayweather: function(data){
         const {name}=data;
         const {icon, description}=data.weather[0];
         const {temp,humidity}=data.main;
         const{speed}=data.wind;
         console.log(name,icon,description,temp,humidity,speed);
         document.querySelector(".city").innerText="Weather in "+ name;
         document.querySelector(".icon").src="http://openweathermap.org/img/wn/"+icon+".png";
         document.querySelector(".description").innerText=description;
         document.querySelector(".temp").innerText=temp+"°C";
         document.querySelector(".humidity").innerText="Humidity:"+humidity+"%";
         document.querySelector(".wind").innerText="Wind speed :"+speed+"km/hr";  
         document.querySelector(".weather").classList.remove("loading");
    } ,
    search: function(){
     this.fetchweather(document.querySelector(".search-bar").value);
    

    }

};
document
.querySelector(".search button").addEventListener("click", function(){
 weather.search();
 
} );

document.querySelector(".search-bar").addEventListener("keyup",function(event){
if (event.key=="Enter"){
    weather.search();

}

})
weather.fetchweather("Osaka");


//these divs are for Current City Weather
var mainCard = $("#weatherNow");
var your20Icon = $("<img>").addClass("iconDiv");
var your20temp = $("<h6>").addClass("tempDiv");
var your20humid = $("<h6>").addClass("humidDiv");
var your20wind = $("<h6>").addClass("windDiv");
var your20uv = $("<h6>").addClass("uvDiv");
//adding my divs to my current city weather card
mainCard.append(your20Icon, your20temp, your20humid, your20wind, your20uv);
  
//my search button click event - search for weather of specific cities
$("#searchWeather").click(function() {
  var city = $("#city").val();
  //city search current weather
  var cityQueryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&appid=69495130452b6690f1d83e33e635a5f7";
  //five-day forcast
  var fiveDayQueryURL =
    "https://api.openweathermap.org/data/2.5/forecast/daily?appid=441b24606df27814f69b776678e3bb3a&q=" +
    city +
    "&units=imperial&cnt=6";
    
  $.ajax({
    url: cityQueryURL,
    method: "GET"
  }).then(function(data) {
    
    var nowIcon =
      "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
    var nowTemp = data.main.temp;
    var nowHumid = data.main.humidity + "%";
    var nowWind = data.wind.speed + "mph";

    //city and date
    $("#currentCity").text(data.name + ", " + data.sys.country);
    $(".card-header").html(moment().format("dddd" + "," + " MMMM D"));
    //weather stats below
    your20Icon.attr("src", nowIcon);
    your20temp.html("Temperature: " + nowTemp + " &deg;F");
    your20humid.text("Humidity: " + data.main.humidity + "%");
    your20wind.text("Wind Speed: " + data.wind.speed + " mph");
  });

  $.ajax({
    url: fiveDayQueryURL,
    method: "GET"
  }).then(function(fiver) {
      console.log(fiver);
//for loop to create 5 day cards and populate data

      for(var i = 1; i < fiver.list.length; i++) {
      
      var newCard = $("<div class='card text-center m-2' style='width: 12rem; background-color: rgb(179, 208, 243)'>");
      var newCardBody = $("<div class='card-body'>");
      var cardDate = $("<div>").text(moment.unix(fiver.list[i].dt).format("dddd, MMMM D"));
      var cardIcon = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + fiver.list[i].weather[0].icon + ".png");
      var cardTemp = $("<div>").html("Temp: " + (fiver.list[i].temp.day) + " &deg;F");
      var cardHumid = $("<div>").text("Humidity: " + (fiver.list[i].humidity) + "%");

      newCardBody.append(cardDate, cardIcon, cardTemp, cardHumid);
      newCard.append(newCardBody)
      $("#fiverCards").append(newCard);
    }
  
    
    
  });
});