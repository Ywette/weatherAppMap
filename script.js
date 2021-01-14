let API_KEY = "a8e71c9932b20c4ceb0aed183e6a83bb";

/**
 * Retrieve weather data from openweathermap
 */
getWeatherData = (city) => {
  const URL = "https://api.openweathermap.org/data/2.5/weather";
  //HINT: Use template literals to create a url with input and an API key
  const FULL_URL = `${URL}?q=${city}&appid=${API_KEY}&units=metric`;
  
  const weatherPromise = fetch(FULL_URL);
  return weatherPromise.then((response)=>{ 
      //returns promise with data
    return response.json();
  })  
}

searchCity = () => {
  var city = document.getElementById('city-input').value;
   getWeatherData(city)
   .then((city)=>{ //now we have all data as an object of city (when write city in searchbox)
                        //when have response, use function to show data on html    
      showWeatherData(city);
      // console.log(city.coord.lat, city.coord.lon)
   }).catch((error)=>{
    console.log(error);
  })
}

// Show the weather data in HTML 
showWeatherData = (weatherData) => {  
    document.getElementById("city-name").innerHTML = weatherData.name;
  document.getElementById("weather-type").innerHTML = weatherData.weather[0].main;
  document.getElementById("temp").innerHTML = weatherData.main.temp;
  document.getElementById("min-temp").innerHTML = weatherData.main.temp_min;
  document.getElementById("max-temp").innerHTML = weatherData.main.temp_max;  
  


  //change background
  
  let background = document.querySelector('main');
  let weatherType = weatherData.weather[0].main;


  if ( weatherType == "Clear"){
    background.classList.add("clear");    
  }else if( weatherType == "Snow"){
    background.classList.add("snow");
  }else if( weatherType == "Mist"){
    background.classList.add("mist");
  }else if( weatherType == "Rain"){
    background.classList.add("rain"); 
  }else if( weatherType == "Clouds"){
    background.classList.add("clouds");
  }
}

createMarker = () => { 
  var city = document.getElementById('city-input').value;
  getWeatherData(city)
  .then((city)=>{ 
        marker = new google.maps.Marker({
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: {
          lat: city.coord.lat, 
          lng: city.coord.lon
        },        
        map: map    
      });
    }).catch((error)=>{
    console.log(error);
    }) 
}

var input = document.getElementById("city-input");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {  
    
    createMarker()
    searchCity()
    document.getElementById('city-input').value = "";  
    
  };    
});

let currentTime = new Date();
console.log(currentTime);

var map;
var latlng;
function initMap() {  
  var mapCenter = {  
  lat: 35.095192,
  lng: 33.203430
  }
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 1,
    center: mapCenter,
    styles: mapStyle,  
    disableDefaultUI: true
  });
}
