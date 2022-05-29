let cityInput;
let cityLat = 43.6534817;
let cityLong = -79.3839347;
let lang = "en";
let apiKey = "a772a40f5da703f3736db6d33655ff2f"
let currentCity;
let currentState;
let currentCountry;


let now = moment().format('ddd MMM D YYYY');
let currentCityEl = document.getElementById('currentName');
let currentStateEl = document.getElementById('currentState');
let currentCountryEl = document.getElementById('currentCountry');
let currentDateEl = document.getElementById('currentDate');
let currentTempEl = document.getElementById('current-temp');
let currentConEl = document.getElementById('current-con');
let currentWindEl = document.getElementById('current-wind');
let currentUVEl = document.getElementById('current-UV');




// fetches the Geo API info to get city coordinates
geoApi = () => {
    let getGeo = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=5&appid=${apiKey}`
    console.log(cityInput)
    fetch(getGeo)
        .then(function (response) {
            return response.json();
        })
        .then(function (geoData) {
            localStorage.setItem("geo", JSON.stringify(geoData))
            cityLong = geoData[0].lon
            cityLat = geoData[0].lat
            currentName = geoData[0].name
            currentState = geoData[0].state
            currentCountry = geoData[0].country
            getWeather();          
        })

};

getWeather = () => {
    let selectedCity = `http://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLong}&units=metric&lang=${lang}&exclude=alerts,minutely&appid=${apiKey}`

    fetch(selectedCity)
        .then(function (response) {
            return response.json();
        })
        .then(function (cityData) {
            localStorage.setItem("cityName", JSON.stringify(cityData))
            loadCurrentWeather();
        })
}
loadCurrentWeather = () => {
    let currentData = JSON.parse(localStorage.getItem("cityName"));
    currentCityEl.textContent = currentName;
    currentStateEl.textContent = currentState;
    currentCountryEl.textContent = currentCountry;
    currentDateEl.textContent = now;
    currentTempEl.textContent = `Temp: ${currentData.current.temp} C'`;
    let icon = currentData.current.weather[0].icon
    currentConEl.innerHTML = `<img src=https://openweathermap.org/img/wn/${icon}@4x.png>`;
    currentWindEl.textContent = `Wind Speed: ${currentData.current.wind_speed} KM/H`;
    currentUVEl.textContent = `UV: ${currentData.current.uvi}`;
    if (currentData.current.uvi > 8) {
        currentUVEl.setAttribute("style", "background-color: red")
    } else if (currentData.current.uvi < 8 && currentData.current.uvi > 5) {
        currentUVEl.setAttribute("style", "background-color: yellow")
    } else {
        currentUVEl.setAttribute("style", "background-color: green")
    };
load5Day();
};



load5Day = () => {
    let fiveDayData = JSON.parse(localStorage.getItem("cityName"))
   for (x = 0; x < 5 ; x++) {
    document.getElementById(`${x}date`).textContent = moment().add(`${x}`, "days").format('ddd MMM D YYYY');
    document.getElementById(`${x}temp`).textContent = `Temp: ${fiveDayData.daily[x].temp.day} C`;
   document.getElementById(`${x}humid`).textContent = `Humidity: ${fiveDayData.daily[x].humidity} %`;
   document.getElementById(`${x}windSpd`).textContent = `Wind: ${fiveDayData.daily[x].wind_speed}KM/h`;
   let icon = fiveDayData.daily[x].weather[0].icon;
   document.getElementById(`${x}weather`).innerHTML = `<img src=https://openweathermap.org/img/wn/${icon}@4x.png>`;
   }
}

//adds event listener to the search button
searchBtn.addEventListener("click", function(){
    cityInput = document.querySelector("#searchBar").value;
    geoApi();
});
searchBar.addEventListener("keypress", function(y) {
    if(y.key === 'Enter') {
        cityInput = document.querySelector("#seachBar");
        geoApi();
    }
});



