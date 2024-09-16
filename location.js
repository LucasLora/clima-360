const express = require('express');
const axios = require('axios');
const Location = require('../models/location');
const uuidv4 = require('uuid').v4;
const WebSocket = require('ws');
const router = express.Router();
const wss = new WebSocket.Server({ port: 8080 });
require('dotenv').config();

// API de geolocalização para obter as coordenadas, usuario passa a cidade e convertemos para cordenada
const GEO_API_KEY = process.env.GEO_API_KEY;
const HERE_API_KEY = process.env.HERE_API_KEY;
const clients = {};

// Rota para adicionar localização e salvar no MongoDB
router.post('/add-location', async (req, res) => {
  const { city } = req.body;

  if (!city) {
    return res.status(400).json({ message: "City is required" });
  }

  try {
    // Fazer requisição para OpenCage para obter as coordenadas
    const geoResponse = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city)}&key=${GEO_API_KEY}`);
    const { lat, lng } = geoResponse.data.results[0].geometry;

    // Fazer requisição à API Open-Meteo usando as coordenadas
    const weatherResponse = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`);
    const { temperature, weathercode } = weatherResponse.data.current_weather;

    // Mapear o código do clima
    const weatherDescription = getWeatherDescription(weathercode);

    // Criar um novo documento Location
    const location = new Location({
      name: city,
      temperature,
      description: weatherDescription
    });

    // Salvar no MongoDB
    await location.save();

    // Responder ao usuário com os dados salvos
    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving data", error: error.message });
  }
});

//rota para pesquisar a temperatura das cidades proximas
router.post('/get-locations-by-temp', async (req, res) => {
  const { city, temp } = req.body;

  if (!city) {
    return res.status(400).json({ message: "City is required" });
  }
  if (!temp) {
    return res.status(400).json({ message: "Temp is required" });
  }

  try {
    // Fazer requisição para OpenCage para obter as coordenadas
    const geoResponse = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city)}&key=${GEO_API_KEY}`);
    const { lat, lng } = geoResponse.data.results[0].geometry;

    const hereApiResponse = await axios.get(`https://revgeocode.search.hereapi.com/v1/revgeocode?types=city&limit=100&apiKey=${HERE_API_KEY}&in=circle:${lat},${lng};r=50000`);
    const responseItems = hereApiResponse.data.items;
    let allLats = "";
    let allLngs = "";
    responseItems.forEach(item => {
      if (item.position.lat == -29.125 || item.position.lng == -51.125) {
        console.log(item)
      }
      allLats += `${item.position.lat},`;
      allLngs += `${item.position.lng},`;
    });

    // Fazer requisição à API Open-Meteo usando as coordenadas
    const weatherResponse = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${allLats}&longitude=${allLngs}&current_weather=true`);
    const wResponseData = weatherResponse.data;

    for (let index = 0; index < wResponseData.length; index++) {
      const elementAddress = responseItems[index].address;
      const wResponseDataAddress = wResponseData[index];
      wResponseData[index] = { ...wResponseData[index], address: responseItems[index].address }
    }

    let response = wResponseData.filter(weat => Math.trunc(weat.current_weather.temperature) == temp);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving data", error: error.message });
  }
});

//rota para teste da notificacao
router.post('/test-notification', (req, res) => {
  const { message, user } = req.body;
  sendNotification({ message}, user);
  res.status(200).json(response);
});

// Converter o código de clima em uma descrição mais amigável
function getWeatherDescription(weatherCode) {
  const weatherDescriptions = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Slight snow",
    73: "Moderate snow",
    75: "Heavy snow",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail"
  };
  return weatherDescriptions[weatherCode] || "Unknown weather condition";
}

wss.on('connection', ws => {
  const userId = uuidv4();
  clients[userId] = ws;
  console.log(`Connected ${userId}`);

  ws.on('close', () => {
    delete clients[userId];
    console.log('disconected: %s', userId);
  });

});

function sendNotification(body, user = "") {
  console.log(body, user);
  if (!user) {
    for (const userId in clients) {
      const client = clients[userId];
      client.send(JSON.stringify({ type: 'notification', message: body.message }));
    }
  } else {
    try {
      const client = clients[user];
      client.send(JSON.stringify({ type: 'notification', message: body.message }));
    } catch (error) {
      console.log(error);
    }
  }
  // Enviar uma notificação
}

module.exports = router;


const Routine = require('../models/routine'); // Importar o modelo Routine

// Rota para cadastrar rotina diária
router.post('/add-routine', async (req, res) => {
  const { userId, routines } = req.body;

  if (!userId || !routines || routines.length === 0) {
    return res.status(400).json({ message: "User ID and routines are required" });
  }

  try {
    // Verificar se já existe uma rotina cadastrada para o usuário
    let userRoutine = await Routine.findOne({ userId });

    if (userRoutine) {
      // Atualizar a rotina existente
      userRoutine.routines = routines;
      await userRoutine.save();
    } else {
      // Criar uma nova rotina para o usuário
      const newRoutine = new Routine({
        userId,
        routines,
      });
      await newRoutine.save();
    }

    res.status(200).json({ message: "Routine saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving routine", error: error.message });
  }
});
