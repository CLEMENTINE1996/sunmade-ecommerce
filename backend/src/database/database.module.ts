import { Module, Global } from '@nestjs/common';
import { DatabaseProvider, KNEX_CONNECTION } from './database.provider';

@Global()
@Module({
  providers: [DatabaseProvider],
  exports: [KNEX_CONNECTION],
})
export class DatabaseModule {}