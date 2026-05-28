import { Module } from '@nestjs/common';
import { IUsersRepository } from './interfaces/users-repository.interface';
import { UsersRepository } from './repositories/users.repository';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: IUsersRepository,
      useClass: UsersRepository,
    },
  ],
  exports: [IUsersRepository],
})
export class UsersModule {}