import { type Knex } from 'knex';
import * as bcrypt from 'bcryptjs'; 
export async function seed(knex: Knex): Promise<void> {
  await knex('user_roles').del();
  await knex('users').del();

  // Reset auto-increment counts so IDs start fresh at 1
  await knex.raw('ALTER TABLE users AUTO_INCREMENT = 1');
  await knex.raw('ALTER TABLE user_roles AUTO_INCREMENT = 1');

  // Generate pure JS cross-compatible hashes
  const adminPassword = await bcrypt.hash('adminSecret123', 10);
  const customerPassword = await bcrypt.hash('customerSecret123', 10);

  const [adminId] = await knex('users').insert({
    name: 'Admin Manager',
    email: 'admin@sunmade.com',
    password: adminPassword,
  });

  const [customerId] = await knex('users').insert({
    name: 'Jason Aballe',
    email: 'jason@example.com',
    password: customerPassword,
  });

  await knex('user_roles').insert([
    { user_id: adminId, role: 'admin' },
    { user_id: customerId, role: 'customer' },
  ]);
}