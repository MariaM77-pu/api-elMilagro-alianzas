// app.js
require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const db      = require('./db'); // tu archivo de conexión mysql2

const alianzasRoutes = require('./routes/alianzas.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.disable('x-powered-by');
app.set('trust proxy', 1); // recomendado en Railway
app.use(cors({ origin: '*' }));
app.use(express.json());

// Ping simple
app.get('/ping', (req, res) => {
  console.log('✔️ Ping recibido');
  res.send('pong');
});

// Healthcheck con DB
app.get('/health', (req, res) => {
  db.query('SELECT 1 AS ok', (err, rows) => {
    if (err) {
      return res.status(500).json({ status: 'error', db: false, message: err.message });
    }
    res.json({ status: 'ok', db: rows && rows[0] && rows[0].ok === 1 });
  });
});

// Rutas principales
app.use('/api/alianzas', alianzasRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Arranque + ping a DB
app.listen(PORT, () => {
  console.log(`🚀 API Alianzas corriendo en puerto ${PORT}`);
  db.query('SELECT 1', (err) => {
    if (err) console.error('❌ Error conectando a MySQL:', err.message);
    else console.log('✅ Conectado a MySQL (Railway)');
  });
});
