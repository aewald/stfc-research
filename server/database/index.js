const mongoose = require('mongoose');

require('./models/officers');
// require('./models/researchTrees');
// require('./models/ships');

exports.connect = () => {
  mongoose.connect(
    process.env.DB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
    () => {
      console.log('Connected to DB');
    }
  );
};
