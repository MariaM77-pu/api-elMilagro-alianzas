// app.js
const express = require('express');
const cors    = require('cors');
require('dotenv').config();

const alianzasRoutes = require('./routes/alianzas.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/ping', (req, res) => {
  console.log('✔️  Ping recibido');
  res.send('pong');
});
// monta el router bajo /api/alianzas
app.use('/api/alianzas', alianzasRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 API Alianzas corriendo en puerto ${PORT}`);
});
