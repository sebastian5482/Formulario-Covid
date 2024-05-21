const mongoose = require('mongoose');
require('dotenv').config();

const dbURI = process.env.MONGODB_URI;

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
    .then(() => console.log('DB is connected'))
    .catch(err => console.error('Database connection error:', err));
