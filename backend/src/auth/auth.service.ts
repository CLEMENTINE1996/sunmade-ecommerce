import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { IAuthService } from './interfaces/auth-service.interface';
import { IUsersRepository } from '../users/interfaces/users-repository.interface';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly jwtService: JwtService
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersRepository.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('Email is already registered');
    }

    const newUser = await this.usersRepository.create(registerDto);
    return { message: 'Registration successful', userId: newUser.id };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersRepository.findByEmail(loginDto.email);
    if (!user) {
        throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    console.log('[AuthDebug] Bcrypt validation result:', isPasswordValid);

    if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid email or password');
    }

    const roleStrings = user.roles?.map(r => r.role) || ['customer'];
    const payload = { sub: user.id, email: user.email, roles: roleStrings };
    
    return {
        access_token: await this.jwtService.signAsync(payload),
        user: { id: user.id, name: user.name, email: user.email, roles: roleStrings }
    };
    }
}