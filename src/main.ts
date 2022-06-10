import 'dotenv/config';
import mongoose from 'mongoose';

import DI from './DI';
import config from "./config";
import Application from './providers/Application';
import AuthController from "./modules/auth/AuthController";
import { registerSchema, loginSchema } from './modules/auth/schema';

async function bootstrap() {
  await mongoose.connect(config.DATABASE_URL);
  DI.logger.log('info', '> Connected to the database.');

  const app = new Application;

  app.route({
    method: 'post',
    prefix: '/auth/register',
    schema: registerSchema,
    controller: AuthController,
    action: 'register',
  });

  app.route({
    method: 'post',
    prefix: '/auth/login',
    schema: loginSchema,
    controller: AuthController,
    action: 'login',
  });

  app.route({
    method: 'post',
    prefix: '/auth/send-verification-email',
    controller: AuthController,
    action: 'sendEmail',
    auth: 'jwt',
  });

  app.route({
    method: 'get',
    prefix: '/auth/verify-email',
    controller: AuthController,
    action: 'verifyEmail',
  });

  await app.listen();
}

bootstrap();
