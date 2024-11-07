const pxs065 = document.querySelectorAll(".pxs-065");
const wrapper = document.querySelector(".wrapper");
const mainWeather = document.querySelector(".mainWeather")
const mainHead = document.querySelector(".mainHead");
const sHumidity = document.querySelector(".sHumidity");
const sWind = document.querySelector(".sWind");
const search = document.querySelector("#search");
const searchBtn = document.querySelector(".searchBtn");
pxs065.forEach((e) => {
    e.style.display = "none";
    wrapper.style.height = "110px";
});

function fetchUrl() {
    const apikey = "1d3b7b73e5f3d30379bf09f70eace2f2";
    const cityname = search.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apikey}`;

    fetch(url)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Failed to fetch weather data");
            }
        })
        .then((data) => {
            if (data) {
                pxs065.forEach((e) => {
                    e.style.display = "flex";
                    wrapper.style.height = "450px";
                });
                mainHead.textContent = ((data.main.temp - 273.15).toFixed(2)) + "°C";
                mainWeather.textContent = data.weather[0].description;
                sHumidity.textContent = "Humidity: " + data.main.humidity + "%";
                sWind.textContent = "Wind Speed: " + data.wind.speed + " m/s";
                console.log(data);
            } else if (search.value.length < 3) {
                pxs065.forEach((e) => {
                    e.style.display = "none";
                    wrapper.style.height = "110px";
                });
            }
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            // Hide elements and set wrapper height to lower value on error
            pxs065.forEach((e) => {
                e.style.display = "none";
                wrapper.style.height = "110px";
            });
        });
}

searchBtn.addEventListener("click", fetchUrl);
