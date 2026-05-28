import { UserRoleEntity } from './user_role.entity';

export class UserEntity {
  id!: number;
  email!: string;
  password!: string;
  name!: string;
  created_at!: string;
  updated_at!: string;

  roles?: UserRoleEntity[];
}