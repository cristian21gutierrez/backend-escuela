const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { autenticar, autorizar } = require('../middleware/authMiddleware');

router.post('/usuarios', usuarioController.crearUsuario);
router.get('/usuarios', autenticar, autorizar(['admin']), usuarioController.obtenerUsuarios);
router.get('/usuarios/:id', autenticar, usuarioController.obtenerUsuarioPorId);
router.put('/usuarios/:id', autenticar, usuarioController.actualizarUsuario);
router.delete('/usuarios/:id', autenticar, autorizar(['admin']), usuarioController.eliminarUsuario);

module.exports = router;