# weather-check
This is a simple web application that provides users with real-time weather information.  

Users can enter the name of any city they want in the world and receive up-to-date weather information for that location, as well as a forecast for the next days. 

# Requirements
Browser with JavaScript support

Node.js with Express and Axios

Free API from openweathermap.org (you have to sign up for a free account)

Internet connection

*** The application was tested using Chrome 120.0.6099.110, node.js v20.10.0, Express 4.18.2, Axios 1.6.2 ***

# Installation
1) Clone this repository (i.e. git clone https://github.com/georgche/weather-check.git) to your computer

2) Install dependencies: Navigate to the "weather-check_backend" directory and run "npm install". This will read the package.json file and install Express and Axios in your local node_modules directory 

3) While still at the "weather-check_backend" directory, using a text editor, open server.js and add your openweathermap API key on line 9

# How to run
While at the weather-check_backend folder, start the server by typing: node server.js 

Open a browser and navigate to http://localhost:3000
