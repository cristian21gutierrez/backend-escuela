const mongoose = require('mongoose');

const MateriaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  profesor: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  estudiantes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }]
});

module.exports = mongoose.model('Materia', MateriaSchema);