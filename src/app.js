import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import { fatalError, logger } from './utils';
import { errorHandler } from './api/middlewares';
import routes from './api';

import config from './config';

async function startServer() {
  const { port } = config;

  const app = express();

  app.use(bodyParser.json());
  app.use(helmet());
  app.use(morgan('combined', { stream: logger.stream }));
  app.use(routes);
  app.use(errorHandler);

  app.listen(port, err => {
    if (err) {
      logger.error(err);
      process.exit(1);
    }
    logger.info(`App listening on port ${port}`);
  });

  process.on('uncaughtException', fatalError);
  process.on('unhandledRejection', fatalError);
}

startServer();
