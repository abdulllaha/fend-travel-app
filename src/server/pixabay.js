const axios = require('axios');
const baseUrl = 'https://pixabay.com/api/?key=';

//retrieve image by names
const getImage = async (name, key) => {
  const { data } = await axios.get(
    `${baseUrl}${key}&q=${name}&image_type=photo`
  );
  const image = (await data.hits[0])
    ? await data.hits[0].webformatURL
    : 'https://source.unsplash.com/random/640x480?city,morning,night?sig=1';
  if (image) {
    return { image };
  }
};

module.exports = {
  getImage,
};
