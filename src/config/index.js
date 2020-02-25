import dotenv from 'dotenv';

dotenv.config();
const { env } = process;

export default {
  app: {
    name: env.npm_package_name,
  },
  env: env.NODE_ENV,
  port: env.PORT,
  host: env.HOST,
  firebase: {
    credentialsPath: env.FIREBASE_CREDENTIALS_PATH,
  },
};
