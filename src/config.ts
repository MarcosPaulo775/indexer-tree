const mongoHost = process.env.MONGO_HOST;
const mongoDatabase = process.env.MONGO_DATABASE;
const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASS;
const mongoPort = process.env.MONGO_PORT;

export default {
  production: process?.env?.NODE_ENV === 'production',
  filesDirectory:
    process?.env?.NODE_ENV === 'production' ? 'files/' : '../files/',
  ignoreInitial: process?.env?.APP_IGNORE_INITIAL === 'TRUE',
  mongoCollection: process?.env?.APP_MONGO_COLLECTION ?? 'files',
  bull: { name: process?.env?.APP_BULL_QUEUE ?? 'fileIndexer' },
  redis: {
    host: process?.env?.REDIS_HOST,
    username: process?.env?.REDIS_USER,
    password: process?.env?.REDIS_PASS,
    port: Number(process?.env?.REDIS_PORT),
  },
  mongo: {
    uri: `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoDatabase}`,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      authSource: process?.env?.MONGO_AUTH_SOURCE ?? 'admin',
    },
  },
};
