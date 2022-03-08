const mongoHost = process.env.MONGO_HOST;
const mongoDatabase = process.env.MONGO_DATABASE ?? 'indexer-tree';
const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASS;
const mongoPort = process.env.MONGO_PORT;

const isDocker = process.env.APP_DOCKER === 'true';
const dockerFilesDirectory =
  process?.env?.NODE_ENV === 'production' ? 'files/' : '../files/';
const nodeFilesDirectory = process?.env?.INDEXER_FILES ?? './';

export default {
  production: process?.env?.NODE_ENV === 'production',
  isDocker,
  filesDirectory: isDocker ? dockerFilesDirectory : nodeFilesDirectory,
  mongoCollection: process?.env?.MONGO_COLLECTION ?? 'files',
  chokidar: {
    usePolling: process?.env?.LEGACY_MODE
      ? process?.env?.LEGACY_MODE === 'true'
      : isDocker
      ? true
      : false,
    interval: process?.env?.INTERVAL ? Number(process?.env?.INTERVAL) : 100,
    binaryInterval: process?.env?.BINARY_INTERVAL
      ? Number(process?.env?.BINARY_INTERVAL)
      : 300,
  },
  bull: {
    queue: process?.env?.BULL_QUEUE ?? 'fileIndexer',
    max: process?.env?.BULL_MAX ? Number(process?.env?.BULL_MAX) : 10,
    board: process?.env?.BULL_BOARD
      ? process?.env?.BULL_BOARD === 'true'
      : false,
  },
  redis: {
    host: process?.env?.REDIS_HOST,
    password: process?.env?.REDIS_PASS,
    port: Number(process?.env?.REDIS_PORT),
  },
  mongo: {
    host: mongoHost,
    port: mongoPort,
    dataBase: mongoDatabase,
    user: mongoUser,
    password: mongoPassword,
    uri: `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoDatabase}`,
    options: {
      authSource: process?.env?.MONGO_AUTH_SOURCE ?? 'admin',
    },
  },
  s3: {
    apiVersion: '2006-03-01',
    region: process.env.S3_REGION ?? '',
    bucket: process.env.S3_BUCKET ?? '',
    accessKeyId: process.env.S3_ACCESS_KEY_ID ?? '',
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? '',
    prefixKey: process.env.S3_PREFIX_KEY ?? '',
  },
};
