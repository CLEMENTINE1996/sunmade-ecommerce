export class ProductVariantEntity {
  id!: number;
  product_id!: number;
  weight_kg!: string;
  price!: number;
  stock!: number;
}

export class ProductEntity {
  id!: number;
  name!: string;
  description!: string;
  image_url!: string;
  created_at!: string;
  updated_at!: string;
  
  variants?: ProductVariantEntity[];
}