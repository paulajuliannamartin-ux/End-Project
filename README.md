# End-Project

I used this project idea:
5) Weather Dashboard
What: City Search + current weather/forecast; unit toggle; store recent searches locally.
API: OpenWeatherMap- API key required (free tier).
https://openweathermap.org/api

Goal: "Build a single-page or multi-page web app that retrieves data from one or more public web APIs using fetch. No server SQL database is required. 
Persisting anything is opotional, but could be done in localStorage."
I wanted to build a single-page web app that uses APIs from https://openweathermap.org/api, and that uses the data fetched for the foreseable 7 days, using geolocation for the search tool.
The task at hand for the web app is to create and interactive CSS that reacts to the data that is fetch() for the upcoming days (for example: Rainy days uses blue-gray colours, Cloudy days 
uses grey colours, and more). So when the data has been retrieved, the JavaScript can change the colouring theme as instructed in the code. 

Requirements:
Front End:
Semantic HTML Structure.
What I have done in index.html: Create a head where I have added a title name to the web app, and linked via a href to the style.css file. In the body I have added a header with a headline, and a paragraph. I added a div with the id="search-box" that will interact with the app.js file (that will fetch () the geocoding data retrieved with the API key) and a search button next to it. In the main I have used containers to call the css and javascript files. The css file will stye this container for the weather card layout, and javascript will update the theme using the card.eventListener that calls the function updateTheme. 

CSS for responsive layout and clear UI:
What I have done in CSS is the set the framework for the stylesheets that the JavaScript file can interact with, like search-btn, weather-container, day-card and day-card:hover. 

JavaScript:
Use fetch to call at least one public API in your javascript file. 
Display results dynamically (list/cards/detail views).
Provide at least one interactive control (search, filter, sort, pagination, or a form that hits a POST endpoint on a mock API). The code built in app.js has these steps to run the elements for the web-app: 
We start with adding the APIkey to a const variable, and set the default city to Stockholm. Secondly we create an event listener that reacts to the search function and recieves the text from city-input and is sent to getWeather(city). Main function in the javascript file is retriving the weather data which I have done with a async function. It also gathers the geographical coordinates to retrieve the data based on city search. I have chosen to filter the data with these aspects; current, hourly and daily for the data that I (web-app) needs. I have also filtered that the data retrieved data.horly works with the data hour to hour for the first 24h, and data.daily contains all the 7-days used in the web app.  display.Weather creates the day cards and the loop goes through each day, and calls the update.Theme function to change the colouring of the web app. 

Short description: When the page loads it retrieves getWeather(Stockholm), getWeather() retrieves city coordinates and the weather data needed, displayWeather creates the daily cards, and update.Theme changes the websites background colour based on the weather. 

Thank you, 
Paula Martin
