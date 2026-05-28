import './globals.css'; 
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'Sunmade Rice Store',
  description: 'Premium quality rice varieties online platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen text-gray-900 antialiased">
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <div className="py-6">{children}</div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}