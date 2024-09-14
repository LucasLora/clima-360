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
