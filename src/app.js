const express = require('express');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const connectDB = require('./config/database');
const swaggerSpecs = require('./config/swagger');
const corsMiddleware = require('./middleware/corsMiddleware');
const loggerMiddleware = require('./middleware/logger');
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);

app.get('/', (req, res) => {
  res.json({ 
    message: 'API Segura Funcionando',
    version: '1.0.0',
    documentation: '/api-docs'
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// 👇 SOLO EXPORTA, NO ESCUCHES
module.exports = app;