export { submit };
import axios from 'axios';
import { getRemainigTime } from './getRemainingTime';

//global variable
const baseUrl = 'http://localhost:8081/';
const city = document.getElementById('city');
const date = document.getElementById('date');
const cityError = document.querySelector('#city_error');
const dateError = document.querySelector('#date_error');
const image = document.createElement('img');
const imageContainer = document.querySelector('.image');
const forcastContainer = document.querySelector('#forcast');
const days = document.getElementById('days');
const cityOutput = document.querySelector('#cityOutput');
const weatherOutput = document.querySelector('#weather');
const temp = document.querySelector('#temp');
const span = document.createElement('span');

let time;
let coordinates;
let weatherInfo;

// submit function
function submit(event) {
  event.preventDefault();
  if(!validateInput()){
    return;
  }
  const form = {
    city: city.value,
    date: date.value,
  };

  //retrieve city info and use it rto retrieve weather info with image 
  getCity(`${baseUrl}getCity`, { city: form.city })
    .then((getGeoNames) => {
        if(getGeoNames.error){
        handleError(getGeoNames);
        clear()
        return;
        } else 
        span.style.display = 'none';
        //calculate remaining time
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

// get city info
async function getCity(url = '', city) {
  const { data } = await axios.post(url, city);
  try {
    return data;
  } catch (error) {
    console.log(error);
  }
}

// get weather info by coordinates
async function getWeather(url, geoNames) {
  const { data } = await axios.post(url, geoNames);
  try {
    return data;
  } catch (error) {
    console.log(error);
  }
}

//update ui
async function updateUi(weather) {
  days.innerHTML = `your trip is in ${weather.time} days`;
  cityOutput.innerHTML = ` to ${city.value}`;
  weatherOutput.innerHTML = `the weather is ${weather.weather}`;
  temp.innerHTML = !weather.isRange
    ? `tempreture is ${weather.temp}&degC`
    : `the forcast in ${date.value} for ${weather.name} is expected to be at minmumm tempreture ${weather.min_temp}&degC and maximumm tempreature ${weather.max_temp}&degC`;

    image.src = weather.image;
    image.alt = `this is a description for ${weather.name}`
    imageContainer.appendChild(image);
    forcastContainer.classList.add('forcast-container');
}

//retrieve image by name
async function getImage(url, name) {
  const { data } = await axios.post(url, name);
  try {
      return data;
  }catch(error) {
    console.log(error);
  }
}

//validate city and date input
function validateInput() {
    dateError.style.display = 'none';
    cityError.style.display = 'none';
    if(!city.value){
        cityError.style.display = 'block';
        cityError.style.color = 'red';
        cityError.innerHTML = 'please enter a city name';
        return false;
    } if(!date.value){
        dateError.style.display = 'block';
        dateError.style.color = 'red';
        dateError.innerHTML = 'please select a date';
        return false;
    }
    if(getRemainigTime(date.value) < 0){
        dateError.style.display = 'block';
        dateError.innerHTML = 'please select a valid date';
        dateError.style.color = 'red';
        return false;
    }
    return true;
}

//handle backend error
function handleError(data) {
        span.style.display = 'none';
        span.innerHTML = data.message;
        span.style.display = 'block';
        span.style.color = 'red';
        forcastContainer.appendChild(span);
}

//clear data when there is an error
function clear() {
    days.innerHTML = '';
    cityOutput.innerHTML = '';
    weatherOutput.innerHTML = '';
    temp.innerHTML = '';
    imageContainer.removeChild(image);
    forcastContainer.classList.remove('forcast-container');
}