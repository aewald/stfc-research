const mongoose = require('mongoose');

require('ae-auth').userSchema(mongoose);
require('./models/officers');
// require('./models/researchTrees');
// require('./models/ships');

exports.connect = () => {
  mongoose.connect(
    process.env.DB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true },
    () => {
      console.log('Connected to DB');
    }
  );
};
