var apiKey = "f1184d25cda8c95b7f70e8f490ba15c4";
//var requestURL = `https:/api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid={f1184d25cda8c95b7f70e8f490ba15c4}`;

var searchForm = document.querySelector("#city-input");
var searchBtn = document.querySelector("#city-submit");
var mainWeather = document.querySelector(".main-weather");
var fiveDayEl = document.querySelector(".five-day");
var cityHistory = document.querySelector("city-history");


//day.js plugins
// dayjs.extend(window.dayjs_plugin_utc);
// dayjs.extend(window.dayjs_plugin_timezone);

//city search function
function citySearchSubmit(event) {
  event.preventDefault();
  console.log("click");
  var city = searchForm.value.trim();
  searchWeather(city);
  console.log(event);
  localStorage.setItem("city", JSON.stringify);
}
//how to local storage, i have no idea
// function appendToHistory(search) {
//   if (cityHistory.indexOf(search) !== -1) {
//     return;
//   }
//   cityHistory.push(search);

//   localStorage.setItem("city-history", JSON.stringify(cityHistory));
//   renderCityHistory();
// }
//const cityHistory = JSON.parse(localStorage.getItem("cityHistoryEl")) ||[];
//const cityHistoryEl = document.getElementById("city-history");
//cityHistoryEl(item => {
//  const cityHistory = document.createElement("div");
//cityHistory.textContent = item.name;
//displayElement.appendChild(itemElement);
//});

//fetch api
function searchWeather(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var weatherIcon = data.weather[0].icon;
      var weatherImageURL = `https://openweathermap.org/img/wn/${weatherIcon}.png`;
      var todaysDate = new Date(data.dt * 1000).toLocaleString().split(",")[0];
      console.log(todaysDate)

      //added html elements with weather data
      //var date = dayjs().format('M/D/YYYY');
      var currentWeather = `
        <h2>${data.name}</h2>
        <span>${todaysDate}</span>
        <img src="${weatherImageURL}" alt="${data.weather[0].description}"/>
        <p>${data.weather[0].description}</p>
        <p>temp: ${data.main.temp}°F</p>
        <p>humidity: ${data.main.humidity}%</p>
        <p>windspeed: ${data.wind.speed}mph</p>
        
        `;

      //getting lat and lon data
      mainWeather.innerHTML = currentWeather;
      var lon = data.coord.lon;
      var lat = data.coord.lat;
      fetch(
        `https:/api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (forecastdata) {
          let fiveDayArray = forecastdata.list.filter((day) =>
            day.dt_txt.includes("12:00:00")
          );
          console.log(fiveDayArray);
          let fiveDayCard = "";
          for (var i = 0; i < fiveDayArray.length; i++) {
            fiveDayCard += `
                    <div>
                    <h4>${dayjs.unix(fiveDayArray[i].dt).format("MM/DD/YYYY")}</h4>
                    <h4>${fiveDayArray[i].main.temp}°F</h4>
                    <h4>${fiveDayArray[i].main.humidity}%</h4>
                    <h4>${fiveDayArray[i].wind.speed}mph</h4>
                    </div>
                    
                    
                    
                    `;
            fiveDayEl.innerHTML = fiveDayCard;
            
            

          }
        });
    });
}

//city search function
function citySearchSubmit(event) {
  event.preventDefault();
  console.log("click");
  var city = searchForm.value.trim();
  searchWeather(city);
  for (let i = 0; i < cityHistory.length; i++) {
    const btn = document.createElement("button");
    btn.textContent = cityHistory[i];
    searchHistoryContainer.append(btn);
    btn.setAttribute("city-search", cityHistory[i]);
  }

  console.log(event);
}
//how to local storage, i have no idea
//add cities to local storage and display history
var cityHistory = [];
var displayCityHistory = document.getElementById("city-history");

function appendToHistory(search) {
  if (cityHistory.indexOf(search) !== -1) {
    return;
  }
  cityHistory.push(search);

  localStorage.setItem("city-history", JSON.stringify(cityHistory));
  renderCityHistory();
}


//event listener to submit form for city search
searchBtn.addEventListener("click", citySearchSubmit);
