const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Récupérer le token après 'Bearer' 
   
    console.log('Token reçu:', token); // Log du token

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
