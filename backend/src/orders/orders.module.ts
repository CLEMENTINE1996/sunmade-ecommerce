import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './repositories/orders.repository';
import { OrdersController } from './orders.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [OrdersController],
  providers: [
    {
      provide: 'IOrdersRepository',
      useClass: OrdersRepository,
    },
    {
      provide: 'IOrdersService',
      useClass: OrdersService,
    },
  ],
})
export class OrdersModule {}
