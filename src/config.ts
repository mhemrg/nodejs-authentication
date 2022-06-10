import env from "./utils/env";
// import IConfig from "./interfaces/IConfig";

const config = {
  PORT: Number(env('PORT')),
  DATABASE_URL: env('DATABASE_URL'),
  JWT_SECRET: env('JWT_SECRET'),
  MAIL_HOST: env('MAIL_HOST'),
  MAIL_PORT: env('MAIL_PORT'),
  MAIL_USER: env('MAIL_USER'),
  MAIL_PASSWORD: env('MAIL_PASSWORD'),
  MAIL_FROM: env('MAIL_FROM'),
};

export default config;
