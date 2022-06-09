import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import bodyParser from 'body-parser';

import DI from "./DI";
import config from "./config";
import Logger from "./providers/Logger";
import BadRequest from "./exceptions/BadRequest";
import HTTPError from "./exceptions/HTTPError";
import UserService from "./providers/UserService";
import JwtService from "./providers/JwtService";
import AuthController from "./modules/auth/AuthController";
import ILoginPayload from "./interfaces/ILoginPayload";
import IRegisterPayload from "./interfaces/IRegisterPayload";
import { registerSchema, loginSchema } from './modules/auth/schema';
import JwtStrategy from './providers/JwtStrategy';

async function bootstrap() {
  DI.logger = new Logger;
  DI.userService = new UserService;
  DI.jwtService = new JwtService;

  await mongoose.connect(config.DATABASE_URL);
  DI.logger.log('info', '> Connected to the database.');

  passport.use((new JwtStrategy(DI.userService)).createStrategy());

  const app = express();
  app.use(bodyParser.json());

  app.post('/auth/register', async (req, res, next) => {
    try {
      await registerSchema.validateAsync(req.body);

      const controller = new AuthController(DI.userService, DI.jwtService);

      return res.json(await controller.register(req.body as IRegisterPayload))
    } catch (error) {
      return next(error);
    }
  });

  app.post('/auth/login', async (req, res, next) => {
    try {
      await loginSchema.validateAsync(req.body);

      const controller = new AuthController(DI.userService, DI.jwtService);

      return res.json(await controller.login(req.body as ILoginPayload))
    } catch (error) {
      return next(error);
    }
  });

  app.post('/auth/send-verification-email',
    passport.authenticate('jwt', {session: false}),
    async (req, res, next) => {
      res.end('logged in.');
    });

  app.use(joiErrorHandler)
  app.use(globalErrorHandler);
  app.listen(config.PORT, () => {
    DI.logger.log('info', `> The server is listening on http://localhost:${config.PORT}`);
  });
}

function joiErrorHandler(error: any, req: any, res: any, next: any) {
  if(error.isJoi) {
    throw new BadRequest(error.message);
  }
  next(error)
}

// TODO: Use the right types
function globalErrorHandler(error: any, req: any, res: any, next: any) {
  if(error instanceof HTTPError) {
    return res.status(error.statusCode).json(error.payload);
  }

  // TODO: A more robust error handling solution
  // Don't forget to report internal errors to a service like Sentry
  console.error(error);
  return res.status(500).end('internal server error');
}

bootstrap();
