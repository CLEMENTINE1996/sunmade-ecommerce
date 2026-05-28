'use client';
import { useEffect, useState } from 'react';
import { productsService } from '../services/products.service';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { addToCart } = useCart();

  useEffect(() => {
    productsService.getAll()
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-12 text-center text-gray-500 font-medium">Loading Sunmade Rice Menu...</div>;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold tracking-tight text-amber-900 mb-10">Premium Rice Catalog</h1>
      
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {products.map((product) => (
          <div key={product.id} className="group relative bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
            <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>
            
            <div className="mt-6 border-t pt-4 space-y-3">
              {product.variants.map((variant) => (
                <div key={variant.id} className="flex items-center justify-between bg-gray-50 p-2.5 rounded-lg">
                  <span className="text-sm font-semibold text-gray-700">{variant.weight_kg} Bag</span>
                  <div className="flex items-center gap-3">
                    <span className="text-base font-bold text-amber-700">₱{variant.price}</span>
                    <button
                      onClick={() => addToCart({
                        variantId: variant.id,
                        productId: product.id,
                        name: product.name,
                        weight: variant.weight_kg,
                        price: Number(variant.price),
                        quantity: 1
                      })}
                      className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-3 py-1.5 rounded-md transition"
                    >
                      Add Bag
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}