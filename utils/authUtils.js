const jwt = require('jsonwebtoken');

const generarToken = (usuario) => {
  return jwt.sign({ id: usuario._id, rol: usuario.rol }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });
};

module.exports = {
  generarToken
};
