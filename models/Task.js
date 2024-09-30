const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  frequence: { type: String, default: false },
  etat: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }  // Associer une tâche à un utilisateur
});

module.exports = mongoose.model('Task', TaskSchema);
