const express = require('express');
const router = express.Router();
const creditosController = require('../Controllers/creditosController');

// Rota para calcular créditos de energia e enviar email
router.post('/calcular', creditosController.calcularCreditos);

// Rota para obter os créditos de um utilizador específico
router.get('/:userId', creditosController.getCreditos);

module.exports = router;