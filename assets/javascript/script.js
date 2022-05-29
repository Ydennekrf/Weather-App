let cityInput = "Toronto"
let cityLat = 43.6534817;
let cityLong = -79.3839347;
let lang = "en";
let apiKey = "a772a40f5da703f3736db6d33655ff2f"
let currentName;
let currentState;
let currentCountry; 

let currentDayofWk = moment().isoWeekday();
let now = moment().format('ddd MMM D YYYY');
let currentCityEl = document.getElementById('currentName');
let currentStateEl = document.getElementById('currentState');
let currentCountryEl = document.getElementById('currentCountry');
let currentDateEl = document.getElementById('currentDate');
let currentTempEl = document.getElementById('current-temp');
let currentConEl = document.getElementById('current-con');
let currentWindEl = document.getElementById('current-wind');
let currentUVEl = document.getElementById('current-UV');
let dayDateEl = document.getElementById(`${daySelect}date`);
let dayTempEl = document.getElementById(`${daySelect}temp`);
let dayWeather = document.getElementById(`${daySelect}temp`);
let dayHumid = document.getElementById(`${daySelect}humid`);
let dayWindSpd = document.getElementById(`${daySelect}windSpd`);



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
            currentCity = geoData
            cityLong = geoData[0].lon
            cityLat = geoData[0].lat
            currentName = geoData[0].name
            currentState = geoData[0].state
            currentCountry = geoData[0].country
            console.log(currentName);
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
loadDate = () => {
    let dateHelp = `${daySelect}date`;
    
}


load5Day = () => {
    let daySelect = currentDayofWk + 1
    loadDate(daySelect);
    loadTemp(daySelect);
    loadWeather(daySelect);
    loadHumid(daySelect);
    loadWind(daySelect);

}

geoApi();
// getWeather();


//adds event listener to the search button
// searchBtn.addEventListener("click", geoApi);

