let API_KEY = "a8e71c9932b20c4ceb0aed183e6a83bb";

getWeatherData = (city) => {
  const URL = "https://api.openweathermap.org/data/2.5/weather";
  const FULL_URL = `${URL}?q=${city}&appid=${API_KEY}&units=metric`;
  const weatherPromise = fetch(FULL_URL);

  return weatherPromise
      .then((response)=>{
        if(response.status === 404 || city === ""){
          document.getElementById("city-name").innerHTML = "There is no data about such city";
s        }
        return response.json();
      })
}

searchCity = () => {
  let city = document.getElementById('city-input').value;
  getWeatherData(city)
      .then((city)=>{
        showWeatherData(city);
        console.log(city)
      })
}

showWeatherData = (weatherData) => {
  document.getElementById("city-name").innerHTML = weatherData.name;
  document.getElementById("weather-type").innerHTML = weatherData.weather[0].main;
  document.getElementById("temp").innerHTML = weatherData.main.temp;
  document.getElementById("min-temp").innerHTML = weatherData.main.temp_min;
  document.getElementById("max-temp").innerHTML = weatherData.main.temp_max;

  //change backgrounds
  const background = document.querySelector('main');
  let weatherType = weatherData.weather[0].main;

  background.removeAttribute("class");
  if ( weatherType === "Clear"){
    background.classList.add("clear");
  }else if( weatherType === "Snow"){
    background.classList.add("snow");
  }else if( weatherType === "Mist"){
    background.classList.add("mist");
  }else if( weatherType === "Rain"){
    background.classList.add("rain");
  }else if( weatherType === "Clouds"){
    background.classList.add("clouds");
  }
}

createMarker = () => {
  let city = document.getElementById('city-input').value;
  getWeatherData(city)
  .then((city)=>{
        let marker = new google.maps.Marker({
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

let input = document.getElementById("city-input");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    createMarker();
    searchCity();
    input.value = "";
  };
});

let map;

function initMap() {
  let  mapCenter = {
  lat: 33.589886,
  lng: -7.603869
  }

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 1,
    center: mapCenter,
    styles: mapStyle,
    disableDefaultUI: true
  });
}
