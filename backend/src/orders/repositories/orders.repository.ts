import { Injectable, Inject } from '@nestjs/common';
import { KNEX_CONNECTION } from '../../database/database.provider';
import { Knex } from 'knex';
import { IOrdersRepository } from '../interfaces/orders-repository.interface';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { OrderEntity } from '../entities/order.entity';

@Injectable()
export class OrdersRepository implements IOrdersRepository {
  constructor(@Inject(KNEX_CONNECTION) private readonly knex: Knex) {}

  async createOrder(orderData: any): Promise<OrderEntity | null> {
    const { customer_name, contact_number, delivery_address, items } = orderData;
    let orderId:number = 0;

    // Use a transaction to guarantee data integrity
    const ifTransactionSuccess = await this.knex.transaction(async (trx) => {
      let totalAmount = 0;
      const verifiedItems: { variant_id: number; quantity: number; price_at_purchase: number }[] = [];

      // Calculate totals securely from database prices, not trust frontend data
      for (const item of items) {
        const variant = await trx('product_variants').where('id', item.variant_id).first();
        if (!variant || variant.stock < item.quantity) {
          throw new Error(`Variant ID ${item.variant_id} is unavailable or out of stock.`);
        }

        
        const priceNum = Number(variant.price);
        totalAmount += priceNum * item.quantity;
        verifiedItems.push({
          variant_id: Number(item.variant_id),
          quantity: Number(item.quantity),
          price_at_purchase: priceNum,
        });

        // Deduct stock
        await trx('product_variants')
          .where('id', item.variant_id)
          .decrement('stock', item.quantity);
      }

      // Insert main Order record
      orderId = await trx('orders').insert({
        customer_name,
        contact_number,
        delivery_address,
        total_amount: totalAmount,
      });

      // Insert order line items
      const orderItemsPayload = verifiedItems.map(item => ({
        order_id: orderId,
        ...item
      }));
      await trx('order_items').insert(orderItemsPayload);

      return { success: true, orderId, totalAmount };
    });

    return ifTransactionSuccess ? await this.findOne(orderId) : null;
  }

  async findAll(): Promise<OrderEntity[]> {
    const Orders = await this.knex('Orders').select('*');
    for (const Order of Orders) {
      Order.variants = await this.knex('Order_variants').where('Order_id', Order.id);
    }
    return Orders;
  }

  async findOne(id: number): Promise<OrderEntity | null> {
    const Order = await this.knex('Orders').where('id', id).first();
    if (!Order) return null;

    Order.variants = await this.knex('Order_variants').where('Order_id', id);
    return Order;
  }

  private async findOneWithTrx(id: number, trx: Knex.Transaction): Promise<OrderEntity | null> {
    const Order = await trx('Orders').where('id', id).first();
    if (!Order) return null;
    Order.variants = await trx('Order_variants').where('Order_id', id);
    return Order;
  }

  async update(id: number, dto: UpdateOrderDto): Promise<OrderEntity | null> {
    await this.knex('Orders').where('id', id).update(dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const deletedRows = await this.knex('Orders').where('id', id).del();
    return deletedRows > 0;
  }
}