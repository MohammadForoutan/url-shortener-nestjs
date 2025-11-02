/* eslint-disable n/no-process-env */
import type { DataSourceOptions } from 'typeorm';

import { config } from 'dotenv';
import path from 'node:path';
import process from 'node:process';
import { DataSource } from 'typeorm';

// Load environment variables
if (process.env.NODE_ENV !== 'production') {
  config({ path: path.join(process.cwd(), '.env') });
}

const nodeEnv = process.env.NODE_ENV || 'development';

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_DB_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_DB_PORT || '5432', 10),
  username: process.env.POSTGRES_DB_USERNAME || 'postgres',
  password: process.env.POSTGRES_DB_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB_DATABASE || 'url_shortener',
  schema: process.env.POSTGRES_DB_SCHEMA || 'public',
  entities: [path.join(__dirname, 'entities/**/*.entity.{ts,js}')],
  migrations: [
    nodeEnv === 'production'
      ? path.join(__dirname, '../migrations/**/*.js')
      : path.join(process.cwd(), 'src/infra/persistence/migrations/**/*.ts'),
  ],
  synchronize: false,
  logging: nodeEnv !== 'production',
  migrationsTableName: 'migrations',
  migrationsRun: false,
};

export const dataSource = new DataSource(dataSourceOptions);
