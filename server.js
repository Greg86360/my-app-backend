const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Importer la connexion MongoDB

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/tasks', require('./routes/task'));  // Utiliser les routes pour les tâches

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
