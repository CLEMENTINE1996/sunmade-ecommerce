import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { OrderEntity } from '../entities/order.entity';

export interface IOrdersRepository {
  createOrder(dto: CreateOrderDto): Promise<OrderEntity | null>;
  findAll(): Promise<OrderEntity[]>;
  findOne(id: number): Promise<OrderEntity | null>;
  update(id: number, dto: UpdateOrderDto): Promise<OrderEntity | null>;
  remove(id: number): Promise<boolean>;
}