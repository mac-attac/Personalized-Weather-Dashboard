//create api keys
$(document).ready(function() {
// var listSearchedCities = JSON.parse(localStorage.getItem('searchedCities')) || []
// var searchedCities = localStorage.setItem('searchedCities', JSON.stringify($(cityInput)))
// var cityInput = $('.city-input').val()

function getCurrentWeather(searchValue) {
var apiKey = '2475c48a9f27efa0b6bdd756142d1e2f';
var apiQuery = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=imperial&appid=${apiKey}`;

//api call
$.ajax({
    url: apiQuery,
    method: "GET"
}).then(function(data) {
    console.log(data) 
    get5DayWeather(searchValue)
    getUVIndex(data.coord.lat,data.coord.lon)
    //enter display data for current weather
})
}

$('.city-input-submit').on("click", function () {
    getCurrentWeather($('.city-input').val())
    // $(searchedCities).push('.city-input')
 
})

function get5DayWeather(searchCity) {
var apiKey = '2475c48a9f27efa0b6bdd756142d1e2f';
var apiQuery = `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&units=imperial&appid=${apiKey}`;

$.ajax({
    url: apiQuery,
    method: "GET"
}).then(function(data) {
    console.log(data)
    //append display data for 5 day
    for (var i = 0; i < data.list.length; i+=8) {
        //append data to .five-day-forecast
    }
})
}

function getUVIndex (lat, lon){
var apiKey = '2475c48a9f27efa0b6bdd756142d1e2f';
var apiQuery = `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`;

$.ajax({
    url: apiQuery,
    method: "GET"
}).then(function(data) {
    console.log(data)
    if(data.value <= 2.0) {
        $("<div>").appendChild(data.value)
    }
    
    //append data for UV index
})

}
})



// $('<img>').attr("src", `http://openweathermap.org/img/wn/${data.icon}@2x.png`)




//dynamically add div to current forecast

//dynamically add div for 5 day forecast inline elements

//function to prepend searches on top of each other after clicking search

//if statement to highlight UV index in different colors

//use moment for date time


//function to call uv index based on lat and lon from inital api call
