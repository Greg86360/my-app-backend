const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  console.log(token);
  // Vérifier si un token est fourni
  if (!token) {
    return res.status(401).json({ message: 'Accès refusé, token manquant' });
  }

  try {
    // Vérifier et décoder le token
    const decoded = jwt.verify(token, 'jwtSecret');
    req.user = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token invalide' });
  }
};

module.exports = auth;
