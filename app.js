
const apiKey = "ec36eefa16a6f917276f73c93c99b11f"; // API-nyckel
let city = "Stockholm";

getWeather(city);

document.getElementById("search-btn").addEventListener("click", () => {
  const input = document.getElementById("city-input").value.trim();
  if (input) {
    city = input;
    getWeather(city);
  }
});

document.getElementById("city-input").addEventListener("keypress", e => {
  if (e.key === "Enter") {
    document.getElementById("search-btn").click();
  }
});

// hämta väderdata
async function getWeather(city) {
  try {
    // hämta geokodning
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${apiKey}`;
    const geoRes = await fetch(geoUrl);
    if (!geoRes.ok) throw new Error("Kunde inte hitta staden.");
    const geo = await geoRes.json();
    if (!geo.length) throw new Error("Staden hittades inte.");
    const { lat, lon, name } = geo[0];

    // hämta 7-dagars väderprognos
    const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&lang=sv&appid=${apiKey}`;
    const res = await fetch(weatherUrl);
    if (!res.ok) throw new Error("Kunde inte hämta väderdata.");
    const data = await res.json();

    document.getElementById("subtitle").textContent = `7-dagarsprognos för ${name}`;


    const hourly = data.hourly.slice(0, 24); // 24 timmar framåt
    const days = data.daily.slice(0, 7).map(d => {
      const date = new Date(d.dt * 1000).toLocaleDateString("sv-SE", {
        weekday: "short",
        day: "numeric",
        month: "short"
      });
      return {
        date,
        temp: Math.round(d.temp.day),
        weather: d.weather[0].main,      // t.ex. Clear, Rain
        desc: d.weather[0].description,  // svensk beskrivning
        icon: d.weather[0].icon          // ikon-id
      };
    });


    displayWeather(days, hourly);


    // Ändra bakgrund baserat på vädret
    updateTheme(days[0].weather);

  } catch (error) {
    console.error(error);
    document.getElementById("weather-container").innerHTML =
      `<p>${error.message}</p>`;
  }
}

// väderkort för varje dag
function displayWeather(days, hourly) {
  const container = document.getElementById("weather-container");
  container.innerHTML = "";
  const hourlyContainer = document.getElementById("hourly-container");
  hourlyContainer.innerHTML = ""; // rensa varje gång

  days.forEach((day, index) => {
    const card = document.createElement("div");
    card.className = "day-card";
    card.dataset.weather = day.weather;

    card.innerHTML = `
      <h3>${day.date}</h3>
      <img src="https://openweathermap.org/img/wn/${day.icon}@2x.png" alt="${day.desc}">
      <p>${capitalize(day.desc)}</p>
      <p>${day.temp}°C</p>
    `;

    // Klickhändelse
    card.addEventListener("click", () => {
      updateTheme(day.weather);

      // Visa timprognos endast för idag (index 0)
      if (index === 0) {
        showHourly(hourly);
      } else {
        hourlyContainer.innerHTML = "";
      }
    });

    container.appendChild(card);
  });
}

function showHourly(hourly) {
  const hourlyContainer = document.getElementById("hourly-container");
  hourlyContainer.innerHTML = ""; // rensa

  const now = new Date();

  hourly.forEach(h => {
    const time = new Date(h.dt * 1000);
    const hours = time.getHours();

    // Visa bara timmar för dagens datum
    if (time.getDate() === now.getDate()) {
      const card = document.createElement("div");
      card.className = "hour-card";
      card.innerHTML = `
        <p>${hours}:00</p>
        <img src="https://openweathermap.org/img/wn/${h.weather[0].icon}.png" alt="${h.weather[0].description}">
        <p>${Math.round(h.temp)}°C</p>
      `;
      hourlyContainer.appendChild(card);
    }
  });
}


// Ändra färg baserat på väder-kortens data
function updateTheme(weather) {
  const body = document.body;
  weather = weather.toLowerCase();

  switch (weather) {
    case "rain":
    case "drizzle":
      body.style.background = "linear-gradient(to bottom, #5f9ea0, #708090)";
      break;
    case "clouds":
      body.style.background = "linear-gradient(to bottom, #a9a9a9, #d3d3d3)";
      break;
    case "clear":
      body.style.background = "linear-gradient(to bottom, #87ceeb, #f0e68c)";
      break;
    case "snow":
      body.style.background = "linear-gradient(to bottom, #f0f8ff, #ffffff)";
      break;
    case "thunderstorm":
      body.style.background = "linear-gradient(to bottom, #3b3b98, #182848)";
      break;
    default:
      body.style.background = "linear-gradient(to bottom, #cccccc, #ffffff)";
  }
}

// Hjälpfunktion: Gör första bokstaven stor
function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}
