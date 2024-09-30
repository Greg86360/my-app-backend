const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  frequence: { type: String, default: false },
  etat: { type: Boolean, default: false }
});

module.exports = mongoose.model('Task', TaskSchema);
