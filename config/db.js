const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://gregeatypique:Wr-8x27gzpCqR_c@todolist.9zfsq.mongodb.net/taches', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Quitte le processus en cas d'erreur
  }
};

module.exports = connectDB;
