'use client';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, handleLogout } = useAuth();
  const { cart } = useCart();

  const totalBags = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-amber-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-black tracking-wide text-amber-100">
          SUNMADE RICE
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-amber-200 transition">Catalog</Link>
          <Link href="/checkout" className="relative hover:text-amber-200 transition">
            Cart
            {totalBags > 0 && (
              <span className="absolute -top-2.5 -right-4 bg-green-600 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                {totalBags}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-4 border-l border-amber-700 pl-4">
              <span className="text-amber-200">
                Hi, <strong className="capitalize">{user.name}</strong> ({user.roles?.[0]})
              </span>
              <button 
                onClick={handleLogout}
                className="bg-amber-800 hover:bg-amber-700 text-xs px-3 py-1.5 rounded transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className="bg-green-700 hover:bg-green-600 px-4 py-2 rounded text-xs tracking-wider uppercase font-bold transition">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}