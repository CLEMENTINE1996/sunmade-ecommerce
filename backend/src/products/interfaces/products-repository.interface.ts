import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductEntity } from '../entities/product.entity';

export interface IProductsRepository {
  create(dto: CreateProductDto): Promise<ProductEntity>;
  findAll(): Promise<ProductEntity[]>;
  findOne(id: number): Promise<ProductEntity | null>;
  update(id: number, dto: UpdateProductDto): Promise<ProductEntity | null>;
  remove(id: number): Promise<boolean>;
}