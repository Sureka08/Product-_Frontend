'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
};

const API = process.env.NEXT_PUBLIC_API_URL;

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
  });
  const [editId, setEditId] = useState<string | null>(null);

  const loadProducts = async () => {
    try {
      const res = await fetch(`${API}/products`);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Failed to load products:', error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      description: form.description,
      price: Number(form.price),
    };

    try {
      if (editId) {
        await fetch(`${API}/products/${editId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        setEditId(null);
      } else {
        await fetch(`${API}/products`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      setForm({ name: '', description: '', price: '' });
      loadProducts();
    } catch (error) {
      console.error('Failed to save product:', error);
    }
  };

  const handleEdit = (product: Product) => {
    setEditId(product._id);
    setForm({
      name: product.name,
      description: product.description,
      price: String(product.price),
    });
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`${API}/products/${id}`, {
        method: 'DELETE',
      });
      loadProducts();
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 text-black">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-black/70 hover:text-black transition mb-6"
        >
          ← Back
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-8 items-start">
          <div className="rounded-3xl border border-gray-300 bg-gray-200/10 backdrop-blur-xl shadow-2xl p-6 lg:sticky lg:top-8">
            <div className="mb-6">
              <p className="text-blue-300 text-sm font-medium tracking-[0.2em] uppercase mb-2">
                😍
              </p>
              <h1 className="text-3xl font-bold">
                {editId ? 'Update Mobile Details' : 'Create Mobile Details'}
              </h1>
              <p className="text-black/60 mt-2 text-sm">
                Add your latest phones, accessories, and gadget items with a premium store look.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-black/70 mb-2">Mobile Name</label>
                <input
                  type="text"
                  placeholder="Enter mobile name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-2xl border border-black/10 bg-black/10 px-4 py-3 text-black placeholder:text-black/40 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-black/70 mb-2">Description</label>
                <textarea
                  placeholder="Enter mobile description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full rounded-2xl border border-black/10 bg-black/10 px-4 py-3 text-black placeholder:text-black/40 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition min-h-[120px]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-black/70 mb-2">Price</label>
                <input
                  type="number"
                  placeholder="Enter price"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="w-full rounded-2xl border border-black/10 bg-black/10 px-4 py-3 text-black placeholder:text-black/40 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition"
                  required
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 rounded-2xl bg-blue-400 text-black font-semibold py-3 hover:bg-blue-300 transition shadow-lg shadow-blue-500/20"
                >
                  {editId ? 'Update Mobile' : 'Add Mobile'}
                </button>

                {editId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditId(null);
                      setForm({ name: '', description: '', price: '' });
                    }}
                    className="rounded-2xl border border-black/15 px-5 py-3 text-black/80 hover:bg-black/10 transition"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Product List */}
          <div>
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-blue-300 text-sm font-medium tracking-[0.2em] uppercase mb-2">
                  Inventory
                </p>
                <h2 className="text-3xl font-bold">Your Products</h2>
                <p className="text-black/60 mt-2 text-sm">
                  Manage all listed Mobile Phoness in one premium dashboard.
                </p>
              </div>

              <div className="rounded-2xl border border-black/10 bg-black/10 px-4 py-3 text-sm text-black/70">
                Total: <span className="text-black font-semibold">{products.length}</span>
              </div>
            </div>

            {products.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-black/15 bg-black/5 p-10 text-center text-black/60">
                No products yet. Add your first Mobile to start your mobile shop.
              </div>
            ) : (
              <div className="grid gap-5">
                {products.map((product, index) => (
                  <div
                    key={product._id}
                    className="group rounded-3xl border border-black/10 bg-black/10 backdrop-blur-xl shadow-xl p-6 hover:border-blue-400/40 hover:bg-black/15 transition"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                      <div className="flex items-start gap-4">
                        

                        <div>
                          <h3 className="text-2xl font-bold mb-1">{product.name}</h3>
                          <p className="text-black/65 max-w-xl">{product.description}</p>
                          <p className="mt-3 text-blue-300 font-semibold text-lg">
                            Rs. {product.price}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEdit(product)}
                          className="rounded-2xl bg-blue-500 px-5 py-3 font-medium text-black hover:bg-blue-400 transition shadow-lg shadow-blue-500/20"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(product._id)}
                          className="rounded-2xl bg-red-500 px-5 py-3 font-medium text-black hover:bg-red-300 transition shadow-lg shadow-red-500/20"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}