var apiKey = "f1184d25cda8c95b7f70e8f490ba15c4";
//var requestURL = `https:/api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid={f1184d25cda8c95b7f70e8f490ba15c4}`;

var searchForm = document.querySelector("#city-input");
var searchBtn = document.querySelector("#city-submit");
var mainWeather = document.querySelector(".main-weather");
var fiveDayEl = document.querySelector(".five-day");

//city search function
function citySearchSubmit(event) {
  event.preventDefault();
  console.log("click");
  var city = searchForm.value.trim();
  searchWeather(city);
  console.log(event);
}
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

      //added html elements with weather data
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
//add cities to local storage and display history

//event listener to submit form for city search
searchBtn.addEventListener("click", citySearchSubmit);

