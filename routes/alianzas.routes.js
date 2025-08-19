const express = require('express');
const router = express.Router();
const alianzasController = require('../controllers/alianzas.controller');

router.get('/verificar-alianza/:institucion', alianzasController.consultarAlianzas);

router.post('/registrar-alianza', alianzasController.registrarAlianza);

module.exports = router;