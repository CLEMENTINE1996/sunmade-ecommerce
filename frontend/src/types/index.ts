export interface UserRole {
  id: number;
  user_id: number;
  role: 'customer' | 'admin';
}

export interface User {
  id: number;
  name: string;
  email: string;
  roles: string[];
}

export interface ProductVariant {
  id: number;
  product_id: number;
  weight_kg: string;
  price: number;
  stock: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  image_url: string;
  variants: ProductVariant[];
}

export interface CartItem {
  variantId: number;
  productId: number;
  name: string;
  weight: string;
  price: number;
  quantity: number;
}