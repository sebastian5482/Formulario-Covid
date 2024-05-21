const mongoose = require('mongoose');

const dbURI = 'mongodb+srv://sebaso2411:2382570s@covid.sxxhiiz.mongodb.net/Covid-19?retryWrites=true&w=majority&appName=Covi';

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
    .then(() => console.log('DB is connected'))
    .catch(err => console.error('Database connection error:', err));
