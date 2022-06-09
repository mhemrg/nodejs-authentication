import env from "./utils/env";
import IConfig from "./interfaces/IConfig";

const config: IConfig = {
  PORT: Number(env('PORT')),
  DATABASE_URL: env('DATABASE_URL'),
};

export default config;
