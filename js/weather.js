



let airQuality = document.querySelector('.airQuality');
let wind = document.querySelector('.Wind');
let humidity = document.querySelector('.Humidity');
let pressure = document.querySelector('.Pressure');
let visibility = document.querySelector('.Visibility');
let uvIndex = document.querySelector('.Uv');
let temperature = document.querySelector('.Temperature');

let deg = document.querySelector('.degs');
let deg2 = document.querySelector('.degs2');
let tempDegButton = document.querySelector('.tempDeg');



let city = document.querySelector('.city');
let region = document.querySelector('.region');
let contry = document.querySelector('.contry');




const addHTML = (data, dataYahoo) => {
    airQuality.children[1].innerHTML = dataYahoo.data[0].aqi;
    const condition = data.current.condition.code;
    temperature.innerHTML = data.current.temp_c;
    wind.children[1].innerHTML = data.current.wind_kph + " KP/H";
    humidity.children[1].innerHTML = data.current.humidity + "%";
    visibility.children[1].innerHTML = data.current.vis_km + " KM";
    pressure.children[1].innerHTML = data.current.pressure_mb + " MB";
    uvIndex.children[1].innerHTML = data.current.uv + "<sup> o </sup>";
    city.innerHTML = data.location.name;
    region.innerHTML = data.location.region;
    contry.innerHTML = data.location.country;
    tempDegButton.addEventListener('click', () => {
        if (deg.innerHTML === `C`) {
            deg.innerHTML = `F`;
            deg2.innerHTML = `F`;
            temperature.innerHTML = data.current.temp_f;
        } else {
            deg.innerHTML = `C`;
            deg2.innerHTML = `C`;
            temperature.innerHTML = data.current.temp_c;
        }
    });

    
    console.log(condition);
}


const CurrentTime = () => {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    let strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
    document.querySelector('.Current-Time').innerHTML = strTime;
    setTimeout(CurrentTime, 1000);

}

const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log('Geolocation is not supported by this browser.');
    }
}

const showPosition = async (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log('Latitude: ' + latitude + ' Longitude: ' + longitude);
    const data = await RealtimeWeather(latitude, longitude);
    const dataYahoo = await RealtimeWeatherYahoo(latitude, longitude);
    addHTML(data, dataYahoo);
    console.log("this dtaa", data);
    console.log("this yahoo", dataYahoo);
}


getLocation();
CurrentTime();

const RealtimeWeather = async (latitude, longitude) => {

    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${latitude}%2C${longitude}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'a3ff4e9cedmshcec15703bdc772dp193eb6jsn8b0c55b9d5f8',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();

        return result;
    } catch (error) {
        console.error(error);
    }
};

const RealtimeWeatherYahoo = async (latitude, longitude) => {
    const url = `https://air-quality.p.rapidapi.com/current/airquality?lon=${longitude}&lat=${latitude}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'e1d35bcec6mshfd8ab498d42aa17p1b0badjsn547826a163db',
            'X-RapidAPI-Host': 'air-quality.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        return result;

    } catch (error) {
        console.error(error);
    }
}



// const ForecastWeather = async () => {
//     const url = 'https://weatherapi-com.p.rapidapi.com/forecast.json?q=London&days=3';
//     const options = {
//         method: 'GET',
//         headers: {
//             'X-RapidAPI-Key': 'a3ff4e9cedmshcec15703bdc772dp193eb6jsn8b0c55b9d5f8',
//             'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
//         }
//     };

//     try {
//         const response = await fetch(url, options);
//         const result = await response.json();
//         console.log(result);
//     } catch (error) {
//         console.error(error);
//     }
// }


// ForecastWeather();








// Weather map

const MapSDK = () => {

    maptilersdk.config.apiKey = 'TBPCidV0J9gS2FstEmYQ';
    const weatherLayers = {
        "precipitation": {
            "layer": null,
            "value": "value",
            "units": " mm"
        },
        "pressure": {
            "layer": null,
            "value": "value",
            "units": " hPa"
        },
        "radar": {
            "layer": null,
            "value": "value",
            "units": " dBZ"
        },
        "temperature": {
            "layer": null,
            "value": "value",
            "units": "°"
        },
        "wind": {
            "layer": null,
            "value": "speedMetersPerSecond",
            "units": " m/s"
        }
    };

    const map = (window.map = new maptilersdk.Map({
        container: 'map', // container's id or the HTML element to render the map
        style: maptilersdk.MapStyle.BACKDROP,  // stylesheet location
        zoom: 1,
        center: [-42.66, 37.63],
        hash: true,
    }));

    const initWeatherLayer = "wind";
    const timeInfoContainer = document.getElementById("time-info");
    const timeTextDiv = document.getElementById("time-text");
    const timeSlider = document.getElementById("time-slider");
    const playPauseButton = document.getElementById("play-pause-bt");
    const pointerDataDiv = document.getElementById("pointer-data");
    let pointerLngLat = null;
    let activeLayer = null;
    let isPlaying = false;
    let currentTime = null;

    timeSlider.addEventListener("input", (evt) => {
        const weatherLayer = weatherLayers[activeLayer]?.layer;
        if (weatherLayer) {
            weatherLayer.setAnimationTime(parseInt(timeSlider.value / 1000));
        }
    });

    // When clicking on the play/pause
    playPauseButton.addEventListener("click", () => {
        const weatherLayer = weatherLayers[activeLayer]?.layer;
        if (weatherLayer) {
            if (isPlaying) {
                pauseAnimation(weatherLayer);
            } else {
                playAnimation(weatherLayer);
            }
        }
    });

    function pauseAnimation(weatherLayer) {
        weatherLayer.animateByFactor(0);
        playPauseButton.innerText = "Play 3600x";
        isPlaying = false;
    }

    function playAnimation(weatherLayer) {
        weatherLayer.animateByFactor(3600);
        playPauseButton.innerText = "Pause";
        isPlaying = true;
    }

    map.on('load', function () {
        map.setPaintProperty("Water", 'fill-color', "rgba(0, 0, 0, 0.4)");
        initWeatherMap(initWeatherLayer);
    });

    map.on('mouseout', function (evt) {
        if (!evt.originalEvent.relatedTarget) {
            pointerDataDiv.innerText = "";
            pointerLngLat = null;
        }
    });

    function updatePointerValue(lngLat) {
        if (!lngLat) return;
        pointerLngLat = lngLat;
        const weatherLayer = weatherLayers[activeLayer]?.layer;
        const weatherLayerValue = weatherLayers[activeLayer]?.value;
        const weatherLayerUnits = weatherLayers[activeLayer]?.units;
        if (weatherLayer) {
            const value = weatherLayer.pickAt(lngLat.lng, lngLat.lat);
            if (!value) {
                pointerDataDiv.innerText = "";
                return;
            }
            pointerDataDiv.innerText = `${value[weatherLayerValue].toFixed(1)}${weatherLayerUnits}`
        }
    }

    map.on('mousemove', (e) => {
        updatePointerValue(e.lngLat);
    });

    document.getElementById('buttons').addEventListener('click', function (event) {
        // Change layer based on button id
        changeWeatherLayer(event.target.id);
    });

    function changeWeatherLayer(type) {
        if (type !== activeLayer) {
            if (map.getLayer(activeLayer)) {
                const activeWeatherLayer = weatherLayers[activeLayer]?.layer;
                if (activeWeatherLayer) {
                    currentTime = activeWeatherLayer.getAnimationTime();
                    map.setLayoutProperty(activeLayer, 'visibility', 'none');
                }
            }
            activeLayer = type;
            const weatherLayer = weatherLayers[activeLayer].layer || createWeatherLayer(activeLayer);
            if (map.getLayer(activeLayer)) {
                map.setLayoutProperty(activeLayer, 'visibility', 'visible');
            } else {
                map.addLayer(weatherLayer, 'Water');
            }
            changeLayerLabel(activeLayer);
            activateButton(activeLayer);
            changeLayerAnimation(weatherLayer);
            return weatherLayer;
        }
    }

    function activateButton(activeLayer) {
        const buttons = document.getElementsByClassName('button');
        for (let i = 0; i < buttons.length; i++) {
            const btn = buttons[i];
            if (btn.id === activeLayer) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        }
    }

    function changeLayerAnimation(weatherLayer) {
        weatherLayer.setAnimationTime(parseInt(timeSlider.value / 1000));
        if (isPlaying) {
            playAnimation(weatherLayer);
        } else {
            pauseAnimation(weatherLayer);
        }
    }

    function createWeatherLayer(type) {
        let weatherLayer = null;
        switch (type) {
            case 'precipitation':
                weatherLayer = new maptilerweather.PrecipitationLayer({ id: 'precipitation' });
                break;
            case 'pressure':
                weatherLayer = new maptilerweather.PressureLayer({
                    opacity: 0.8,
                    id: 'pressure'
                });
                break;
            case 'radar':
                weatherLayer = new maptilerweather.RadarLayer({
                    opacity: 0.8,
                    id: 'radar'
                });
                break;
            case 'temperature':
                weatherLayer = new maptilerweather.TemperatureLayer({
                    colorramp: maptilerweather.ColorRamp.builtin.TEMPERATURE_3,
                    id: 'temperature'
                });
                break;
            case 'wind':
                weatherLayer = new maptilerweather.WindLayer({ id: 'wind' });
                break;
        }

        // Called when the animation is progressing
        weatherLayer.on("tick", event => {
            refreshTime();
            updatePointerValue(pointerLngLat);
        });

        // Called when the time is manually set
        weatherLayer.on("animationTimeSet", event => {
            refreshTime();
        });

        // Event called when all the datasource for the next days are added and ready.
        // From now on, the layer nows the start and end dates.
        weatherLayer.on("sourceReady", event => {
            const startDate = weatherLayer.getAnimationStartDate();
            const endDate = weatherLayer.getAnimationEndDate();
            if (timeSlider.min > 0) {
                weatherLayer.setAnimationTime(currentTime);
                changeLayerAnimation(weatherLayer);
            } else {
                const currentDate = weatherLayer.getAnimationTimeDate();
                timeSlider.min = +startDate;
                timeSlider.max = +endDate;
                timeSlider.value = +currentDate;
            }
        });

        weatherLayers[type].layer = weatherLayer;
        return weatherLayer;
    }

    // Update the date time display
    function refreshTime() {
        const weatherLayer = weatherLayers[activeLayer]?.layer;
        if (weatherLayer) {
            const d = weatherLayer.getAnimationTimeDate();
            timeTextDiv.innerText = d.toString();
            timeSlider.value = +d;
        }
    }

    function changeLayerLabel(type) {
        document.getElementById("variable-name").innerText = type;
    }

    function initWeatherMap(type) {
        const weatherLayer = changeWeatherLayer(type);
    }

}


MapSDK();