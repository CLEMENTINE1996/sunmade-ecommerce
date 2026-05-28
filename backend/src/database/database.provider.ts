import { Provider } from '@nestjs/common';
import knex, { Knex } from 'knex';

export const KNEX_CONNECTION = 'KNEX_CONNECTION';

export const DatabaseProvider: Provider = {
  provide: KNEX_CONNECTION,
  useFactory: () => {
    return knex({
      client: 'mysql2',
      connection: {
        host: process.env.DB_HOST || '127.0.0.1',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'sunmade_db',
        port: Number(process.env.DB_PORT) || 3306,
      },
    });
  },
};