export { submit };
import axios from 'axios';
const baseUrl = 'http://localhost:8081/';
const city = document.getElementById('city');
const date = document.getElementById('date');

const submit =  (event) => {
  event.preventDefault();
  const form = {
    city: city.value,
    date: date.value,
  };

  const getGeoNames =  getCity(`${baseUrl}getCity`, { city: form.city });
  console.log(getGeoNames);
    const time = getRemainigTime(date.value);
    const coordinates = {
      lng: getGeoNames.lng,
      lat: getGeoNames.lat,
      time: time,
    };
    const weather =  getWeather(`${baseUrl}getWeather`, coordinates);
    const image =   getImage(getGeoNames.name);
    console.log(error);
};

const getCity = async (url = '', city) => {
  const { data } = await axios.post(url, city);
  return data;
};
const getWeather = async (url, geoNames) => {
  const { data } = await axios.post(url, geoNames);
  return data;
};

const getRemainigTime =  (date) => {
  const today = new Date();
  const travelDate = new Date(date);
  const remainingTime = travelDate.getDate() - today.getDate();
    return remainingTime;
};
async function updateUi(weather){

}

async function getImage(url, name) {
    const {data} = await axios.post(`getImage`, name);
    return data;
}