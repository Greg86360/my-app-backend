const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Inscription de l'utilisateur
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'L\'utilisateur existe déjà' });
    }

    // Créer un nouvel utilisateur
    user = new User({ name, email, password });

    // Sauvegarder l'utilisateur dans la base de données
    await user.save();

    // Générer un token JWT
    const token = jwt.sign({ id: user._id }, 'jwtSecret', { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
});

// Connexion de l'utilisateur
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Identifiants invalides' });
    }

    // Comparer le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Identifiants invalides' });
    }

    // Générer un token JWT
    const token = jwt.sign({ id: user._id }, 'jwtSecret', { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
});

module.exports = router;
