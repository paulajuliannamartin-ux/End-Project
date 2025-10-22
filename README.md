# End-Project

I used this project idea:
5) Weather Dashboard
What: City Search + current weather/forecast; unit toglle; store recent searches locally.
API: OpenWeatherMap- API key required (free tier).
https://openweathermap.org/api

Goal: "Build a single-page or multi-page web app that retrieves data from one or more public web APIs using fetch. No server SQL database is required. 
Persisting anyhting is apotional, but could be done in localStorage."
I wanted to build a single-page web app that uses APIs from https://openweathermap.org/api, and that uses the data fetched for the foreseable 7 days, using geolocation for the search tool.
The task at hand for the web app is to create and interactive CSS that reacts to the data that is fetch() for the upcoming days (for example: Rainy days uses blue-gray colours, Cloudy days 
uses grey colours, and more). So when the data has been retrived, the JavaScript can change the colouring theme as instructed in the code. 

Requirements:
Front End:
Semantic HTML Structure.
What I have done in index.html: Create a head where I have added a title name to the web app, and linked via a href to the style.css file. In the body I have added a header with a headline, and a paragraph. I added a div with the id="search-box" that will interact with the app.js file (that will fetch () the geocoding data retrieved with the API key) and a search button next to it. In the main I have used containers to call the css and javascript files. The css file will stye this container for the weather card layout.
