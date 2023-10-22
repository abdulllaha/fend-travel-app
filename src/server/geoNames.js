const axios = require('axios');
const baseUrl = 'http://secure.geonames.org/searchJSON?q=';

const getGeoLocation = async (city, key) => {
  const { data } = await axios.get(
    `${baseUrl}${city}&maxRows=1&username=${key}`
  );
  console.log(data);
  const res = {
    name:data.geonames[0].name,
    lat: data.geonames[0].lat,
    lng: data.geonames[0].lng
  }
  return res;
};
module.exports = {
  getGeoLocation,
};
