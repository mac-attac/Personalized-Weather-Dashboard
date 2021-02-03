//create api keys
$(document).ready(function() {
var cityInput = $('.city-input')
// var searchedCities = JSON.parse(localStorage.getItem('searchedCities')) || [] //fix


function getCurrentWeather(searchValue) {
console.log(searchValue)

var apiKey = '2475c48a9f27efa0b6bdd756142d1e2f';
var apiQuery = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=imperial&appid=${apiKey}`;

//api call
$.ajax({
    url: apiQuery,
    method: "GET",
    // success: //passing in data on success and use histroy.indexof 
    //take that and setItem for localstorage and set value as JSON.stringify
}).then(function(data) {
    console.log(data) 
    get5DayWeather(searchValue)
    getUVIndex(data.coord.lat,data.coord.lon)
    //enter display data for current weather
    $('#current-forecast').append(`
    <h2 class='city-name'>${data.name}</h2>
    <img style='inline' src = 'http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png' width='50px height='50px' alt='weather icon'>
    <p class='temp'>Temperature: ${data.main.temp}°F</p>
    <p class='humid'>Humidity: ${data.main.humidity}%</p>
    <p class='wind'>Wind Speed: ${data.wind.speed} MPH</p>
    `)
})
}

$('.city-input-submit').on("click", function () {
    //set up the value of city input in a variable
    $('#current-forecast').empty()
    $('#five-day-forecast').empty()
    let cityInput = $('.city-input').val()
    getCurrentWeather(cityInput);
    // searchedCities.push(cityInput),
    // localStorage.setItem('searchedCities', JSON.stringify(searchedCities))
    })
 


function get5DayWeather(searchCity) {
var apiKey = '2475c48a9f27efa0b6bdd756142d1e2f';
var apiQuery = `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&units=imperial&appid=${apiKey}`;

$.ajax({
    url: apiQuery,
    method: "GET"
}).then(function(data) {
    console.log(data)
    $('#five-day-forecast').append(`<h3 id='five-day-title'>5-Day Outlook:</h3>`)
    $('#five-day-forecast').append(`<div class='card-group'></div>`)
    for (var i = 0; i < data.list.length; i+=8) {
        $('.card-group').append(`
            <div class="card" style="width:100px; height:200px;">
                <img class="5-icon" src='http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png' alt="weather icon" width='50px' height='50px'>
                <div class="card-body">
                    <p class='5-temp'> Temperature: ${data.list[i].main.temp}°F</p>
                    <p class='5-humid'> Humidity: ${data.list[i].main.humidity}%</p>
                </div>
            </div>
    
        `)
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
    if(data.value <= 3.0) {
        $('#current-forecast').append(`
        <p id='uv'>UV Index: </p>`);
        $('#uv').append(`
        <button type="button" class="btn btn-success">${data.value}</button>`)
    } else if (data.value > 3.0 && data.value < 6.0) {
         $('#current-forecast').append(`
        <p id='uv'>UV Index: </p>`);
        $('#uv').append(`
        <button type="button" class="btn btn-warning">${data.value}</button>`)
    } else {
         $('#current-forecast').append(`
        <p id='uv'>UV Index: </p>`);
         $('#uv').append(`
        <button type="button" class="btn btn-danger">${data.value}</button>`)
    }
    
    //append data for UV index
})

}
})

