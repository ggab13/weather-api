// Egy hőmérős animációt lehetne betenni loadingscreenhez
// Esetleg toggle-re másfélé nézni neten valamit
const button = document.getElementById('change');
const search = document.getElementById('query');
const cityLocation = document.getElementById('location');
const checkBox = document.getElementById('temperature-value');
const temperature = document.getElementById('city-data__temperature');
const feels = document.getElementById('city-data__feels');
const varos = document.getElementById('location');
const humidity = document.getElementById('city-data__humidity');
const img = document.getElementById('weather-img');
const desc = document.getElementById('weather-description');
const tube = document.getElementsByClassName('tube');
const loadingTxt = document.getElementById('loading');
let citySearch = "Budapest";


init()


function addLoad() {

    let node = document.createElement("div"); //
    node.id = "vein"; // 
    tube[0].appendChild(node);
}

function deleteLoad() {
    let getit = document.getElementById('vein');
    tube[0].removeChild(getit);
}





async function init() {
    let currentCity;
    currentCity = await getWeather();
    temperature.innerHTML = currentCity.temperature + " " + cVsF();
    feels.innerHTML = "Feels like " + currentCity.feels + cVsF();
    humidity.innerHTML = "Humidity " + currentCity.humidity + "%";
    desc.innerHTML = currentCity.desc;
    img.src = `http://openweathermap.org/img/wn/${currentCity.img}@2x.png`;
    loadingTxt.innerHTML = currentCity.temperature + " " + cVsF();
}

class city {
    constructor(name, temperature, feels, humidity, desc, img) {
        this.name = name;
        this.temperature = temperature;
        this.feels = feels;
        this.humidity = humidity;
        this.desc = desc;
        this.img = img;
    }
}

search.addEventListener("input", (e) => {
    // inside, we will need to achieve a few things:
    // 1. declare and assign the value of the event's target to a variable AKA whatever is typed in the search bar
    citySearch = e.target.value;
})

button.addEventListener('click', async () => {


    addLoad();
    setTimeout(() => {
        loadingTxt.innerHTML = "Loading.";
        setTimeout(() => {
            loadingTxt.innerHTML = "Loading..";
            setTimeout(() => {
                loadingTxt.innerHTML = "Loading...";
            }, 300)
        }, 300)
    }, 300)

    setTimeout((async () => {
        let currentCity;
        currentCity = await getWeather();
        temperature.innerHTML = currentCity.temperature + " " + cVsF();
        feels.innerHTML = "Feels like " + currentCity.feels + cVsF();
        humidity.innerHTML = "Humidity " + currentCity.humidity + "%";
        desc.innerHTML = currentCity.desc;
        img.src = `http://openweathermap.org/img/wn/${currentCity.img}@2x.png`;

        deleteLoad()
        loadingTxt.innerHTML = currentCity.temperature + " " + cVsF();
    }), 2000)




});

function cVsF() {
    if (!checkBox.checked === true) {
        return "°C";
    } else {
        return "°F";
    }
}


function celsiusVsFarenheit() {
    if (!checkBox.checked === true) {
        return "metric";
    } else {
        return "standard";
    }
}


// URL (required), options (optional)
async function getWeather() {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${citySearch}&units=${celsiusVsFarenheit()}&appid=b16ba561812b8249a766aa53f4c50234`, {
        mode: 'cors'
    });
    const data = await response.json();
    console.log(data);
    let currentLocation = new city(data.name, data.main.temp, data.main.feels_like, data.main.humidity, data.weather[0].description, data.weather[0].icon)
    console.log(currentLocation)
    varos.innerHTML = `${data.name}`
    return currentLocation;
}