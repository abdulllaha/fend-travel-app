const axios = require('axios');
const baseUrl = 'http://secure.geonames.org/searchJSON?q=';

const getGeoLocation = async (city, key) => {
  const { data } = await axios.get(
    `${baseUrl}${city.city}&maxRows=1&username=${key}`
  );
  try{
    if(!data.geonames.length){
        return error = {
            message: 'please enter a valid city name',
            error: true
        }
    }
    const res = {
        name:data.geonames[0].name,
        lat: data.geonames[0].lat,
        lng: data.geonames[0].lng
      } 
      return res;
  }catch(error){
    return error
  }

};
module.exports = {
  getGeoLocation,
};
