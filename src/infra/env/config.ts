/* eslint-disable n/no-process-env */
import dotenv from 'dotenv';
import * as envVar from 'env-var';
import path from 'node:path';
import process from 'node:process';

import { LogLevel } from '../logger/log.constant';

let env;
if (process.env.NODE_ENV !== 'development') {
  env = envVar.from(process.env);
} else {
  dotenv.config({ path: path.join(process.cwd(), '.env') });
  env = envVar.from({
    // Application Configuration
    APP_URL: process.env.APP_URL,
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    HOST: process.env.HOST,
    LOG_LEVEL: process.env.LOG_LEVEL,
    EMAIL_VERIFICATION: process.env.EMAIL_VERIFICATION,

    // Database Configuration
    POSTGRES_DB_HOST: process.env.POSTGRES_DB_HOST,
    POSTGRES_DB_PORT: process.env.POSTGRES_DB_PORT,
    POSTGRES_DB_USERNAME: process.env.POSTGRES_DB_USERNAME,
    POSTGRES_DB_PASSWORD: process.env.POSTGRES_DB_PASSWORD,
    POSTGRES_DB_DATABASE: process.env.POSTGRES_DB_DATABASE,
    POSTGRES_DB_SCHEMA: process.env.POSTGRES_DB_SCHEMA,
    // JWT Configuration
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,
    // Redis Configuration
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    REDIS_DB: process.env.REDIS_DB,
    // Cors Configuration
    CORS_ORIGINS: process.env.CORS_ORIGINS,
    CORS_MAX_AGE: process.env.CORS_MAX_AGE,
    CORS_METHODS: process.env.CORS_METHODS,
    CORS_ALLOWED_HEADERS: process.env.CORS_ALLOWED_HEADERS,
  });
}

export const envConfig = {
  // APPLICATION CONFIGURATION
  // APP_URL: env.get('APP_URL').required().asString(),
  APP_URL: process.env.APP_URL,
  NODE_ENV: env
    .get('NODE_ENV')
    .required()
    .asEnum(['development', 'production', 'test']),
  PORT: env.get('PORT').required().asPortNumber(),
  HOST: env.get('HOST').required().asString(),
  EMAIL_VERIFICATION: env.get('EMAIL_VERIFICATION').default('false').asBool(),

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
