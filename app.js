const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const locationRoutes = require('./routes/location'); // Este é o arquivo de rotas que vamos criar

dotenv.config();
const app = express();

// Middleware para processar JSON
app.use(express.json());

// Conectar ao MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

// Usar as rotas de localização
app.use('/api', locationRoutes);

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


const Routine = require('./models/routine'); // Importar o modelo Routine

// Função para verificar condições climáticas e enviar alertas
const checkWeatherConditions = async () => {
  try {
    const allRoutines = await Routine.find();

    for (const userRoutine of allRoutines) {
      for (const routine of userRoutine.routines) {
        // Obter coordenadas do local
        const geoResponse = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(routine.location)}&key=${GEO_API_KEY}`);
        const { lat, lng } = geoResponse.data.results[0].geometry;

        // Obter as condições climáticas atuais
        const weatherResponse = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`);
        const { temperature, weathercode } = weatherResponse.data.current_weather;

        // Mapear o código do clima para uma descrição
        const weatherDescription = getWeatherDescription(weathercode);

        // Verificar se a condição climática é adversa (exemplo: temperatura baixa ou chuva forte)
        if (temperature < 0 || weathercode >= 61) { // Exemplo de condição adversa
          const alertMessage = `Alerta: Condição climática adversa em ${routine.location}. Temperatura: ${temperature}°C, ${weatherDescription}. Isso pode afetar sua rotina às ${routine.time}.`;

          // Enviar notificação ao usuário via WebSocket
          sendNotification({ message: alertMessage }, userRoutine.userId);
        }
      }
    }
  } catch (error) {
    console.error("Error checking weather conditions", error.message);
  }
};

// Verificar as condições climáticas a cada 30 minutos
setInterval(checkWeatherConditions, 30 * 60 * 1000);
