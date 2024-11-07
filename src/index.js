const express = require('express');
const mongoose = require('mongoose');
const dishRoutes = require('./routes/dishRoutes');
const contestRoutes = require('./routes/contestRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = 'mongodb://root:ferdef@192.168.50.4:27017/?authSource=admin';

// Middleware
app.use(express.json());

// Routes
app.use('/api', dishRoutes);
app.use('/api', contestRoutes);

// MongoDB connection using Mongoose
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  
  // Start server after DB connection is established
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => console.log(err));
