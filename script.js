
const apiKey = "1ca629daa0a78c2516143986c46c80ea";


function getWeather() {
    const city = document.getElementById("city").value;
    if (!city) return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("weather").classList.remove("hidden");

            document.getElementById("location").innerText = data.name;
            document.getElementById("temp").innerText = Math.round(data.main.temp) + "°C";
            document.getElementById("desc").innerText = data.weather[0].description;
            document.getElementById("humidity").innerText = data.main.humidity + "%";
            document.getElementById("wind").innerText = data.wind.speed + " km/h";

            setIcon(data.weather[0].main);
            setBackground(data.weather[0].main, data.dt, data.sys.sunrise, data.sys.sunset);
        })
        .catch(() => alert("City not found"));
}

function setIcon(weather) {
    const icon = document.getElementById("icon");
    if (weather === "Clear") icon.innerText = "☀️";
    else if (weather === "Clouds") icon.innerText = "☁️";
    else if (weather === "Rain") icon.innerText = "🌧️";
    else icon.innerText = "🌤️";
}

function setBackground(weather, time, sunrise, sunset) {
    document.body.className = "";

    if (time < sunrise || time > sunset) {
        document.body.classList.add("night");
    } else if (weather === "Clear") {
        document.body.classList.add("clear");
    } else if (weather === "Clouds") {
        document.body.classList.add("clouds");
    } else if (weather === "Rain") {
        document.body.classList.add("rain");
    }
}
