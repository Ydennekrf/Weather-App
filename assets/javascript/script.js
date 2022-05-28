let cityInput = "Toronto"
let cityLat = 43.6534817;
let cityLong = -79.3839347;
let lang = "en";
let apiKey = "a772a40f5da703f3736db6d33655ff2f"

// fetches the Geo API info to get city coordinates
geoApi = () => {
    let getGeo = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=5&appid=${apiKey}`
    console.log(cityInput)
    fetch(getGeo)
        .then(function (response) {
            return response.json();
        })
        .then(function (geoData) {
            console.log(geoData)
            cityLong = geoData[0].lon
            cityLat = geoData[0].lat
            getWeather();           
        })

};

getWeather = () => {
    let selectedCity = `api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLong}&units=metric&lang=${lang}&exclude=alerts,minutely&appid=${apiKey}`

    fetch(selectedCity)
        .then(function (response) {
            return response.json();
        })
        .then(function (cityData) {
            console.log(cityData)
            localStorage.setItem("cityName", JSON.stringify(cityData))
        })
}


// geoApi();
getWeather();

//adds event listener to the search button
// searchBtn.addEventListener("click", geoApi);

