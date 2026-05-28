import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepository } from './repositories/products.repository';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductsController],
  providers: [
    {
      provide: 'IProductsRepository',
      useClass: ProductsRepository,
    },
    {
      provide: 'IProductsService',
      useClass: ProductsService,
    },
  ],
  exports: ['IProductsService'],
})
export class ProductsModule {}