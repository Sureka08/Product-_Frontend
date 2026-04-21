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

export default function MobilesPage() {
  const [products, setProducts] = useState<Product[]>([]);

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

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this mobile?');

    if (!confirmDelete) return;

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
    <main className="min-h-screen bg-gray-100 text-black px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-black/70 hover:text-black transition mb-6"
        >
          ← Back
        </Link>

        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold">All Mobiles</h1>
            <p className="text-black/60 mt-2">
              Browse all mobile phones in your premium store dashboard.
            </p>
          </div>

          <div className="rounded-2xl border border-black/10 bg-black/10 px-4 py-3 text-sm text-black/70">
            Total: <span className="text-black font-semibold">{products.length}</span>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-black/15 bg-black/5 p-10 text-center text-black/60">
            No mobiles available.
          </div>
        ) : (
          <div className="grid gap-5">
            {products.map((product) => (
              <div
                key={product._id}
                  className="w-full rounded-2xl border border-black/10 bg-black/10 px-4 py-3 text-black placeholder:text-black/40 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{product.name}</h3>
                    <p className="text-black/65 max-w-xl">{product.description}</p>
                    <p className="mt-3 text-blue-500 font-semibold text-lg">
                      Rs. {product.price}
                    </p>
                  </div>

                  <div className="flex gap-3 flex-wrap">
                    <Link
                      href="/products"
                      className="rounded-2xl bg-blue-500 px-5 py-3 font-medium text-white hover:bg-blue-400 transition"
                    >
                        Manage
                    </Link>

                   
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}