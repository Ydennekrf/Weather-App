let cityInput = document.querySelector("#cityInput");
let searchBtn = document.getElementById("searchBtn");


// let lat = geoData[].latitude
// let long = geoData[].longitude
// let lang = "english"

//fetches the Geo API info to get city coordinates
geoApi = () => {
    let getGeo = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=5&appid=05ebc66a4389e8c9833d3846169e15ce`

    fetch(getGeo)
        .then(function (response) {
            return response.json();
        })
        .then(function (geoData) {
            console.log(geoData)
                        
        })

};

// getWeather = () => {
//     let selectedCity = `api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&units=metric&lang=${lang}&exclude=alerts,minutely&appid=05ebc66a4389e8c9833d3846169e15ce`

//     fetch(getCity)
//         .then(function (cityResponse) {
//             return cityResponse.json();
//         })
//         .then(function (cityData) {
//             console.log(cityData)
//         })
// }





//adds event listener to the search button
searchBtn.addEventListener("click", geoApi);

