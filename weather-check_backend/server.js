// Import the necessary modules
const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 3000;

// API key for OpenWeatherMap
const API_KEY = 'Enter_your_API_key_here'; // *** OpenWeatherMap API key entered here ****

// Define the path to the frontend files directory
const frontendPath = path.join(__dirname, '../weather-check_frontend');
app.use(express.static(frontendPath));

// Route to serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

// Route to handle weather data requests
app.get('/weather', (req, res) => {
    const city = req.query.city;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    // Fetch weather data using axios
    axios.get(url)
        .then(response => {
            // Send back the relevant weather data
            res.json({ 
                temp: response.data.main.temp,
                humidity: response.data.main.humidity,
                windSpeed: response.data.wind.speed,
                weather: response.data.weather
            });
        })
        .catch(error => {
            res.json({ error: error.message });
        });
});

// Route to handle forecast data requests
app.get('/forecast', (req, res) => {
    const city = req.query.city;
    const forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

    // Fetch forecast data using axios
    axios.get(forecastUrl)
        .then(response => {
            // Send back the forecast data
            res.json(response.data);
        })
        .catch(error => {
            res.json({ error: error.message });
        });
});

// Start the server on the specified port
app.listen(port, () => {
    console.log(`Weather-Check Server is running on http://localhost:${port}`);
});
