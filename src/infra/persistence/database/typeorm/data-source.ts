import type { DataSourceOptions } from 'typeorm';

import path from 'node:path';
import process from 'node:process';
import { DataSource } from 'typeorm';

import { envConfig } from '../../../env';

// Load environment variables
const nodeEnv = envConfig.NODE_ENV;

const productionMigrationsPath = path.join(
  process.cwd(),
  'dist/infra/persistence/migrations/**/*.{js,js}',
);
const developmentMigrationsPath = path.join(
  process.cwd(),
  'src/infra/persistence/migrations/**/*.{ts,js}',
);

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: envConfig.POSTGRES_DB_HOST,
  port: envConfig.POSTGRES_DB_PORT,
  username: envConfig.POSTGRES_DB_USERNAME,
  password: envConfig.POSTGRES_DB_PASSWORD,
  database: envConfig.POSTGRES_DB_DATABASE,
  schema: envConfig.POSTGRES_DB_SCHEMA,
  entities: [path.join(__dirname, 'entities/**/*.entity.{ts,js}')],
  migrations: [
    nodeEnv === 'production'
      ? productionMigrationsPath
      : developmentMigrationsPath,
  ],
  synchronize: false,
  logging: nodeEnv !== 'production',
  migrationsTableName: 'migrations',
  migrationsRun: false,
};

export const dataSource = new DataSource(dataSourceOptions);
