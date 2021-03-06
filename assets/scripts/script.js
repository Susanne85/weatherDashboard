
let searchForCity = $('.searchContainer');
let oldSearchList = $('.oldSearchList');
let oldSearchContainer = $('.oldSearchContainer');

let searchResults = $('#searchResults');
let fiveDayForcast = $('.fiveDayForcastContainer');

let buttonItem, myweather, myWeatherHistory;

let myWeather = {
  cityName: '',
};

// Structure of code getOldCityList --> getSearchCityName --> getOldCityName --> getCityName --> promiseToGet5DayForcastlsFullFulled --> promiseToParseGetLatLonIsFullfilled

//Functions to get 5 days of weather data

function promiseToGet5DayForcastlsFullFulled(fiveDayForecast) {
  return fiveDayForecast.json();
}

function promiseToGet5DayForcastlsRejected(fiveDayForecastRejectionReason) {
  console.log('Failed to Get 5 Day Forecast ', fiveDayForecastRejectionReason);
}

function promiseToParse5DayForecastlsRejected(parseFiveDayRejectionReason) {
  console.log('Failed to Parse 5 Day Forecast ', parseFiveDayRejectionReason);
}

function saveCityName (cityName) {
  //Check that Latitude and Longitude was obtained before saving to Local Storage
  cityName = cityName.toLowerCase();
  initialLetter = (cityName.slice(0, 1)).toUpperCase();
  cityName = initialLetter + cityName.slice(1);

  if (myWeatherHistory !== null) {
    if (myWeather.includes(cityName)) {
    } else {
      myWeather.push(cityName);
      localStorage.setItem("myWeather", JSON.stringify(myWeather));
    }
  } else {
    myWeather.cityName = cityName;
    localStorage.setItem("myWeather", JSON.stringify(myWeather));
  }

 // redisplay page with new data
 getOldCityList();
 
}

function promiseToParse5DayForecastIsFullfilled(fiveDayForecast) {

  let fiveDayForcastItem1 = $('<h3 class="fiveDayForcast">');
  let fiveDayForcastItem2 = $('<h3 class="fiveDayForcast">');
  let fiveDayForcastItem3 = $('<h3 class="fiveDayForcast">');
  let fiveDayForcastItem4 = $('<h3 class="fiveDayForcast">');
  let fiveDayForcastItem5 = $('<h3 class="fiveDayForcast">');

  let aIcon, aIConUrl, cityTitle, h3Temp, h3Wind, h3Humidty, h3UV, h3Date, initialLetter, weatherDate, weatherIcon;

  weatherDate = fiveDayForecast.current.dt;
  weatherDate = new Date(weatherDate * 1000).toLocaleDateString("en-AU");

  cityTitle = document.getElementById("cityTitle");
  cityTitle.textContent = cityName + ' (' + weatherDate + ')';

  // Setup current day search results
  h3Wind = $('<h3>').text('Wind: ' + fiveDayForecast.current.wind_speed);
  h3Humidty = $('<h3>').text('Humidty: ' + fiveDayForecast.current.humidity);
  h3UV = $('<h3>').text('UV Index: ' + fiveDayForecast.current.uvi);

  searchResults.append(h3Temp, h3Wind, h3Humidty, h3UV);

  //Change attribute to display results
  document.getElementById("searchResults").style.display = "block";

  //Setup next 5 days forecast
  fiveDayForcast.empty();

  document.getElementById("fiveDayTitle").style.display = "block";

  for (i = 1; i < fiveDayForecast.daily.length - 2; i++) {

    weatherIcon = fiveDayForecast.daily[i].weather[0].icon;

    weatherDate = fiveDayForecast.daily[i].dt;
    weatherDate = new Date(weatherDate * 1000).toLocaleDateString("en-AU");

    h3Temp = $('<h3>').text('Temp: ' + fiveDayForecast.daily[i].temp.day);
    h3Wind = $('<h3>').text('Wind: ' + fiveDayForecast.daily[i].wind_speed);
    h3Humidty = $('<h3>').text('Humidty: ' + fiveDayForecast.daily[i].humidity);

    h3Date = $('<h3>').text('(' + weatherDate + ')');

    aIcon = $('<img src="">');
    aIConUrl = 'https://openweathermap.org/img/w/' + weatherIcon + '.png';

    if (i === 1) {
      fiveDayForcastItem1.append(h3Date, aIcon, h3Temp, h3Wind, h3Humidty);
      fiveDayForcast.append(fiveDayForcastItem1);
    } else if (i === 2) {
      fiveDayForcastItem2.append(h3Date, aIcon, h3Temp, h3Wind, h3Humidty);
      fiveDayForcast.append(fiveDayForcastItem2);
    } else if (i === 3) {
      fiveDayForcastItem3.append(h3Date, aIcon, h3Temp, h3Wind, h3Humidty);
      fiveDayForcast.append(fiveDayForcastItem3);
    } else if (i === 4) {
      fiveDayForcastItem4.append(h3Date, aIcon, h3Temp, h3Wind, h3Humidty);
      fiveDayForcast.append(fiveDayForcastItem4);
    } else {
      fiveDayForcastItem5.append(h3Date, aIcon, h3Temp, h3Wind, h3Humidty);
      fiveDayForcast.append(fiveDayForcastItem5);
    }

    document.getElementsByTagName("img")[i - 1].setAttribute("src", aIConUrl);
  }

  saveCityName (cityName);
 
}

//Functions to get Latitude and Longitude for a given city name
function promiseToGetLatLonlsFullFulled(cityLatLong) {
  return cityLatLong.json();
}

function promiseToGetLatLonlsRejected(getLatLonRejectionReason) {
  console.log('Failed to Get Latitude and Longitude', getLatLonRejectionReason);
}

function promiseToParseGetLatLonIsFullfilled(cityLatLong) {
  let h2Name

  //Only get Weather Details if a Latitude and Longitude has been found
  if (cityLatLong.length != 0) {

    searchResults.empty();
    h2Name = $('<h2 id="cityTitle">').text(cityLatLong[0].name);

    searchResults.append(h2Name);

    let fiveDayURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + cityLatLong[0].lat + '&lon=' + cityLatLong[0].lon + '&exclude=minutely,hourly,alerts&units=metric&appid=b26f4816274f049d0516bd544a28d7f5';

    let promiseToGet5DayForcast = fetch(fiveDayURL);

    let promiseToParse5DayForecast = promiseToGet5DayForcast.then(
      promiseToGet5DayForcastlsFullFulled,
      promiseToGet5DayForcastlsRejected
    );

    let promiseToDoNothing = promiseToParse5DayForecast.then(
      promiseToParse5DayForecastIsFullfilled,
      promiseToParse5DayForecastlsRejected
    )

  } else {
    console.log('Latitude and Longitude object is empty');
    //Clear previous 5 day forecast
    fiveDayForcast.empty();
  }
}

function promiseToParseGetLatLonlsRejected(parseLatLonRejectionReason) {
  console.log('Failed to Parse Latitude and Longitude ', parseLatLonRejectionReason);
}

function getCityName(cityName) {
  let buttonItem, myWeatherHistory;

  let myWeather = {
    cityName: '',
  };

  searchResults.empty();

  myWeatherHistory = JSON.parse(localStorage.getItem("myWeather"));

  if (cityName != '') {
    if (myWeatherHistory !== null) {
      myWeather = Object.values(myWeatherHistory);
      for (i = 0; i < myWeather.length; i++) {
        buttonItem = $('<button class="oldSearchList">').text(myWeather[i]);
        oldSearchList.append(buttonItem);
      }
    }

    let promiseToGetLatLon = fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + ',au&limit=1&appid=b26f4816274f049d0516bd544a28d7f5');

    let promiseToParseGetLatLon = promiseToGetLatLon.then(
      promiseToGetLatLonlsFullFulled,
      promiseToGetLatLonlsRejected
    );

    let promiseToDoNothingLatLon = promiseToParseGetLatLon.then(
      promiseToParseGetLatLonIsFullfilled,
      promiseToParseGetLatLonlsRejected
    );
  }
}
function getSearchCityName(event) {
  cityName = event.target.parentElement.children[1].value;
  getCityName(cityName);
  event.target.parentElement.children[1].value = '';
}

function getOldCityName(event) {
  cityName = event.target.textContent;
  getCityName(cityName);
}

function getOldCityList(event) {
  // get any old city/town searches

  myWeatherHistory = JSON.parse(localStorage.getItem("myWeather"));

  if (myWeatherHistory !== null) {
    myWeather = Object.values(myWeatherHistory);
    oldSearchContainer.empty();

    for (i = 0; i < myWeather.length; i++) {
      buttonItem = $('<button class="oldSearchList">').text(myWeather[i]);
      oldSearchContainer.append(buttonItem);
    }
  }
}
getOldCityList();
searchForCity.on('click', '#searchForCity', getSearchCityName);
oldSearchContainer.on('click', '.oldSearchList', getOldCityName);