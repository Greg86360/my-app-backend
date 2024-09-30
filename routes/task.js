const express = require('express');
const Task = require('../models/Task'); // Assure-toi d'avoir un modèle Task défini
const router = express.Router();

// Route GET pour obtenir toutes les tâches
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route POST pour créer une nouvelle tâche
router.post('/', async (req, res) => {
  const newTask = new Task(req.body);
  try {
    await newTask.save();
    res.json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route PUT pour mettre à jour une tâche existante
router.put('/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route DELETE pour supprimer une tâche
router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route PATCH pour mettre à jour partiellement une tâche (ex. état)
router.patch('/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
