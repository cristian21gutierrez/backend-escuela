const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  rol: { type: String, enum: ['admin', 'profesor', 'estudiante'], default: 'estudiante' },
  materiasInscritas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Materia' }],
  calificaciones: [{
    materia: { type: mongoose.Schema.Types.ObjectId, ref: 'Materia' },
    calificacion: { type: Number, min: 0, max: 10 }
  }]
});

module.exports = mongoose.model('Usuario', UsuarioSchema);