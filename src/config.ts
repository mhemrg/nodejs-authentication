import env from "./utils/env";
import IConfig from "./interfaces/IConfig";

const config: IConfig = {
  PORT: Number(env('PORT')),
};

export default config;
