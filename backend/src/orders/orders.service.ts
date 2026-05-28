import { Injectable, NotFoundException, InternalServerErrorException, Inject } from '@nestjs/common';
import { IOrdersService } from './interfaces/orders-service.interface';
import type { IOrdersRepository } from './interfaces/orders-repository.interface';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderEntity } from './entities/order.entity';

@Injectable()
export class OrdersService implements IOrdersService {

  constructor(
    @Inject('IOrdersRepository') 
    private readonly ordersRepository: IOrdersRepository
  ) {}

  async createOrder(dto: CreateOrderDto): Promise<OrderEntity | null> {
    try {
      return await this.ordersRepository.createOrder(dto);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create order record.');
    }
  }

  async findAllOrders(): Promise<OrderEntity[]> {
    return await this.ordersRepository.findAll();
  }

  async findOrderById(id: number): Promise<OrderEntity> {
    const Orders = await this.ordersRepository.findOne(id);
    if (!Orders) {
      throw new NotFoundException(`Orders with ID ${id} not found`);
    }
    return Orders;
  }

  async updateOrder(id: number, dto: UpdateOrderDto): Promise<OrderEntity> {
    await this.findOrderById(id);
    const updated = await this.ordersRepository.update(id, dto);
    if (!updated) throw new InternalServerErrorException('Update failed');
    return updated;
  }

  async deleteOrder(id: number): Promise<void> {
    await this.findOrderById(id);
    await this.ordersRepository.remove(id);
  }
}