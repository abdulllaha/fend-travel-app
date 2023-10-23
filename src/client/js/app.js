export { submit };
import axios from 'axios';
import { getRemainigTime } from './getRemainingTime';

const baseUrl = 'http://localhost:8081/';
const city = document.getElementById('city');
const date = document.getElementById('date');
const cityInput = document.querySelector('#city_error');
const dateInput = document.querySelector('#date_error');
const image = document.createElement('img');
const imageContainer = document.querySelector('.image');
const forcastContainer = document.querySelector('.forcast-container');

let time;
let coordinates;
let weatherInfo;
function submit(event) {
  event.preventDefault();
  if(!validateInput()){
    return;
  }
  const form = {
    city: city.value,
    date: date.value,
  };
  getCity(`${baseUrl}getCity`, { city: form.city })
    .then((getGeoNames) => {
        handleError(getGeoNames);
      time = getRemainigTime(date.value);
      coordinates = {
        lng: getGeoNames.lng,
        lat: getGeoNames.lat,
        time: time,
      };
      getWeather(`${baseUrl}getWeather`, coordinates)
        .then((weather) => {
          getImage(`${baseUrl}getImage`, { name: form.city })
            .then((image) => {
              weatherInfo = {
                name: getGeoNames.name,
                time: time,
                weather: weather.weather,
                temp: weather?.temp,
                max_temp: weather?.max_temp,
                min_temp: weather?.min_temp,
                isRange: weather.isRange,
                image: image,
              };
              updateUi(weatherInfo);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
}

async function getCity(url = '', city) {
  const { data } = await axios.post(url, city);
  try {
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getWeather(url, geoNames) {
  const { data } = await axios.post(url, geoNames);
  try {
    return data;
  } catch (error) {
    console.log(error);
  }
}



async function updateUi(weather) {
  document.getElementById('days').innerHTML = `your trip is in ${weather.time} days`;
  document.querySelector('.city').innerHTML = ` to ${city.value}`;
  document.querySelector('.weather').innerHTML = `the weather is ${weather.weather}`;
  document.querySelector('.temp').innerHTML = !weather.isRange
    ? `tempreture is ${weather.temp}&degC`
    : `the forcast in ${date.value} for ${weather.name} is expected to be at minmumm tempreture ${weather.min_temp}&degC and maximumm tempreature ${weather.max_temp}&degC`;
    image.src = weather.image;
    image.alt = `this is a description for ${weather.name}`
    imageContainer.appendChild(image);
}

async function getImage(url, name) {
  const { data } = await axios.post(url, name);
  return data;
}

function validateInput() {
    dateInput.style.display = 'none';
    cityInput.style.display = 'none';
    if(!city.value){
        cityInput.style.display = 'block';
        cityInput.style.color = 'red';
        cityInput.innerHTML = 'please enter a city name';
        return false;
    } if(!date.value){
        dateInput.style.display = 'block';
        dateInput.style.color = 'red';
        dateInput.innerHTML = 'please select a date';
        return false;
    }
    if(getRemainigTime(date.value) < 0){
        dateInput.style.display = 'block';
        dateInput.innerHTML = 'please select a valid date';
        dateInput.style.color = 'red';
        return false;
    }
    return true;
}
function handleError(data) {
    const span = document.createElement('span');
    if(data.error){
        span.style.display = 'none';
        span.innerHTML = data.message;
        span.style.display = 'block';
        span.style.color = 'red';
        forcastContainer.appendChild(span);
        return false;
    }else {
        span.style.display = 'none';
        return true;
    }
}
