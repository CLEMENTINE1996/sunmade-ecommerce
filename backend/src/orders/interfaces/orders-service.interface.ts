import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { OrderEntity } from '../entities/order.entity';

export interface IOrdersService {
  createOrder(dto: CreateOrderDto): Promise<OrderEntity | null>;
  findAllOrders(): Promise<OrderEntity[]>;
  findOrderById(id: number): Promise<OrderEntity | null>;
  updateOrder(id: number, dto: UpdateOrderDto): Promise<OrderEntity>;
  deleteOrder(id: number): Promise<void>;
}