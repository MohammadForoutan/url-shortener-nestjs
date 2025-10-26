import dotenv from 'dotenv';
import * as envVar from 'env-var';
import path from 'node:path';
import process from 'node:process';

import { LogLevel } from '../logger/log.constant';

dotenv.config({ path: path.join(process.cwd(), '.env') });

// eslint-disable-next-line n/no-process-env
const env = envVar.from(process.env);

export const envConfig = {
  // APPLICATION CONFIGURATION
  APP_URL: env.get('APP_URL').required().asString(),
  NODE_ENV: env
    .get('NODE_ENV')
    .required()
    .asEnum(['development', 'production', 'tess']),
  PORT: env.get('PORT').required().asPortNumber(),
  HOST: env.get('HOST').required().asString(),

  // LOGGING CONFIGURATION
  LOG_LEVEL: env.get('LOG_LEVEL').required().asEnum(Object.values(LogLevel)),

  // DATABASE CONFIGURATION
  POSTGRES_DB_HOST: env.get('POSTGRES_DB_HOST').required().asString(),
  POSTGRES_DB_PORT: env.get('POSTGRES_DB_PORT').required().asPortNumber(),
  POSTGRES_DB_USERNAME: env.get('POSTGRES_DB_USERNAME').required().asString(),
  POSTGRES_DB_PASSWORD: env.get('POSTGRES_DB_PASSWORD').required().asString(),
  POSTGRES_DB_DATABASE: env.get('POSTGRES_DB_DATABASE').required().asString(),
  POSTGRES_DB_SCHEMA: env.get('POSTGRES_DB_SCHEMA').required().asString(),

  // JWT CONFIGURATION
  JWT_SECRET: env.get('JWT_SECRET').required().asString(),
  JWT_EXPIRES_IN: env.get('JWT_EXPIRES_IN').required().asInt(),
  JWT_REFRESH_SECRET: env.get('JWT_REFRESH_SECRET').required().asString(),
  JWT_REFRESH_EXPIRES_IN: env
    .get('JWT_REFRESH_EXPIRES_IN')
    .required()
    .asString(),

  // REDIS CONFIGURATION (Optional)
  REDIS_HOST: env.get('REDIS_HOST').required().asString(),
  REDIS_PORT: env.get('REDIS_PORT').required().asPortNumber(),
  REDIS_PASSWORD: env.get('REDIS_PASSWORD').required().asString(),
  REDIS_DB: env.get('REDIS_DB').required().asInt(),

  // CORS CONFIGURATION
  CORS_ORIGINS: env.get('CORS_ORIGINS').required().asArray(),
  CORS_MAX_AGE: env.get('CORS_MAX_AGE').required().asInt(),
  CORS_METHODS: env.get('CORS_METHODS').required().asArray(),
  CORS_ALLOWED_HEADERS: env.get('CORS_ALLOWED_HEADERS').required().asArray(),
};
