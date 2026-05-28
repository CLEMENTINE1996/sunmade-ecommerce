import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';

export abstract class IAuthService {
  abstract register(registerDto: RegisterDto): Promise<{ message: string; userId: number }>;
  abstract login(loginDto: LoginDto): Promise<{ access_token: string; user: any }>;
}