import env from "./utils/env";
import IConfig from "./interfaces/IConfig";

const config: IConfig = {
  PORT: Number(env('PORT')),
  DATABASE_URL: env('DATABASE_URL'),
  JWT_SECRET: env('JWT_SECRET'),
};

export default config;
