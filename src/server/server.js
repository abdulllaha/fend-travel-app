const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const { getGeoLocation } = require('./geoNames');
const { getWeatherbit } = require('./weatherBit');
const { getImage } = require('./pixabay');

//access .env api keys
dotenv.config();

const app = express();
app.use(cors());
const port = 8081;

const GEO_API_KEY = process.env.GEO_API_KEY;
const WEATHERBIT_API_KEY = process.env.WHEATERBIT_API_KEY;
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;

//render built index file in dist
app.use(express.static('dist'));
app.use(express.json());
app.get('/', function (req, res) {
  res.sendFile('dist/index.html');
});

// designates what port the app will listen to for incoming requests
app.get('/', function (req, res) {
  res.render('index.html');
});

app.listen(8081, function () {
  console.log(`app listening on port: ${port}`);
});

//retrieve city name
app.post('/getCity', async (req, res) => {
  const city = req.body;
  const coordinates = await getGeoLocation(city, GEO_API_KEY);
  try {
    return res.send(coordinates);
  } catch (error) {
    return res.send(error);
  }
});

//retrieve weather  
app.post('/getWeather', async (req, res) => {
  const coordinates = req.body;
  const weather = await getWeatherbit(coordinates, WEATHERBIT_API_KEY);
  try {
    return res.send(weather);
  } catch (error) {
    return res.send(error);
  }
});

//retrieve images
app.post('/getImage', async (req, res) => {
  const name = req.body.name;
  const image = await getImage(name, PIXABAY_API_KEY);
  try {
    return res.send(image.image);
  } catch (error) {
    return res.send(error);
  }
});
