const mongoose = require('mongoose')

mongoose.connect(process.env.MongodbUrl).then(() => {
    console.log('Connected to mongodb...');
})

