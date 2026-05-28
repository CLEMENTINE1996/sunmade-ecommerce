/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('products', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.text('description');
      table.string('image_url');
      table.timestamps(true, true);
    })
    .createTable('product_variants', (table) => {
      table.increments('id').primary();
      table.integer('product_id').unsigned().references('id').inTable('products').onDelete('CASCADE');
      table.string('weight_kg').notNullable(); // e.g., "25kg", "50kg"
      table.decimal('price', 10, 2).notNullable();
      table.integer('stock').defaultTo(0);
    })
    .createTable('orders', (table) => {
      table.increments('id').primary();
      table.string('customer_name').notNullable();
      table.string('contact_number').notNullable();
      table.text('delivery_address').notNullable();
      table.decimal('total_amount', 10, 2).notNullable();
      table.string('status').defaultTo('pending'); // pending, processing, delivered
      table.timestamps(true, true);
    })
    .createTable('order_items', (table) => {
      table.increments('id').primary();
      table.integer('order_id').unsigned().references('id').inTable('orders').onDelete('CASCADE');
      table.integer('variant_id').unsigned().references('id').inTable('product_variants');
      table.integer('quantity').notNullable();
      table.decimal('price_at_purchase', 10, 2).notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTable('order_items')
    .dropTable('orders')
    .dropTable('product_variants')
    .dropTable('products');
};
