/*GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
WHEN I open the weather dashboard
THEN I am presented with the last searched city forecast
*/

var searchBtn = $("#searchBtn");
var APIKey = "e64d731f21a3f7b890f2228af482e62c";

searchBtn.click(getWeather);
function getWeather(){
    var city = $("#cityInput").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

    $.ajax({
url: queryURL,
method: "GET"
    }).then(function(response){
var cityDetails = $(".cityDetails");
var cityName = response.name
var iconCode = response.weather[0].icon
var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
var icon = $(".icon").attr("src", iconURL);
cityDetails.text(cityName);
var temp = (response.main.temp - 273.15) * 1.80 + 32;
$(".temp").text("Temperature: " + Math.floor(temp) + "°F");
var humidity = response.main.humidity;
$(".humidity").text("Humidity: " + humidity + "%");
var windSpeed = response.wind.speed;
$(".windSpeed").text("Wind Speed: " + windSpeed + "MPH");
    })
};

searchBtn.click(populateFiveDay);
function populateFiveDay() {
  var city = $("#cityInput").val();
  console.log(city);
  var fiveDayQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=3b7c785e4d7c66cff4aa075b470fd6f5";
  $.ajax({
    url: fiveDayQueryURL,
    method: "GET"
  }).then(function (response) {
    //card one
    var iconCodeOne = response.list[0].weather[0].icon; 
    var iconURLone = "http://openweathermap.org/img/w/" + iconCodeOne + ".png";
    $(".iconOne").attr("src", iconURLone);
    var tempOne = (response.list[0].main.temp - 273.15) * 1.80 + 32;
    $(".tempOne").text("Temperature: " + Math.floor(tempOne) + "°F");
    var humidityOne = response.list[0].main.humidity; 
    $(".humidityOne").text("Humidity: " + humidityOne + "%");
    //card two
    var iconCodeTwo = response.list[7].weather[0].icon; 
    var iconURLtwo = "http://openweathermap.org/img/w/" + iconCodeTwo + ".png";
    $(".iconTwo").attr("src", iconURLtwo);
    var tempTwo = (response.list[7].main.temp - 273.15) * 1.80 + 32;
    $(".tempTwo").text("Temperature: " + Math.floor(tempTwo) + "°F");
    var humidityTwo = response.list[7].main.humidity; 
    $(".humidityTwo").text("Humidity: " + humidityTwo + "%");
    //card three
    var iconCodeThree = response.list[15].weather[0].icon; 
    var iconURLthree = "http://openweathermap.org/img/w/" + iconCodeThree + ".png";
    $(".iconThree").attr("src", iconURLthree);
    var tempThree = (response.list[15].main.temp - 273.15) * 1.80 + 32;
    $(".tempThree").text("Temperature: " + Math.floor(tempThree) + "°F");
    var humidityThree = response.list[15].main.humidity; 
    $(".humidityThree").text("Humidity: " + humidityThree + "%");
    //card four
    var iconCodeFour = response.list[23].weather[0].icon; 
    var iconURLfour = "http://openweathermap.org/img/w/" + iconCodeFour + ".png";
    $(".iconFour").attr("src", iconURLfour);
    var tempFour = (response.list[23].main.temp - 273.15) * 1.80 + 32;
    $(".tempFour").text("Temperature: " + Math.floor(tempFour) + "°F");
    var humidityFour = response.list[23].main.humidity; 
    $(".humidityFour").text("Humidity: " + humidityFour + "%");
    //card five
    var iconCodeFive = response.list[31].weather[0].icon; 
    var iconURLfive = "http://openweathermap.org/img/w/" + iconCodeFive + ".png";
    $(".iconFive").attr("src", iconURLfive);
    var tempFive = (response.list[31].main.temp - 273.15) * 1.80 + 32;
    $(".tempFive").text("Temperature: " + Math.floor(tempFive) + "°F");
    var humidityFive = response.list[31].main.humidity; 
    $(".humidityFive").text("Humidity: " + humidityFive + "%");

  })
};

searchBtn.click(populateList);
function populateList() {
  var city = $("#cityInput").val();
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=3b7c785e4d7c66cff4aa075b470fd6f5";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    var cityList = $(".cityList");
    var listItem = $("<li></li>").addClass("list-group-item");
    var listBtn = $("<button>" + response.name + "</button>").addClass("btn btn-link text-dark logged");
    listBtn.attr("data-name", response.name);
    listItem.html(listBtn);
    cityList.prepend(listItem);
  })
};

$(document).on("click", ".logged", recallCity);
function recallCity() {
  var city = $(this).attr("data-name");
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=3b7c785e4d7c66cff4aa075b470fd6f5";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    var cityDetails = $(".cityDetails");
    var cityName = response.name;
    var iconCode = response.weather[0].icon
    var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
    var icon = $(".icon").attr("src", iconURL);
    cityDetails.text(cityName);
    var temp = (response.main.temp - 273.15) * 1.80 + 32;
    $(".temp").text("Temperature: " + Math.floor(temp) + "°F");
    var humidity = response.main.humidity;
    $(".humidity").text("Humidity: " + humidity + "%");
    var windSpeed = response.wind.speed;
    $(".windSpeed").text("Wind Speed: " + windSpeed + "MPH");
  })
};

$(document).on("click", ".logged", recallCityFive);
function recallCityFive() {
  var city = $(this).attr("data-name");
  console.log(city);
  var fiveDayQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=3b7c785e4d7c66cff4aa075b470fd6f5";
  $.ajax({
    url: fiveDayQueryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    //card one
    var iconCodeOne = response.list[0].weather[0].icon; 
    var iconURLone = "http://openweathermap.org/img/w/" + iconCodeOne + ".png";
    $(".iconOne").attr("src", iconURLone);
    var tempOne = (response.list[0].main.temp - 273.15) * 1.80 + 32;
    $(".tempOne").text("Temperature: " + Math.floor(tempOne) + "°F");
    var humidityOne = response.list[0].main.humidity; 
    $(".humidityOne").text("Humidity: " + humidityOne + "%");
    //card two
    var iconCodeTwo = response.list[7].weather[0].icon; 
    var iconURLtwo = "http://openweathermap.org/img/w/" + iconCodeTwo + ".png";
    $(".iconTwo").attr("src", iconURLtwo);
    var tempTwo = (response.list[7].main.temp - 273.15) * 1.80 + 32;
    $(".tempTwo").text("Temperature: " + Math.floor(tempTwo) + "°F");
    var humidityTwo = response.list[7].main.humidity; 
    $(".humidityTwo").text("Humidity: " + humidityTwo + "%");
    //card three
    var iconCodeThree = response.list[15].weather[0].icon; 
    var iconURLthree = "http://openweathermap.org/img/w/" + iconCodeThree + ".png";
    $(".iconThree").attr("src", iconURLthree);
    var tempThree = (response.list[15].main.temp - 273.15) * 1.80 + 32;
    $(".tempThree").text("Temperature: " + Math.floor(tempThree) + "°F");
    var humidityThree = response.list[15].main.humidity; 
    $(".humidityThree").text("Humidity: " + humidityThree + "%");
    //card four
    var iconCodeFour = response.list[23].weather[0].icon; 
    var iconURLfour = "http://openweathermap.org/img/w/" + iconCodeFour + ".png";
    $(".iconFour").attr("src", iconURLfour);
    var tempFour = (response.list[23].main.temp - 273.15) * 1.80 + 32;
    $(".tempFour").text("Temperature: " + Math.floor(tempFour) + "°F");
    var humidityFour = response.list[23].main.humidity; 
    $(".humidityFour").text("Humidity: " + humidityFour + "%");
    //card five
    var iconCodeFive = response.list[31].weather[0].icon; 
    var iconURLfive = "http://openweathermap.org/img/w/" + iconCodeFive + ".png";
    $(".iconFive").attr("src", iconURLfive);
    var tempFive = (response.list[31].main.temp - 273.15) * 1.80 + 32;
    $(".tempFive").text("Temperature: " + Math.floor(tempFive) + "°F");
    var humidityFive = response.list[31].main.humidity; 
    $(".humidityFive").text("Humidity: " + humidityFive + "%");

  })
};


function populateDates() {
  var oneDay = moment().add(1, 'day');
  $(".dayOne").text(oneDay.format("l"));
  var twoDay = moment().add(2, 'day');
  $(".dayTwo").text(twoDay.format("l"));
  var threeDay = moment().add(3, 'day');
  $(".dayThree").text(threeDay.format("l"));
  var fourDay = moment().add(4, 'day');
  $(".dayFour").text(fourDay.format("l"));
  var fiveDay = moment().add(5, 'day');
  $(".dayFive").text(fiveDay.format("l"));
};
populateDates();

searchBtn.click(clearInput);
  function clearInput() {
  $("#cityInput").val("");
};
