const axios = require('axios');
const baseUrl = 'http://secure.geonames.org/searchJSON?q=';
const { validateCity } = require('./validateCity');

async function getGeoLocation(city, key) {
  const { data } = await axios.get(
    `${baseUrl}${city.city}&maxRows=1&username=${key}`
  );
  try{
    if(!validateCity(data.geonames)){
        return error = {
            error: true,
            message: 'please enter a valid city name'
        }
    } else {
        
        const res = {
            name:data.geonames[0].name,
            lat: data.geonames[0].lat,
            lng: data.geonames[0].lng
        } 
        return res;
    }
  }catch(error){
    return error
  }

};
module.exports = {
  getGeoLocation,
};
