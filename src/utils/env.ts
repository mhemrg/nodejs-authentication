function env(key: string, defaultValue?: string): string {
  if(process.env[key]) {
    return process.env[key] as string;
  }

  if(defaultValue) {
    return defaultValue;
  }

  throw new Error(`Environment variable ${key} is required.`);
}

export default env;
