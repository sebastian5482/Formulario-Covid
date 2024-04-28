const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Covid-19', {
   
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));