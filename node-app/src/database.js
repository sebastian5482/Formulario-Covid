const mongoose = require('mongoose');
const dbURI = mongodb+srv://sebaso2411:2382570s@covid.sxxhiiz.mongodb.net/?retryWrites=true&w=majority&appName=Covid;

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
    .then(() => console.log('DB is connected'))
    .catch(err => console.error(err));
