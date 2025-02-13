const jwt = require('jsonwebtoken');

const autenticar = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token || !token.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Acceso denegado' });
    }
    try {
      const tokenStripped = token.split(' ')[1]; 
      const verificado = jwt.verify(tokenStripped, process.env.JWT_SECRET);
      req.usuario = verificado;
      next();
    } catch (err) {
      res.status(400).json({ error: 'Token inválido' });
    }
  };
  

const autorizar = (roles) => (req, res, next) => {
  if (!roles.includes(req.usuario.rol)) {
    return res.status(403).json({ error: 'No tienes permiso para realizar esta acción' });
  }
  next();
};

module.exports = {
  autenticar,
  autorizar
};
