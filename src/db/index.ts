import { ServerApiVersion } from 'mongodb';
import { connect } from 'mongoose';

import { configDotenv } from 'dotenv';
import { isDevMode } from '../utils';

export * from './MembersSchema';

configDotenv();

export const runDB = async () => {
  connect(process.env.MONGODB_TOKEN, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
    dbName: 'Zook' + (isDevMode ? 'Dev' : ''),
  })
    .then(() => console.log('Connected to MongoDB server'))
    .catch((err) => console.log(err));
};
