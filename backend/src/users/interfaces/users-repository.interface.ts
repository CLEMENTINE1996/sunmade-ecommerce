import { UserEntity } from '../entities/user.entity';
import { RegisterDto } from '../../auth/dto/register.dto';

export abstract class IUsersRepository {
  abstract findByEmail(email: string): Promise<UserEntity | null>;
  abstract create(registerDto: RegisterDto): Promise<UserEntity>;
}