import 'dotenv/config';
import express from 'express';

import DI from "./DI";
import config from "./config";
import Logger from "./providers/Logger";

function bootstrap() {
  DI.logger = new Logger;

  const app = express();
  app.listen(config.PORT, () => {
    DI.logger.log('info', `The server is listening on http://localhost:${config.PORT}`);
  });
}

bootstrap();
