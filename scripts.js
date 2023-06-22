var x = document.getElementById("demo");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}


function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    checkWeather(latitude, longitude, "");
}

const apiKey = "b6bafef383f496136ce5d4e02f7472a5";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";
const airApiUrl = "https://api.openweathermap.org/data/2.5/air_pollution?units=metric";
const hourApiUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

async function checkWeather(latitude, longitude, city = "") {
    let url = "";
    let airUrl = "";
    let hourUrl = "";

    if (city) {
        url = `${apiUrl}&q=${city}&appid=${apiKey}`;
        hourUrl = `${hourApiUrl}&q=${city}&appid=${apiKey}`;
    } else if (latitude && longitude) {
        url = `${apiUrl}&lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
        hourUrl = `${hourApiUrl}&lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    } else {
        const city = searchBox.value.trim();
        if (!city) return; // No city specified
        url = `${apiUrl}&q=${city}&appid=${apiKey}`;
        hourUrl = `${hourApiUrl}&q=${city}&appid=${apiKey}`;
    }

    try {
        const [response, hourResponse] = await Promise.all([fetch(url), fetch(hourUrl)]);
        const data = await response.json();
        const hourData = await hourResponse.json();
        console.log(data);
        console.log(hourData);
        airUrl = `${airApiUrl}&lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${apiKey}`;
        const airResponse = await fetch(airUrl);
        const airData = await airResponse.json();
        console.log(airData);
        updateUI(data, hourData, airData);
    } catch (error) {
        console.log("Error:", error);
    }
}

function updateUI(data, hourData, airData) {
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".cityName").innerHTML = data.name;
    document.querySelector(".city").style.fontFamily = "'Hind Siliguri', sans-serif;"
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "˚C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".air-quality").innerHTML = Math.round(airData.list[0].components.o3);
    document.querySelector(".wind").innerHTML = data.wind.speed + " " + "Km/hr" + " ";
    document.querySelector(".visibility").innerHTML = (data.visibility / 1000) + " " + "km";
    document.querySelector(".precipitation-zero").innerHTML = Math.round(hourData.list[0].pop * 100) + "%";
    document.querySelector(".precipitation-one").innerHTML = Math.round(hourData.list[1].pop * 100) + "%";
    document.querySelector(".precipitation-two").innerHTML = Math.round(hourData.list[2].pop * 100) + "%";
    document.querySelector(".precipitation-three").innerHTML = Math.round(hourData.list[3].pop * 100) + "%";
    document.querySelector(".precipitation-four").innerHTML = Math.round(hourData.list[4].pop * 100) + "%";
    document.querySelector(".precipitation-five").innerHTML = Math.round(hourData.list[5].pop * 100) + "%";
    // ... continue for other hourData.list elements

    // Additional code to handle other UI elements and display data as desired

}

// Event listener for the search button
searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    checkWeather("", "", city);
    searchBox.value = "";
});

// Call the getLocation function to get weather data for user's location
getLocation();



// for data time array 0

    // if (hourData.list[0].weather[0].main === "Clear") {
    //     weatherIconZero.src = isDay ? "/images/day/clear.png" : "/images/night/clear.png";
    //     rainIconZero.src = isDay ? "/images/day/clear.png" : "/images/night/clear.png";
    // }
    // else if (hourData.list[0].weather[0].main === "Clouds") {
    //     weatherIconZero.src = isDay ? "/images/day/few-clouds.png" : "/images/night/few-clouds.png";
    //     rainIconZero.src = isDay ? "/images/day/few-clouds.png" : "/images/night/few-clouds.png";

    // }
    // else if (hourData.list[0].weather[0].main === "Rain") {
    //     weatherIconZero.src = isDay ? "/images/day/rain.png" : "/images/night/rain.png";
    //     rainIconZero.src = isDay ? "/images/day/rain.png" : "/images/night/rain.png";
    // }
    // else if (hourData.list[0].weather[0].main === "Thunderstorm") {
    //     weatherIconZero.src = isDay ? "/images/day/thunder.png" : "/images/night/thunder.png";
    //     rainIconZero.src = isDay ? "/images/day/thunder.png" : "/images/night/thunder.png";
    // }
    // else if (hourData.list[0].weather[0].main === "Drizzle") {
    //     weatherIconZero.src = isDay ? "/images/day/shower-rain.png" : "/images/night/shower-rain.png";
    //     rainIconZero.src = isDay ? "/images/day/shower-rain.png" : "/images/night/shower-rain.png";
    // }
    // else if (hourData.list[0].weather[0].main === "Snow") {
    //     weatherIconZero.src = isDay ? "/images/day/snow.png" : "/images/night/snow.png";
    //     rainIconZero.src = isDay ? "/images/day/snow.png" : "/images/night/snow.png";
    // }
    // else if (hourData.list[0].weather[0].main === "Mist") {
    //     weatherIconZero.src = isDay ? "/images/day/mist.png" : "/images/night/mist.png";
    //     rainIconZero.src = isDay ? "/images/day/mist.png" : "/images/night/mist.png";
    // }
    // else if (hourData.list[0].weather[0].main === "Smoke") {
    //     weatherIconZero.src = isDay ? "/images/day/mist.png" : "/images/night/mist.png";
    //     rainIconZero.src = isDay ? "/images/day/mist.png" : "/images/night/mist.png";
    // }
    // else if (hourData.list[0].weather[0].main === "Haze") {
    //     weatherIconZero.src = isDay ? "/images/day/mist.png" : "/images/night/mist.png";
    //     rainIconZero.src = isDay ? "/images/day/mist.png" : "/images/night/mist.png";
    // }

    // for array 1
    // if (hourData.list[1].weather[0].main === "Clear") {
    //     weatherIconOne.src = isDay ? "/images/day/clear.png" : "/images/night/clear.png";
    //     rainIconOne.src = isDay ? "/images/day/clear.png" : "/images/night/clear.png";
    // }
    // else if (hourData.list[1].weather[0].main === "Clouds") {
    //     weatherIconOne.src = isDay ? "/images/day/few-clouds.png" : "/images/night/few-clouds.png";
    //     rainIconOne.src = isDay ? "/images/day/few-clouds.png" : "/images/night/few-clouds.png";
    // }
    // else if (hourData.list[1].weather[0].main === "Rain") {
    //     weatherIconOne.src = isDay ? "/images/day/rain.png" : "/images/night/rain.png";
    //     rainIconOne.src = isDay ? "/images/day/rain.png" : "/images/night/rain.png";
    // }
    // else if (hourData.list[1].weather[0].main === "Thunderstorm") {
    //     weatherIconOne.src = isDay ? "/images/day/thunder.png" : "/images/night/thunder.png";
    //     rainIconOne.src = isDay ? "/images/day/thunder.png" : "/images/night/thunder.png";
    // }
    // else if (hourData.list[1].weather[0].main === "Drizzle") {
    //     weatherIconOne.src = isDay ? "/images/day/shower-rain.png" : "/images/night/shower-rain.png";
    //     rainIconOne.src = isDay ? "/images/day/shower-rain.png" : "/images/night/shower-rain.png";
    // }
    // else if (hourData.list[1].weather[0].main === "Snow") {
    //     weatherIconOne.src = isDay ? "/images/day/snow.png" : "/images/night/snow.png";
    //     rainIconOne.src = isDay ? "/images/day/snow.png" : "/images/night/snow.png";
    // }
    // else if (hourData.list[1].weather[0].main === "Mist") {
    //     weatherIconOne.src = isDay ? "/images/day/mist.png" : "/images/night/mist.png";
    //     rainIconOne.src = isDay ? "/images/day/mist.png" : "/images/night/mist.png";
    // }
    // else if (hourData.list[1].weather[0].main === "Smoke") {
    //     weatherIconOne.src = isDay ? "/images/day/mist.png" : "/images/night/mist.png";
    //     rainIconOne.src = isDay ? "/images/day/mist.png" : "/images/night/mist.png";
    // }
    // else if (hourData.list[1].weather[0].main === "Haze") {
    //     weatherIconOne.src = isDay ? "/images/day/mist.png" : "/images/night/mist.png";
    //     rainIconOne.src = isDay ? "/images/day/mist.png" : "/images/night/mist.png";
    // }

    // for array 2
    // if (hourData.list[2].weather[0].main === "Clear") {
    //     weatherIconTwo.src = isDay ? "/images/day/clear.png" : "/images/night/clear.png";
    //     rainIconTwo.src = isDay ? "/images/day/clear.png" : "/images/night/clear.png";
    // }
    // else if (hourData.list[2].weather[0].main === "Clouds") {
    //     weatherIconTwo.src = isDay ? "/images/day/few-clouds.png" : "/images/night/few-clouds.png";
    //     rainIconTwo.src = isDay ? "/images/day/few-clouds.png" : "/images/night/few-clouds.png";
    // }
    // else if (hourData.list[2].weather[0].main === "Rain") {
    //     weatherIconTwo.src = isDay ? "/images/day/rain.png" : "/images/night/rain.png";
    //     weatherIconTworainIconTwo.src = isDay ? "/images/day/rain.png" : "/images/night/rain.png";
    // }
    // else if (hourData.list[2].weather[0].main === "Thunderstorm") {
    //     weatherIconTwo.src = isDay ? "/images/day/thunder.png" : "/images/night/thunder.png";
    //     rainIconTwo.src = isDay ? "/images/day/thunder.png" : "/images/night/thunder.png";
    // }
    // else if (hourData.list[2].weather[0].main === "Drizzle") {
    //     weatherIconTwo.src = isDay ? "/images/day/shower-rain.png" : "/images/night/shower-rain.png";
    //     rainIconTwo.src = isDay ? "/images/day/shower-rain.png" : "/images/night/shower-rain.png";
    // }
    // else if (hourData.list[2].weather[0].main === "Snow") {
    //     weatherIconTwo.src = isDay ? "/images/day/snow.png" : "/images/night/snow.png";
    //     rainIconTwo.src = isDay ? "/images/day/snow.png" : "/images/night/snow.png";
    // }
    // else if (hourData.list[2].weather[0].main === "Mist") {
    //     weatherIconTwo.src = isDay ? "/images/day/mist.png" : "/images/night/mist.png";
    //     rainIconTwo.src = isDay ? "/images/day/mist.png" : "/images/night/mist.png";
    // }
    // else if (hourData.list[2].weather[0].main === "Smoke") {
    //     weatherIconTwo.src = isDay ? "/images/day/mist.png" : "/images/night/mist.png";
    //     rainIconTwo.src = isDay ? "/images/day/mist.png" : "/images/night/mist.png";
    // }
    // else if (hourData.list[2].weather[0].main === "Haze") {
    //     weatherIconTwo.src = isDay ? "/images/day/mist.png" : "/images/night/mist.png";
    //     rainIconTwo.src = isDay ? "/images/day/mist.png" : "/images/night/mist.png";
    // }

    // for array 3
    // if (hourData.list[3].weather[0].main === "Clear") {
    //     weatherIconThree.src = isDay ? "/images/day/clear.png" : "/images/night/clear.png";
    //     rainIconThree.src = isDay ? "/images/day/clear.png" : "/images/night/clear.png";
    // }
    // else if (hourData.list[3].weather[0].main === "Clouds") {
    //     weatherIconThree.src = isDay ? "/images/day/few-clouds.png" : "/images/night/few-clouds.png";
    //     rainIconThree.src = isDay ? "/images/day/few-clouds.png" : "/images/night/few-clouds.png";

    // }
    // else if (hourData.list[3].weather[0].main === "Rain") {
    //     weatherIconThree.src = isDay ? "/images/day/rain.png" : "/images/night/rain.png";
    //     rainIconThree.src = isDay ? "/images/day/rain.png" : "/images/night/rain.png";
    // }
    // else if (hourData.list[3].weather[0].main === "Thunderstorm") {
    //     weatherIconThree.src = isDay ? "/images/day/thunder.png" : "/images/night/thunder.png";
    //     rainIconThree.src = isDay ? "/images/day/thunder.png" : "/images/night/thunder.png";
    // }
    // else if (hourData.list[3].weather[0].main === "Drizzle") {
    //     weatherIconThree.src = isDay ? "/images/day/shower-rain.png" : "/images/night/shower-rain.png";
    //     rainIconThree.src = isDay ? "/images/day/shower-rain.png" : "/images/night/shower-rain.png";
    // }
    // else if (hourData.list[3].weather[0].main === "Snow") {
    //     weatherIconThree.src = isDay ? "/images/day/snow.png" : "/images/night/snow.png";
    //     rainIconThree.src = isDay ? "/images/day/snow.png" : "/images/night/snow.png";
    // }
    // else if (hourData.list[3].weather[0].main === "Mist") {
    //     weatherIconThree.src = isDay ? "/images/day/mist.png" : "/images/night/mist.png";
    //     rainIconThree.src = isDay ? "/images/day/mist.png" : "/images/night/mist.png";
    // }
    // else if (hourData.list[3].weather[0].main === "Smoke") {
    //     weatherIconThree.src = isDay ? "/images/day/mist.png" : "/images/night/mist.png";
    //     rainIconThree.src = isDay ? "/images/day/mist.png" : "/images/night/mist.png";
    // }
    // else if (hourData.list[3].weather[0].main === "Haze") {
    //     weatherIconThree.src = isDay ? "/images/day/mist.png" : "/images/night/mist.png";
    //     rainIconThree.src = isDay ? "/images/day/mist.png" : "/images/night/mist.png";
    // }

    // for array 4

    // if (hourData.list[4].weather[0].main === "Clear") {
    //     weatherIconFour.src = isDay ? "/images/day/clear.png" : "/images/night/clear.png";
    //     rainIconFour.src = isDay ? "/images/day/clear.png" : "/images/night/clear.png";
    // }
    // else if (hourData.list[4].weather[0].main === "Clouds") {
    //     weatherIconFour.src = isDay ? "/images/day/few-clouds.png" : "/images/night/few-clouds.png";
    //     rainIconFour.src = isDay ? "/images/day/few-clouds.png" : "/images/night/few-clouds.png";
    // }
    // else if (hourData.list[4].weather[0].main === "Rain") {
    //     weatherIconFour.src = isDay ? "/images/day/rain.png" : "/images/night/rain.png";
    //     rainIconFour.src = isDay ? "/images/day/rain.png" : "/images/night/rain.png";
    // }
    // else if (hourData.list[4].weather[0].main === "Thunderstorm") {
    //     weatherIconFour.src = isDay ? "/images/day/thunder.png" : "/images/night/thunder.png";
    //     rainIconFour.src = isDay ? "/images/day/thunder.png" : "/images/night/thunder.png";
    // }
    // else if (hourData.list[4].weather[0].main === "Drizzle") {
    //     weatherIconFour.src = isDay ? "/images/day/shower-rain.png" : "/images/night/shower-rain.png";
    //     rainIconFour.src = isDay ? "/images/day/shower-rain.png" : "/images/night/shower-rain.png";
    // }
    // else if (hourData.list[4].weather[0].main === "Snow") {
    //     weatherIconFour.src = isDay ? "/images/day/snow.png" : "/images/night/snow.png";
    //     rainIconFour.src = isDay ? "/images/day/snow.png" : "/images/night/snow.png";
    // }
    // else if (hourData.list[4].weather[0].main === "Mist") {
    //     weatherIconFour.src = isDay ? "/images/day/mist.png" : "/images/night/mist.png";
    //     rainIconFour.src = isDay ? "/images/day/mist.png" : "/images/night/mist.png";
    // }
    // else if (hourData.list[4].weather[0].main === "Smoke") {
    //     weatherIconFour.src = isDay ? "/images/day/mist.png" : "/images/night/mist.png";
    //     rainIconFour.src = isDay ? "/images/day/mist.png" : "/images/night/mist.png";
    // }
    // else if (hourData.list[4].weather[0].main === "Haze") {
    //     weatherIconFour.src = isDay ? "/images/day/mist.png" : "/images/night/mist.png";
    //     rainIconFour.src = isDay ? "/images/day/mist.png" : "/images/night/mist.png";
    // }

    // for array 5
    // if (hourData.list[5].weather[0].main === "Clear") {
    //     weatherIconFive.src = isDay ? "/images/day/clear.png" : "/images/night/clear.png";
    //     rainIconFive.src = isDay ? "/images/day/clear.png" : "/images/night/clear.png";
    // }
    // else if (hourData.list[5].weather[0].main === "Clouds") {
    //     weatherIconFive.src = isDay ? "/images/day/few-clouds.png" : "/images/night/few-clouds.png";
    //     rainIconFive.src = isDay ? "/images/day/few-clouds.png" : "/images/night/few-clouds.png";
    // }
    // else if (hourData.list[5].weather[0].main === "Rain") {
    //     weatherIconFive.src = isDay ? "/images/day/rain.png" : "/images/night/rain.png";
    //     rainIconFive.src = isDay ? "/images/day/rain.png" : "/images/night/rain.png";
    // }
    // else if (hourData.list[5].weather[0].main === "Thunderstorm") {
    //     weatherIconFive.src = isDay ? "/images/day/thunder.png" : "/images/night/thunder.png";
    //     rainIconFive.src = isDay ? "/images/day/thunder.png" : "/images/night/thunder.png";
    // }
    // else if (hourData.list[5].weather[0].main === "Drizzle") {
    //     weatherIconFive.src = isDay ? "/images/day/shower-rain.png" : "/images/night/shower-rain.png";
    //     rainIconFive.src = isDay ? "/images/day/shower-rain.png" : "/images/night/shower-rain.png";
    // }
    // else if (hourData.list[5].weather[0].main === "Snow") {
    //     weatherIconFive.src = isDay ? "/images/day/snow.png" : "/images/night/snow.png";
    //     rainIconFive.src = isDay ? "/images/day/snow.png" : "/images/night/snow.png";
    // }
    // else if (hourData.list[5].weather[0].main === "Mist") {
    //     weatherIconFive.src = isDay ? "/images/day/mist.png" : "/images/night/mist.png";
    //     rainIconFive.src = isDay ? "/images/day/mist.png" : "/images/night/mist.png";
    // }
    // else if (hourData.list[5].weather[0].main === "Smoke") {
    //     weatherIconFive.src = isDay ? "/images/day/mist.png" : "/images/night/mist.png";
    //     rainIconFive.src = isDay ? "/images/day/mist.png" : "/images/night/mist.png";
    // }
    // else if (hourData.list[5].weather[0].main === "Haze") {
    //     weatherIconFive.src = isDay ? "/images/day/mist.png" : "/images/night/mist.png";
    //     rainIconFive.src = isDay ? "/images/day/mist.png" : "/images/night/mist.png";
    // }
