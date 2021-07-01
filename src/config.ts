const mongoHost = process.env.MONGO_HOST;
const mongoDatabase = process.env.MONGO_DATABASE;
const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASS;
const mongoPort = process.env.MONGO_PORT;

export default {
  production: process?.env?.APP_ENV === 'production',
  redis: {
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASS,
    port: Number(process.env.REDIS_PORT),
  },
  mongo: {
    uri: `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoDatabase}`,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      authSource: 'admin',
    },
  },
};
