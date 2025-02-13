const Usuario = require('../models/Usuario');
const { generarToken } = require('../utils/authUtils');

const crearUsuario = async (req, res) => {
  try {
    const usuario = new Usuario(req.body);
    await usuario.save();
    const token = generarToken(usuario);
    res.status(201).json({ usuario, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.status(200).json(usuario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const actualizarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.status(200).json(usuario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const eliminarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.status(200).json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario
};
