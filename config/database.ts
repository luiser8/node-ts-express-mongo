import mongoose  from 'mongoose';
import dotenv from 'dotenv';
import IEnv from '../interfaces/IEnv';

  const getConfig = (): IEnv => {
    return {
      NODE_ENV: process.env.MONGO_URI !== undefined ? process.env.MONGO_URI : "",
      PORT: process.env.PORT ? Number(process.env.PORT) : 0,
      MONGO_URI: process.env.MONGO_URI !== undefined ? process.env.MONGO_URI : ""
    };
  };

dotenv.config();
    const database = mongoose.connect(getConfig().NODE_ENV)
        .then()
        .catch(err => console.error(err));

export default database;
