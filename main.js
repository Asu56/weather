var x = document.getElementById("demo");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }

}
function showPosition(position) {
    //   x.innerHTML = "Latitude: " + position.coords.latitude +
    //   "<br>Longitude: " + position.coords.longitude;
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
const weatherIconZero = document.querySelector(".weather-icon-zero");
const weatherIconOne = document.querySelector(".weather-icon-one");
const weatherIconTwo = document.querySelector(".weather-icon-two");
const weatherIconThree = document.querySelector(".weather-icon-three");
const weatherIconFour = document.querySelector(".weather-icon-four");
const weatherIconFive = document.querySelector(".weather-icon-five");

const rainIconZero = document.querySelector(".rain-icon-zero");
const rainIconOne = document.querySelector(".rain-icon-one");
const rainIconTwo = document.querySelector(".rain-icon-two");
const rainIconThree = document.querySelector(".rain-icon-three");
const rainIconFour = document.querySelector(".rain-icon-four");
const rainIconFive = document.querySelector(".rain-icon-five");

async function checkWeather(latitude, longitude, city = "") {
    let url = "";
    let airUrl = "";
    let hourUrl = "";

    if (city) {
        url = `${apiUrl}&q=${city}&appid=${apiKey}`;
        hourUrl = `${hourApiUrl}&q=${city}&appid=${apiKey}`;
    }
    else if (latitude && longitude) {
        url = `${apiUrl}&lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
        hourUrl = `${hourApiUrl}&lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    }
    else {
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
    }
    catch (error) {
        console.log("Error:", error);
    }

}
function updateUI(data, hourData, airData) {
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".cityName").innerHTML = data.name;
    document.querySelector(".city").style.fontFamily = "'Hind Siliguri', sans-serif;"
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "˚C";
    // document.querySelector(".temp-max").innerHTML = Math.round(data.main.temp_max) + "˚C";
    // document.querySelector(".temp-min").innerHTML = Math.round(data.main.temp_min) + "˚C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".air-quality").innerHTML = Math.round(airData.list[0].components.o3);
    document.querySelector(".wind").innerHTML = data.wind.speed + " " + "Km/hr" + " ";
    // `${getWindDirection(data.wind.deg)}`;
    document.querySelector(".visibility").innerHTML = ((data.visibility) / 1000) + " " + "km";
    // rain
    document.querySelector(".precipitation-zero").innerHTML = Math.round(hourData.list[0].pop * 100) + "%";
    document.querySelector(".precipitation-one").innerHTML = Math.round(hourData.list[1].pop * 100) + "%";
    document.querySelector(".precipitation-two").innerHTML = Math.round(hourData.list[2].pop * 100) + "%";
    document.querySelector(".precipitation-three").innerHTML = Math.round(hourData.list[3].pop * 100) + "%";
    document.querySelector(".precipitation-four").innerHTML = Math.round(hourData.list[4].pop * 100) + "%";
    document.querySelector(".precipitation-five").innerHTML = Math.round(hourData.list[5].pop * 100) + "%";


    document.querySelector(".temp-zero").innerHTML = Math.round(hourData.list[0].main.temp) + "˚C";
    document.querySelector(".temp-one").innerHTML = Math.round(hourData.list[1].main.temp) + "˚C";
    document.querySelector(".temp-two").innerHTML = Math.round(hourData.list[2].main.temp) + "˚C";
    document.querySelector(".temp-three").innerHTML = Math.round(hourData.list[3].main.temp) + "˚C";
    document.querySelector(".temp-four").innerHTML = Math.round(hourData.list[4].main.temp) + "˚C";
    document.querySelector(".temp-five").innerHTML = Math.round(hourData.list[5].main.temp) + "˚C";

    // wind
    document.querySelector(".wind-zero").innerHTML = `${hourData.list[0].wind.speed} km/s`;
    document.querySelector(".wind-one").innerHTML = `${hourData.list[1].wind.speed} km/s`;
    document.querySelector(".wind-two").innerHTML = `${hourData.list[2].wind.speed} km/s`;
    document.querySelector(".wind-three").innerHTML = `${hourData.list[3].wind.speed} km/s`;
    document.querySelector(".wind-four").innerHTML = `${hourData.list[4].wind.speed} km/s`;
    document.querySelector(".wind-five").innerHTML = `${hourData.list[5].wind.speed} km/s`;

    document.querySelector(".wind-deg-zero").innerHTML = `${getWindDirection(hourData.list[0].wind.deg)}`;
    document.querySelector(".wind-deg-one").innerHTML = `${getWindDirection(hourData.list[1].wind.deg)}`;
    document.querySelector(".wind-deg-two").innerHTML = `${getWindDirection(hourData.list[2].wind.deg)}`;
    document.querySelector(".wind-deg-three").innerHTML = `${getWindDirection(hourData.list[3].wind.deg)}`;
    document.querySelector(".wind-deg-four").innerHTML = `${getWindDirection(hourData.list[4].wind.deg)}`;
    document.querySelector(".wind-deg-five").innerHTML = `${getWindDirection(hourData.list[5].wind.deg)}`;

    function getWindDirection(degrees) {
        // Define an array of wind directions
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

        // Calculate the index based on the wind degrees
        const index = Math.round(degrees / 45) % 8;

        // Return the wind direction
        return directions[index];
    }

    document.querySelector(".tommorow-temp").innerHTML = Math.round(hourData.list[6].main.temp) + "˚C";

    function extractTime(dtTxt) {
        return dtTxt.substring(11, 16);
    }

    const dtTxtZero = hourData.list[0].dt_txt;
    const hourTimeZero = extractTime(dtTxtZero);
    console.log(hourTimeZero);

    const dtTxtOne = hourData.list[1].dt_txt;
    const hourTimeOne = extractTime(dtTxtOne);
    console.log(hourTimeOne);

    const dtTxtTwo = hourData.list[2].dt_txt;
    const hourTimeTwo = extractTime(dtTxtTwo);
    console.log(hourTimeTwo);

    const dtTxtThree = hourData.list[3].dt_txt;
    const hourTimeThree = extractTime(dtTxtThree);
    console.log(hourTimeThree);

    const dtTxtFour = hourData.list[4].dt_txt;
    const hourTimeFour = extractTime(dtTxtFour);
    console.log(hourTimeFour);

    const dtTxtFive = hourData.list[5].dt_txt;
    const hourTimeFive = extractTime(dtTxtFive);
    console.log(hourTimeFive);



    var elementsTimeZero = document.querySelectorAll('.time-span-zero');
    elementsTimeZero.forEach(function (elementTimeZero) {
        elementTimeZero.innerHTML = hourTimeZero;
    });

    var elementsTimeOne = document.querySelectorAll('.time-span-one');
    elementsTimeOne.forEach(function (elementTimeOne) {
        elementTimeOne.innerHTML = hourTimeOne;
    });

    var elementsTimeTwo = document.querySelectorAll('.time-span-two');
    elementsTimeTwo.forEach(function (elementTimeTwo) {
        elementTimeTwo.innerHTML = hourTimeTwo;
    });

    var elementsTimeThree = document.querySelectorAll('.time-span-three');
    elementsTimeThree.forEach(function (elementTimeThree) {
        elementTimeThree.innerHTML = hourTimeThree;
    });

    var elementsTimeFour = document.querySelectorAll('.time-span-four');
    elementsTimeFour.forEach(function (elementTimeFour) {
        elementTimeFour.innerHTML = hourTimeFour;
    });

    var elementsTimeFive = document.querySelectorAll('.time-span-five');
    elementsTimeFive.forEach(function (elementTimeFive) {
        elementTimeFive.innerHTML = hourTimeFive;
    });




    if (airData.list[0].main.aqi === 1) {
        document.querySelector(".air-rating").innerHTML = "Good"
        document.querySelector(".air-back").style.backgroundColor = "#cce16a";
        // document.getElementById("range-slider").value = 1;
        // document.querySelector(".custom-rangeslider__tooltip").innerHTML = "Good";
        // document.querySelector(".custom-rangeslider__tooltip").style.borderColor = "#cce16a";
    }

    if (airData.list[0].main.aqi === 2) {
        document.querySelector(".air-rating").innerHTML = "Fair"
        document.querySelector(".air-back").style.backgroundColor = "#FFC300";
        // document.getElementById("range-slider").value = 2;
        // document.querySelector(".custom-rangeslider__tooltip").innerHTML = "Fair";
        // document.querySelector(".custom-rangeslider__tooltip").style.borderColor = "#FFC300";
    }

    if (airData.list[0].main.aqi === 3) {
        document.querySelector(".air-rating").innerHTML = "Moderate"
        document.querySelector(".air-back").style.backgroundColor = "#FF5733";
        // document.getElementById("range-slider").value = 3;
        // document.querySelector(".custom-rangeslider__tooltip").innerHTML = "Moderate";
        // document.querySelector(".custom-rangeslider__tooltip").style.borderColor = "#FF5733";
    }

    if (airData.list[0].main.aqi === 4) {
        document.querySelector(".air-rating").innerHTML = "Poor"
        document.querySelector(".air-back").style.backgroundColor = "#C70039";
        document.querySelector(".air-back").style.color = "#fff";
        // document.getElementById("range-slider").value = 4;
        // document.querySelector(".custom-rangeslider__tooltip").innerHTML = "Poor";
        // document.querySelector(".custom-rangeslider__tooltip").style.borderColor = "#C70039";

    }
    if (airData.list[0].main.aqi === 5) {
        document.querySelector(".air-rating").innerHTML = "Very Poor"
        document.querySelector(".air-back").style.backgroundColor = "#900C3F";
        document.querySelector(".air-back").style.color = "#fff";
        // document.getElementById("range-slider").value = 5;
        // document.querySelector(".custom-rangeslider__tooltip").innerHTML = "Very Poor";
        // document.querySelector(".custom-rangeslider__tooltip").style.borderColor = "#900C3F";
    }

    // const rangeSlider = document.getElementById("range-slider");
    // const tooltip = document.querySelector(".custom-rangeslider__tooltip");

    // Assume you have fetched the air quality data and stored it in the variable 'airData'
    // Update the range slider and tooltip based on the fetched data
    // updateRangeSlider(airData.list[0].main.aqi);

    // function updateRangeSlider(value) {
    //     rangeSlider.value = value;
    //     const tooltipText = getTooltipText(value);
    //     tooltip.innerHTML = tooltipText;

    //     const min = rangeSlider.min;
    //     const max = rangeSlider.max;
    //     const percent = ((value - min) / (max - min)) * 100;
    //     const tooltipPosition = `calc(${percent}% - ${tooltip.offsetWidth / 2}px)`;
    //     tooltip.style.left = tooltipPosition;
    // }



    // function getTooltipText(value) {
    //     switch (parseInt(value)) {
    //         case 1:
    //             return "Good";
    //         case 2:
    //             return "Fair";
    //         case 3:
    //             return "Moderate";
    //         case 4:
    //             return "Poor";
    //         case 5:
    //             return "Hazardous";
    //         default:
    //             return "";
    //     }
    // }


    // Convert Unix timestamp for sunrise into readable format
    const sunriseTimestamp = data.sys.sunrise;
    const sunriseDate = new Date(sunriseTimestamp * 1000);
    const sunriseHours = sunriseDate.getHours();
    const sunriseMinutes = "0" + sunriseDate.getMinutes();
    const sunriseTime = sunriseHours + ':' + sunriseMinutes.substr(-2);
    document.querySelector(".sunrise").innerHTML = sunriseTime + " A.M";

    // Convert Unix timestamp for sunset into readable format
    const sunsetTimestamp = data.sys.sunset;
    const sunsetDate = new Date(sunsetTimestamp * 1000);
    const sunsetHours = sunsetDate.getHours();
    const sunsetMinutes = "0" + sunsetDate.getMinutes();
    const sunsetTime = sunsetHours + ':' + sunsetMinutes.substr(-2);
    document.querySelector(".sunset").innerHTML = sunsetTime + " " + "P.M";

    document.querySelector(".pressure").innerHTML = data.main.pressure + " " + "hPa";

    const now = new Date().getTime() / 1000; // current time in seconds
    const isDay = now > sunriseTimestamp && now < sunsetTimestamp;

    const currentTime = new Date();

    // Get the current time in minutes
    const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

    // Get the sunrise and sunset times in minutes
    const sunriseTimeMin = sunriseDate.getHours() * 60 + sunriseDate.getMinutes();
    const sunsetTimeMin = sunsetDate.getHours() * 60 + sunsetDate.getMinutes();

    if (currentMinutes < sunriseTimeMin || currentMinutes > sunsetTimeMin) {
        // Before sunrise or after sunset, set the sunmoon position to the initial state
        $('.sun-animation').css('width', '0%');
        $('.sun-symbol-path').css('-webkit-transform', 'rotateZ(-75deg)');
    } else {
        // Calculate the percentage of the day that has passed between sunrise and sunset
        const percentageOfDay = ((currentMinutes - sunriseTimeMin) / (sunsetTimeMin - sunriseTimeMin)) * 100;

        console.log(percentageOfDay);
        // Calculate the angle of rotation based on the percentage of the day
        const angle = percentageOfDay * 1.7 - 90;

        // Update the position of sunmoon based on the calculated percentage
        $('.sun-animation').css('width', `${percentageOfDay}%`);
        $('.sun-symbol-path').css({
            '-webkit-transform': `rotateZ(${angle}deg)`,
            'transform': `rotateZ(${angle}deg)`
        });
    }

    function getCurrentDay() {
        const currentDate = new Date();
        const day = currentDate.toLocaleString('en-US', { weekday: 'long' });
        return day;
    }

    const currentDay = getCurrentDay();
    console.log(currentDay);

    document.querySelector(".day").innerHTML = currentDay;

    const currentHour = currentTime.getHours();

    let greeting;

    if (currentHour < 12) {
        greeting = "Good morning";
    } else if (currentHour < 18) {
        greeting = "Good afternoon";
    } else if (currentHour < 22) {
        greeting = "Good evening";
    } else {
        greeting = "Good night";
    }

    document.querySelector(".greeting").innerHTML = greeting;

    // Function to toggle day and night modes
    function toggleDayNightMode() {
        var $toggle = $('.toggle');
        var $body = $('body');

        if (isDay) {
            // Day mode
            $toggle.removeClass('night').addClass('day');
            $body.removeClass('night').addClass('day');
        } else {
            // Night mode
            $toggle.removeClass('day').addClass('night');
            $body.removeClass('day').addClass('night');
        }
    }

    // Attach click event handler to toggle the mode manually
    $('.toggle-overlay').on('click', toggleDayNightMode);

    // Call the function initially to set the initial mode based on the current time
    toggleDayNightMode();

    // Update the mode automatically every minute
    setInterval(toggleDayNightMode, 60000);



    // 
    document.querySelector(".weather-desc").innerHTML = data.weather[0].description;



}

async function checkWeatherBhaktapur(city) {
    let url = "";
    url = `${apiUrl}&q=${city}&appid=${apiKey}`;
    const response = await fetch(url);
    var data = await response.json();
    console.log(data);

    document.querySelector(".bkt-temp").innerHTML = Math.round(data.main.temp) + "˚C";
}
console.log(checkWeatherBhaktapur("Kathmandu"))

searchBtn.addEventListener("click", (e) => {
    e.preventDefault()
    console.log("--");
    checkWeather(searchBox.value);

})
searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        checkWeather(searchBox.value);
    }
});




getLocation();