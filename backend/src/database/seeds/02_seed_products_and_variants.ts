import { type Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('product_variants').del();
  await knex('products').del();

  const [brownRiceId] = await knex('products').insert({
    name: 'SunMade Brown Rice',
    description: 'Make the healthy switch with our premium brown rice. A nutrient-dense option that brings the goodness of the mill directly to your home.',
    image_url: '/sunmadeph/data/images/products/brown-rice.jpg',
  });

  const [whiteRiceId] = await knex('products').insert({
    name: 'SunMade Well-Milled Rice',
    description: 'Our signature well-milled white rice offers a clean, versatile taste and soft texture, produced with care by our community of local farmers.',
    image_url: '/sunmadeph/data/images/products/white-rice.jpg',
  });

  await knex('product_variants').insert([
    {
      product_id: brownRiceId,
      weight_kg: '5kg',
      price: 350,
      stock: 50,
    },
    {
      product_id: brownRiceId,
      weight_kg: '2kg',
      price: 150,
      stock: 100,
    },
    {
      product_id: brownRiceId,
      weight_kg: '1kg',
      price: 80,
      stock: 150,
    },
    {
      product_id: whiteRiceId,
      weight_kg: '2kg',
      price: 120,
      stock: 200,
    },
    {
      product_id: whiteRiceId,
      weight_kg: '5kg',
      price: 280,
      stock: 80,
    },
  ]);
}