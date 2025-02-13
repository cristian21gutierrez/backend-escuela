const express = require('express');
const router = express.Router();
const materiaController = require('../controllers/materiaController');
const { autenticar, autorizar } = require('../middleware/authMiddleware');

router.post('/materias', autenticar, autorizar(['admin']), materiaController.crearMateria);
router.get('/materias', autenticar, materiaController.obtenerMaterias);
router.get('/materias/:id', autenticar, materiaController.obtenerMateriaPorId);
router.put('/materias/:id', autenticar, autorizar(['admin']), materiaController.actualizarMateria);
router.delete('/materias/:id', autenticar, autorizar(['admin']), materiaController.eliminarMateria);
router.post('/materias/:materiaId/inscribir/:usuarioId', autenticar, materiaController.inscribirUsuarioEnMateria);
router.put('/materias/:materiaId/calificar/:usuarioId', autenticar, materiaController.asignarCalificacion);

module.exports = router;