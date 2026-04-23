'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
};

const API =
  process.env.NEXT_PUBLIC_API_URL ;

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
  });
  const [editId, setEditId] = useState<string | null>(null);

  const formRef = useRef<HTMLDivElement | null>(null);

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

      formRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
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

    formRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
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
  const handlePriceChange = (value: string) => {
  if (/^\d*\.?\d{0,2}$/.test(value)) {
    setForm({ ...form, price: value });
  }
};

const handlePriceBlur = () => {
  if (!form.price) return;

  const price = Number(form.price);
  if (!Number.isNaN(price)) {
    setForm({ ...form, price: price.toFixed(2) });
  }
};

  return (
    <main className="min-h-screen bg-gray-100 text-black">
      <div className="mx-auto max-w-6xl px-4 py-6">
        
        <Link
          href="/VIEW"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/5 backdrop-blur-xl border border-black/10 text-sm font-medium text-black hover:text-blue-500 hover:scale-105 transition-all duration-200 shadow-md"
        >
        <span className="text-lg">←</span>
        Back
        </Link>
        <br />
        <br />

        <div>
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-blue-300 text-sm font-medium tracking-[0.2em] uppercase mb-2">
                Inventory
              </p>
              <h2 className="text-3xl font-bold">Your Products</h2>
              <p className="text-black/60 mt-2 text-sm">
                Manage all listed Mobile Phones in one premium dashboard.
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
              {products.map((product) => (
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
                          LKR. {product.price}
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

        <br />
        <br />
        <br />
        <br />
        <br />

        <div className="grid grid-cols-1 gap-8 items-start">
          <div
            ref={formRef}
            className="w-full rounded-3xl border border-gray-300 bg-gray-200/10 backdrop-blur-xl shadow-2xl p-8 lg:sticky lg:top-8"
          >
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

            <form onSubmit={handleSubmit} className="space-y-5">
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
                  className="w-full rounded-2xl border border-black/10 bg-black/10 px-4 py-3 text-black placeholder:text-black/40 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition min-h-35"
                  required
                />
              </div>

             <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-black/60 text-sm">
                  LKR
                </span>

                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="0.00"
                  value={form.price}
                  onChange={(e) => handlePriceChange(e.target.value)}
                  onBlur={handlePriceBlur}
                  className="w-full no-spinner rounded-2xl border border-black/10 bg-black/10 pl-14 pr-4 py-3 text-black placeholder:text-black/40 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition"
                  required
                />
              </div>

              <div className="flex justify-center gap-3 pt-3 flex-wrap">
                <button
                  type="submit"
                  className="w-fit rounded-2xl bg-blue-400 text-black font-semibold px-8 py-3 hover:bg-blue-300 transition shadow-lg shadow-blue-500/20"
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
                    className="w-fit rounded-2xl border border-black/15 px-6 py-3 text-black/80 hover:bg-black/10 transition"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}