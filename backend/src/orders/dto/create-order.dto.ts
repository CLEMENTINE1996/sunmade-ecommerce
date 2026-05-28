import { IsString, IsNumber, IsNotEmpty, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { CreateProductVariantDto } from '../../products/dto/create-product.dto';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty({ message: 'Customer name is required' })
  customer_name!: string;

  @IsString()
  @IsNotEmpty({ message: 'Contact number is required' })
  contact_number!: string;

  @IsString()
  @IsNotEmpty({ message: 'Delivery address is required' })
  delivery_address!: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Total Amount is required' })
  total_amount!: number;

  @IsString()
  @IsNotEmpty({ message: 'Status is required' })
  status!: string;
}

export class CreateOrderItemsDto {
  @IsNumber()
  @IsNotEmpty({ message: 'Order id is required' })
  order_id!: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Variant id is required' })
  variant_id!: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Quantity is required' })
  quantity!: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Price is required' })
  price_at_purchase!: number;

  order?: CreateOrderDto;
  variant?: CreateProductVariantDto;
}