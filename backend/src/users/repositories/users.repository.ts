import { Injectable, Inject } from '@nestjs/common';
import { IUsersRepository } from '../interfaces/users-repository.interface';
import { KNEX_CONNECTION } from '../../database/database.provider';
import { Knex } from 'knex';
import { UserEntity } from '../entities/user.entity';
import { RegisterDto } from '../../auth/dto/register.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(@Inject(KNEX_CONNECTION) private readonly knex: Knex) {}

  async findByEmail(email: string): Promise<UserEntity | null> {
    // 1. Force lowercase trim to prevent white-space mismatch anomalies
    const cleanEmail = email.trim().toLowerCase();

    // 2. Fetch the user row explicitly
    const user = await this.knex('users')
      .whereRaw('LOWER(email) = ?', [cleanEmail])
      .first();

    // If no user is found in the database, return null immediately
    if (!user) {
      console.log(`[AuthDebug] No user found matching email: ${cleanEmail}`);
      return null;
    }

    console.log('[AuthDebug] User row found in DB:', {
      id: user.id,
      email: user.email,
      hasPasswordHash: !!user.password,
    });

    // 3. Fetch matching roles from your split table using the found user's ID
    const rolesRows = await this.knex('user_roles')
      .where({ user_id: user.id });

    console.log(`[AuthDebug] Found ${rolesRows.length} roles for user ID ${user.id}:`, rolesRows);

    // 4. Map and attach the roles array dynamically to match your UserEntity structure
    return {
      id: user.id,
      email: user.email,
      password: user.password,
      name: user.name,
      roles: rolesRows, // Attaching the raw array objects [{ id, user_id, role }]
    } as UserEntity;
  }

  async create(registerDto: RegisterDto): Promise<UserEntity> {
    const { email, password, name } = registerDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Use a transaction since we are inserting into two related tables
    return await this.knex.transaction(async (trx) => {
      // Insert main user row
      const [userId] = await trx('users').insert({
        email,
        password: hashedPassword,
        name,
      });

      // Insert corresponding user role row
      await trx('user_roles').insert({
        user_id: userId,
        role: 'customer', // Default role assignment
      });

      return { 
        id: userId, 
        email, 
        name, 
        roles: [{ user_id: userId, role: 'customer' }] 
      } as any;
    });
  }
}