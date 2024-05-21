const mongoose = require('mongoose');

mongoose.connect('mmongodb+srv://sebaso2411:2382570s@covid.sxxhiiz.mongodb.net/?retryWrites=true&w=majority&appName=Covi/Covid-19', {
   
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err))
