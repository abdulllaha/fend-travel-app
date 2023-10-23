const axios = require('axios');
const currentUrl = 'https://api.weatherbit.io/v2.0/current?lat=';
const forcastUrl = 'https://api.weatherbit.io/v2.0/forecast/daily?lat=';
const getWeatherbit = async (coordinates, key) => {
  if (coordinates.time > 0 && coordinates.time < 7) {
    return getCurrent(coordinates, key);
  } else {
    return getForcast(coordinates, key);
  }
};
const getCurrent = async (coordinates, key) => {
  const { data } = await axios.get(
    `${currentUrl}${coordinates.lat}&lon=${coordinates.lng}&unites=M&key=${key}`
  );
  try {
      const res = {
          weather: data.data[0].weather.description,
          temp: data.data[0].temp,
          isRange: false
        };
        return res;
    }
    catch(error) {
        console.log(error);
    }
};
const getForcast = async (coordinates, key) => {

    const { data } = await axios.get(
        `${forcastUrl}${coordinates.lat}&lon=${coordinates.lng}&unites=M&days=${coordinates.time}&key=${key}`
    );
    try {
        const last = data.data.length -1;
        const res = {
            weather: data.data[last].weather.description,
            max_temp: data.data[last].max_temp,
            min_temp: data.data[last].min_temp,
            isRange: true
        };
        return res;
    }
    catch(error){
        console.log(error)
    }
  };
module.exports = {
  getWeatherbit,
};
