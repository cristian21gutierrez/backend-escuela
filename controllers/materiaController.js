const Materia = require('../models/Materia');
const Usuario = require('../models/Usuario');

const crearMateria = async (req, res) => {
  try {
    const materia = new Materia(req.body);
    await materia.save();
    res.status(201).json(materia);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const obtenerMaterias = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const materias = await Materia.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('profesor estudiantes');
    res.status(200).json(materias);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const obtenerMateriaPorId = async (req, res) => {
  try {
    const materia = await Materia.findById(req.params.id).populate('profesor estudiantes');
    if (!materia) return res.status(404).json({ error: 'Materia no encontrada' });
    res.status(200).json(materia);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const actualizarMateria = async (req, res) => {
  try {
    const materia = await Materia.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!materia) return res.status(404).json({ error: 'Materia no encontrada' });
    res.status(200).json(materia);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const eliminarMateria = async (req, res) => {
  try {
    const materia = await Materia.findByIdAndDelete(req.params.id);
    if (!materia) return res.status(404).json({ error: 'Materia no encontrada' });
    res.status(200).json({ mensaje: 'Materia eliminada correctamente' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const inscribirUsuarioEnMateria = async (req, res) => {
  try {
    const { materiaId, usuarioId } = req.params;

    const materia = await Materia.findById(materiaId);
    if (!materia) return res.status(404).json({ error: 'Materia no encontrada' });

    const usuario = await Usuario.findById(usuarioId);
    if (!usuario || usuario.rol !== 'estudiante') {
      return res.status(404).json({ error: 'Usuario no válido o no es un estudiante' });
    }

    if (materia.estudiantes.includes(usuarioId)) {
      return res.status(400).json({ error: 'El usuario ya está inscrito en esta materia' });
    }

    materia.estudiantes.push(usuarioId);
    await materia.save();

    usuario.materiasInscritas.push(materiaId);
    await usuario.save();

    res.status(200).json({ mensaje: 'Usuario inscrito en la materia correctamente', materia });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const asignarCalificacion = async (req, res) => {
  try {
    const { materiaId, usuarioId } = req.params;
    const { calificacion } = req.body;

    const materia = await Materia.findById(materiaId);
    if (!materia) return res.status(404).json({ error: 'Materia no encontrada' });

    const estudiante = await Usuario.findById(usuarioId);
    if (!estudiante || estudiante.rol !== 'estudiante') {
      return res.status(404).json({ error: 'Usuario no válido o no es un estudiante' });
    }

    if (!materia.estudiantes.includes(usuarioId)) {
      return res.status(400).json({ error: 'El estudiante no está inscrito en esta materia' });
    }

    const usuarioActual = req.usuario;
    if (usuarioActual.rol === 'profesor' && materia.profesor.toString() !== usuarioActual.id) {
      return res.status(403).json({ error: 'No tienes permiso para asignar calificaciones en esta materia' });
    }

    let calificacionExistente = estudiante.calificaciones.find(
      (cal) => cal.materia.toString() === materiaId
    );

    if (calificacionExistente) {
      calificacionExistente.calificacion = calificacion;
    } else {
      estudiante.calificaciones.push({ materia: materiaId, calificacion });
    }

    await estudiante.save();

    res.status(200).json({ mensaje: 'Calificación asignada correctamente', estudiante });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  crearMateria,
  obtenerMaterias,
  obtenerMateriaPorId,
  actualizarMateria,
  eliminarMateria,
  inscribirUsuarioEnMateria,
  asignarCalificacion
};
