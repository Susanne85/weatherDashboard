
let searchResults = $('.searchResults');
let searchForCity = $('.searchContainer');
let oldSearchList = $('.oldSearchList');
let fiveDayForcast = $('.fiveDayForcastContainer');

let fiveDayForcastItem1 = $('<h3 class = "fiveDayForcast">');
let fiveDayForcastItem2 = $('<h3 class = "fiveDayForcast">');
let fiveDayForcastItem3 = $('<h3 class = "fiveDayForcast">');
let fiveDayForcastItem4 = $('<h3 class = "fiveDayForcast">');
let fiveDayForcastItem5 = $('<h3 class = "fiveDayForcast">');

//let fiveDayForcastArray =["fiveDayForcastItem1", "fiveDayForcastItem2","fiveDayForcastItem3","fiveDayForcastItem4","fiveDayForcastItem5"];

//let cityName;

//Functions to get 5 days of weather data

function promiseToGet5DayForcastlsFullFulled(fiveDayForecast) {
  return fiveDayForecast.json();
}

function promiseToGet5DayForcastlsRejected(fiveDayForecastRejectionReason) {
    console.log('Failed to Get 5 Day Forecast ', fiveDayForecastRejectionReason);
}

function promiseToParse5DayForecastlsRejected (parseFiveDayRejectionReason) {
  console.log('Failed to Parse 5 Day Forecast ', parseFiveDayRejectionReason);
}

function promiseToParse5DayForecastIsFullfilled(fiveDayForecast){

  console.log('fiveDayForecast in parse is ', fiveDayForecast);

  let aIcon, aIConUrl, cityName1, cityTitle, h3Temp, h3Wind, h3Humidty, h3UV, h3Date, weatherDate, weatherIcon;
  weatherDate = fiveDayForecast.current.dt ;

  weatherDate  = new Date(weatherDate * 1000).toLocaleDateString("en-AU");

  cityTitle =  document.getElementsByClassName("cityTitle"); 
  cityName1 = cityTitle[0].textContent;
  cityName1 = cityName + ' (' + weatherDate + ')';
  cityTitle[0].textContent = cityName1;

  // Setup current day search results
  h3Temp = $('<h3>').text('Temp: ' + fiveDayForecast.current.temp);
  h3Wind = $('<h3>').text('Wind: ' + fiveDayForecast.current.wind_speed);
  h3Humidty = $('<h3>').text('Humidty: ' + fiveDayForecast.current.humidity);
  h3UV = $('<h3>').text('UV Index: ' + fiveDayForecast.current.uvi);

  searchResults.append(h3Temp, h3Wind, h3Humidty, h3UV);

  //Setup next 5 days forecast

  for (i=1; i < fiveDayForecast.daily.length-2; i++){

    weatherIcon = fiveDayForecast.daily[i].weather[0].icon;
     
    weatherDate = fiveDayForecast.daily[i].dt;

    console.log('date is ' , weatherDate);
    weatherDate  = new Date(weatherDate * 1000).toLocaleDateString("en-AU");
    console.log('date is ' , weatherDate);
    
    h3Temp = $('<h3>').text('Temp: ' + fiveDayForecast.daily[i].temp.day);
    h3Wind = $('<h3>').text('Wind: ' + fiveDayForecast.daily[i].wind_speed);
    h3Humidty = $('<h3>').text('Humidty: ' + fiveDayForecast.daily[i].humidity);
    
    h3Date = $('<h3>').text('(' + weatherDate + ')');

    aIcon = $('<img src="">');
    aIConUrl = 'http://openweathermap.org/img/w/' + weatherIcon + '.png';
    
 // console.log('Weather Icon is', aIConUrl );
  
    if(i === 1){
      fiveDayForcastItem1.append(h3Date, aIcon, h3Temp, h3Wind, h3Humidty);
      fiveDayForcast.append(fiveDayForcastItem1);
    }else if (i ===2) {
      fiveDayForcastItem2.append(h3Date, aIcon, h3Temp, h3Wind, h3Humidty);
      fiveDayForcast.append(fiveDayForcastItem2);
    }else if (i === 3) {
      fiveDayForcastItem3.append(h3Date, aIcon, h3Temp, h3Wind, h3Humidty);
      fiveDayForcast.append(fiveDayForcastItem3);
    }else if (i === 4) {
      fiveDayForcastItem4.append(h3Date,aIcon, h3Temp, h3Wind, h3Humidty);
      fiveDayForcast.append(fiveDayForcastItem4);
    }else {
      fiveDayForcastItem5.append(h3Date, aIcon, h3Temp, h3Wind, h3Humidty);
      fiveDayForcast.append(fiveDayForcastItem5);
    }

    document.getElementsByTagName("img")[i-1].setAttribute("src", aIConUrl); 
  } 
}

//Functions to get Latitude and Longitude for a given city name
function promiseToGetLatLonlsFullFulled(cityLatLong){
  return cityLatLong.json();
}

function promiseToGetLatLonlsRejected(getLatLonRejectionReason){
  console.log('Failed to Get Latitude and Longitude', getLatLonRejectionReason);
}

function promiseToParseGetLatLonIsFullfilled(cityLatLong){
  console.log('in Promise to get lat and longitude is ', cityLatLong + cityLatLong.length);
  let h2Name;

  //Only get Weather Details if a Latitude and Longitude has been found
  if (cityLatLong.length != 0){

    searchResults.empty();
    h2Name = $('<h2 class="cityTitle">').text(cityLatLong[0].name);
   
    searchResults.append(h2Name);
  
    var fiveDayURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + cityLatLong[0].lat +'&lon=' + cityLatLong[0].lon + '&exclude=minutely,hourly,alerts&units=metric&appid=b26f4816274f049d0516bd544a28d7f5';

   
    var promiseToGet5DayForcast = fetch(fiveDayURL);

    var promiseToParse5DayForecast = promiseToGet5DayForcast.then(
      promiseToGet5DayForcastlsFullFulled,
      promiseToGet5DayForcastlsRejected
    );

    var promiseToDoNothing = promiseToParse5DayForecast.then(
      promiseToParse5DayForecastIsFullfilled,
      promiseToParse5DayForecastlsRejected
    )
    return;
  } else {
    console.log('Latitude and Longitude object is empty');
  }
}

function promiseToParseGetLatLonlsRejected(parseLatLonRejectionReason){
  console.log('Failed to Parse Latitude and Longitude ', parseLatLonRejectionReason);
}

function getCityName(cityName){
  console.log(cityName);
  let myWeatherHistory;

  let myWeather = {
   cityName:'',
  };

 // cityName = event.target.parentElement.children[1].value;

  myWeatherHistory = JSON.parse(localStorage.getItem("myWeather"));

  if(cityName !=''){
    if (myWeatherHistory !== null) {
        myWeather = Object.values(myWeatherHistory);
   //     console.log('cityName is ', myWeather + 'lenght is ' + myWeather.length);
        
        for (i=0; i < myWeather.length; i++){
          let buttonItem = $('<button class="oldSearchList">').text(myWeather[i]);
          oldSearchList.append(buttonItem);
        }
    }
    console.log('city name for longitude is ', cityName);

    let promiseToGetLatLon = fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + ',au&limit=1&appid=b26f4816274f049d0516bd544a28d7f5');
    
    var promiseToParseGetLatLon = promiseToGetLatLon.then(
      promiseToGetLatLonlsFullFulled,
      promiseToGetLatLonlsRejected
    );

    var promiseToDoNothingLatLon = promiseToParseGetLatLon.then(
      promiseToParseGetLatLonIsFullfilled,
      promiseToParseGetLatLonlsRejected
    )

    if (myWeatherHistory !== null) {
      if (myWeather.includes(cityName)){
      } else {
       myWeather.push(cityName);
       localStorage.setItem("myWeather", JSON.stringify(myWeather));
     }
    }else {
      myWeather.cityName = cityName;
      localStorage.setItem("myWeather", JSON.stringify(myWeather));
    }
  }
}
function getSearchCityName (event){
  cityName = event.target.parentElement.children[1].value;
  getCityName(cityName);
}

function getOldCityName(event) {
  cityName = event.target.textContent;
  getCityName(cityName);
}

 searchForCity.on('click','#searchForCity', getSearchCityName);
 oldSearchList.on('click','.oldSearchList', getOldCityName);

