
// global variables declared here//
let cityInput = "toronto";
let cityLat ;
let cityLong ;
let lang = "en";
let apiKey = "a772a40f5da703f3736db6d33655ff2f"
let currentCity;
let currentState;
let currentCountry;
let historyArr = [];
let historyBtn = document.getElementById('recentSearch');
let now = moment().format('ddd MMM D YYYY');
let currentCityEl = document.getElementById('currentName');
let currentStateEl = document.getElementById('currentState');
let currentCountryEl = document.getElementById('currentCountry');
let currentDateEl = document.getElementById('currentDate');
let currentTempEl = document.getElementById('current-temp');
let currentConEl = document.getElementById('current-con');
let currentWindEl = document.getElementById('current-wind');
let currentUVEl = document.getElementById('current-UV');
let searchBarEl = document.getElementById('searchBar');





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
// prints the recent searches on load up using local storage
init = () => {
    let loadUp = JSON.parse(localStorage.getItem("cityName"));
    for (let i = 0; i < loadUp.length; i++) {
        let cityHistory = [];
        cityHistory = document.createElement('li');
        cityHistory.textContent = loadUp[i];
        historyBtn.appendChild(cityHistory);
    }
}
// api call to openweather oneCall 1.0
getWeather = () => {
    let selectedCity = `http://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLong}&units=metric&lang=${lang}&exclude=alerts,minutely&appid=${apiKey}`

    fetch(selectedCity)
        .then(function (response) {
            return response.json();
        })
        .then(function (cityData) {
            localStorage.setItem("cityData", JSON.stringify(cityData))
            loadCurrentWeather();
        })
}
// renders current weather for selected city on load in renders toronto
loadCurrentWeather = () => {
    let currentData = JSON.parse(localStorage.getItem("cityData"));
    currentCityEl.textContent = currentName;
    currentStateEl.textContent = currentState;
    currentCountryEl.textContent = currentCountry;
    currentDateEl.textContent = now;
    currentTempEl.textContent = `Temp: ${Math.floor(currentData.current.temp)} C`;
    //variable used to finding the icon ID for weather conditions
    let icon = currentData.current.weather[0].icon
    currentConEl.innerHTML = `<img src=https://openweathermap.org/img/wn/${icon}@4x.png>`;
    currentWindEl.textContent = `Wind Speed: ${currentData.current.wind_speed} KM/H`;
    currentUVEl.textContent = `UV: ${currentData.current.uvi}`;
    //handles the background color based on current UV rating
    if (currentData.current.uvi > 8) {
        currentUVEl.setAttribute("style", "background-color: red")
    } else if (currentData.current.uvi < 8 && currentData.current.uvi > 5) {
        currentUVEl.setAttribute("style", "background-color: yellow")
    } else {
        currentUVEl.setAttribute("style", "background-color: green")
    };
load5Day();
};


// loads up the 5 day forecast on default loads toronto
load5Day = () => {
    let fiveDayData = JSON.parse(localStorage.getItem("cityData"))
   for (x = 0; x < 5 ; x++) {
    document.getElementById(`${x}date`).textContent = moment().add(`${x}`, "days").format('ddd MMM D YYYY');
    document.getElementById(`${x}temp`).textContent = `Temp: ${Math.floor(fiveDayData.daily[x].temp.day)} C`;
   document.getElementById(`${x}humid`).textContent = `Humidity: ${fiveDayData.daily[x].humidity} %`;
   document.getElementById(`${x}windSpd`).textContent = `Wind: ${fiveDayData.daily[x].wind_speed}KM/h`;
   let icon = fiveDayData.daily[x].weather[0].icon;
   document.getElementById(`${x}weather`).innerHTML = `<img src=https://openweathermap.org/img/wn/${icon}@4x.png>`;
   }
};
//updates the recent search history
printHistory = (historyArr) => {
    historyBtn.innerHTML = '';
    for (let i = 0; i < historyArr.length; i++) {
        let cityHistory = [];
        cityHistory = document.createElement('li');
        cityHistory.textContent = historyArr[i];
        historyBtn.appendChild(cityHistory);
    }
}

//adds event listener to the search button

searchBarEl.addEventListener('click' , function(event) {
    event.preventDefault();
    cityInput = $('input[name="searchBar"]').val();
    historyArr.push(cityInput);
    localStorage.setItem("cityName" , JSON.stringify(historyArr));
    $('input[name="searchBar"]').val('');
    printHistory(historyArr);
    geoApi(cityInput);
});
// adds event listeners to the text in recent searches
historyBtn.addEventListener('click', function(event) {
    event.preventDefault();
    cityInput = event.target.textContent;
    if (!historyArr.includes(cityInput)) {
    historyArr.push(cityInput);
    localStorage.setItem("cityName", JSON.stringify(historyArr));
};
    $('input[name="searchBar"]').val('');
    printHistory(historyArr);
    geoApi(cityInput);
});
//calls the geo api and init functions on load up
// geoApi();
// init();






