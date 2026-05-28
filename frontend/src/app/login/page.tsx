'use client';
import { useState } from 'react';
import { authService } from '../../services/auth.service';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const { handleLogin } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await authService.login(form);
      handleLogin(data.user, data.access_token);
    } catch (err: any) {
      setError(err.message || 'Invalid email or secret match.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-md mx-auto mt-20 p-6 bg-white border rounded-xl shadow-sm">
      <h1 className="text-2xl font-bold mb-2 text-amber-900">Welcome Back</h1>
      <p className="text-sm text-gray-500 mb-6">Access your Sunmade Rice profile</p>

      {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4 font-medium">{error}</div>}

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-600">Email Address</label>
          <input
            type="email"
            required
            className="w-full border p-2.5 rounded-lg mt-1 focus:outline-amber-600"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-600">Password</label>
          <input
            type="password"
            required
            className="w-full border p-2.5 rounded-lg mt-1 focus:outline-amber-600"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-amber-700 hover:bg-amber-800 text-white py-2.5 rounded-lg font-bold transition disabled:opacity-50"
        >
          {loading ? 'Authenticating...' : 'Sign In'}
        </button>
      </form>
    </main>
  );
}