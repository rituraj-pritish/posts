const mongoose = require('mongoose');
const keys = require('./keys.js')

try {
  mongoose.connect(
    keys.mongoUri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    console.log('db connected')
  );
} catch (err) {
  console.log(err);
}
