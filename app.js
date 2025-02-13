const express = require('express');
const {connected} = require('./config/connect');
const usuarioRoutes = require('./routes/usuarioRoutes');
const materiaRoutes = require('./routes/materiaRoutes');
require('dotenv').config();
const cors = require('cors');

const app = express();

app.use(cors());

connected();
// Middleware
app.use(express.json());

// Rutas
app.use('/api', usuarioRoutes);
app.use('/api', materiaRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));