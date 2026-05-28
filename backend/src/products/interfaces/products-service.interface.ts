import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductEntity } from '../entities/product.entity';

export interface IProductsService {
  createProduct(dto: CreateProductDto): Promise<ProductEntity>;
  getAllProducts(): Promise<ProductEntity[]>;
  getProductById(id: number): Promise<ProductEntity>;
  updateProduct(id: number, dto: UpdateProductDto): Promise<ProductEntity>;
  deleteProduct(id: number): Promise<void>;
}