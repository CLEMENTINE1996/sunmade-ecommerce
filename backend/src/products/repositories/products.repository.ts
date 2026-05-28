import { Injectable, Inject } from '@nestjs/common';
import { KNEX_CONNECTION } from '../../database/database.provider';
import { Knex } from 'knex';
import { IProductsRepository } from '../interfaces/products-repository.interface';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductEntity } from '../entities/product.entity';

@Injectable()
export class ProductsRepository implements IProductsRepository {
  constructor(@Inject(KNEX_CONNECTION) private readonly knex: Knex) {}

  async create(dto: CreateProductDto): Promise<ProductEntity> {
    return await this.knex.transaction(async (trx) => {
      const { variants, ...productData } = dto;
      
      const [productId] = await trx('products').insert(productData);

      if (variants && variants.length > 0) {
        const variantsToInsert = variants.map(v => ({ ...v, product_id: productId }));
        await trx('product_variants').insert(variantsToInsert);
      }

      const created = await this.findOneWithTrx(productId, trx);
      return created!;
    });
  }

  async findAll(): Promise<ProductEntity[]> {
    const products = await this.knex('products').select('*');
    for (const product of products) {
      product.variants = await this.knex('product_variants').where('product_id', product.id);
    }
    return products;
  }

  async findOne(id: number): Promise<ProductEntity | null> {
    const product = await this.knex('products').where('id', id).first();
    if (!product) return null;

    product.variants = await this.knex('product_variants').where('product_id', id);
    return product;
  }

  private async findOneWithTrx(id: number, trx: Knex.Transaction): Promise<ProductEntity | null> {
    const product = await trx('products').where('id', id).first();
    if (!product) return null;
    product.variants = await trx('product_variants').where('product_id', id);
    return product;
  }

  async update(id: number, dto: UpdateProductDto): Promise<ProductEntity | null> {
    await this.knex('products').where('id', id).update(dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const deletedRows = await this.knex('products').where('id', id).del();
    return deletedRows > 0;
  }
}