import { apiClient } from './api.service';
import { User } from '../types';

interface AuthResponse {
  access_token: string;
  user: User;
}

export const authService = {
  login: (credentials: Record<string, string>): Promise<AuthResponse> => 
    apiClient('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
    
  register: (payload: Record<string, string>): Promise<{ message: string }> =>
    apiClient('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
};