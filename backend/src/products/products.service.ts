import { Injectable, NotFoundException, InternalServerErrorException, Inject } from '@nestjs/common';
import { IProductsService } from './interfaces/products-service.interface';
import type { IProductsRepository } from './interfaces/products-repository.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductsService implements IProductsService {

  constructor(
    @Inject('IProductsRepository') 
    private readonly productsRepository: IProductsRepository
  ) {}

  async createProduct(dto: CreateProductDto): Promise<ProductEntity> {
    try {
      return await this.productsRepository.create(dto);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create product record.');
    }
  }

  async getAllProducts(): Promise<ProductEntity[]> {
    return await this.productsRepository.findAll();
  }

  async getProductById(id: number): Promise<ProductEntity> {
    const product = await this.productsRepository.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async updateProduct(id: number, dto: UpdateProductDto): Promise<ProductEntity> {
    await this.getProductById(id);
    const updated = await this.productsRepository.update(id, dto);
    if (!updated) throw new InternalServerErrorException('Update failed');
    return updated;
  }

  async deleteProduct(id: number): Promise<void> {
    await this.getProductById(id);
    await this.productsRepository.remove(id);
  }
}