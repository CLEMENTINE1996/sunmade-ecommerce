import { apiClient } from './api.service';
import { Product } from '../types';

export const productsService = {
  getAll: (): Promise<Product[]> => apiClient('/products'),
};