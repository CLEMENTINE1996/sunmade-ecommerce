import { ProductVariantEntity } from '../../products/entities/product.entity';

export class OrderEntity {
  customer_name!: string;
  contact_number!: string;
  delivery_address!: string;
  total_amount!: number;
  status!: string;
  created_at!: string;
  updated_at!: string;
}

export class OrderItemEntity {  
    order_id!: number;
    variant_id!: number;
    quantity!: number
    price_at_purchase!: number;

    order?: OrderEntity;
    variant?: ProductVariantEntity;
}