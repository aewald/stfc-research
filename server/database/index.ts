import mongoose from 'mongoose';
import { userSchema } from 'ae-auth';
import './models/officers';
// import './models/researchTrees';
// import './models/ships';

userSchema(mongoose);

export const connect = () => {
  mongoose.connect(
    process.env.DB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true },
    () => {
      console.log('Connected to DB');
    }
  );
};
