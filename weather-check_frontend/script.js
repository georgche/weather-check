// Adds event listener to the weather form to handle the submit event from the user
document.getElementById('weatherForm').addEventListener('submit', function(e) {
    e.preventDefault(); 
    const cityName = document.getElementById('cityName').value; // Gets the entered city name
    fetchWeather(cityName); // Fetches the weather data for the entered city
    fetchForecast(cityName); // Fetches the forecast data for the entered city
});

// Function to fetch the current weather data of the desired city
function fetchWeather(cityName) {
    fetch(`/weather?city=${cityName}`) // Makes a request to the server with the city name
        .then(response => {
            return response.json(); 
        })
        .then(data => {
            if (!data || !data.weather || data.weather.length === 0) {
                throw new Error('Data not available'); // Throws error if weather data is not present
            }
            const weatherCondition = data.weather[0].description; 
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`; // URL for the weather icons
            const tempClass = getTemperatureClass(data.temp); // Gets the temperature class for styling
            // Sets the inner HTML of the weatherResult element with the weather data
            document.getElementById('weatherResult').innerHTML = `
                <h2>Current conditions for: ${cityName}</h2>
                <img src="${iconUrl}" alt="${weatherCondition}" title="${weatherCondition}">
                Temperature: <span class="${tempClass}">${data.temp}°C</span><br>
                Humidity: ${data.humidity}%<br>
                Wind Speed: ${data.windSpeed} km/h<br>
                Condition: ${weatherCondition}
            `;
        })
        .catch(error => {
            // Handle any errors and display an error message
            document.getElementById('weatherResult').innerHTML = `<p>${error.message}. Please enter the city name again.</p>`;
            document.getElementById('forecastResult').style.display = 'none'; 
        });
}

// Function to determine the temperature range class  based on temperature value
function getTemperatureClass(temp) {
    if (temp < 10) return 'temp-cold';
    if (temp >= 10 && temp < 20) return 'temp-mild';
    if (temp >= 20 && temp < 30) return 'temp-warm';
    return 'temp-hot';
}

// Function to fetch the forecast data
function fetchForecast(cityName) {
    fetch(`/forecast?city=${cityName}`) // Makes a request to the server with the desired city name
        .then(response => {
            return response.json(); 
        })
        .then(data => {
            const forecastDiv = document.getElementById('forecast');
            forecastDiv.innerHTML = ''; 
            let dailyTemperatures = {};

            // Process the forecast data to calculate daily min and max temperatures (as I was using the 3-hour interval free API)
            data.list.forEach(forecast => {
                const date = new Date(forecast.dt * 1000).toDateString();
                if (!dailyTemperatures[date]) {
                    dailyTemperatures[date] = {
                        minTemp: forecast.main.temp_min,
                        maxTemp: forecast.main.temp_max,
                        icon: forecast.weather[0].icon
                    };
                } else {
                    dailyTemperatures[date].minTemp = Math.min(dailyTemperatures[date].minTemp, forecast.main.temp_min);
                    dailyTemperatures[date].maxTemp = Math.max(dailyTemperatures[date].maxTemp, forecast.main.temp_max);
                }
            });

            // Display the forecast data
            for (let date in dailyTemperatures) {
                const dayData = dailyTemperatures[date];
                const iconUrl = `http://openweathermap.org/img/wn/${dayData.icon}.png`; // URL for the weather icons
                forecastDiv.innerHTML += `
                    <p>${date}: 
                        <img src="${iconUrl}" alt="Weather Icon" title="Weather Icon">
                        Min Temp: ${dayData.minTemp.toFixed(1)}°C, 
                        Max Temp: ${dayData.maxTemp.toFixed(1)}°C
                    </p>`;
            }

            document.getElementById('forecastResult').style.display = 'block'; 
        })
}
