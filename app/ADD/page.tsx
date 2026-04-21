'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const API = process.env.NEXT_PUBLIC_API_URL;

export default function AddMobilePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch(`${API}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        description: form.description,
        price: Number(form.price),
      }),
    });

    setForm({
      name: '',
      description: '',
      price: '',
    });

    router.push('/VIEW');
  };

  return (
    <main className="min-h-screen bg-gray-100 text-black px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-black/70 hover:text-black transition mb-6"
        >
          ← Back
        </Link>

          <div className="rounded-3xl border border-gray-300 bg-gray-200/10 backdrop-blur-xl shadow-2xl p-6 lg:sticky lg:top-8">
          <p className="text-blue-500 text-sm font-medium tracking-[0.2em] uppercase mb-2">
            Add New Mobile
          </p>

          <h1 className="text-4xl font-bold mb-3">Create Mobile Details</h1>
          <p className="text-black/60 mb-8">
            Add your latest phones, accessories, and gadget items with a premium store look.
          </p>

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
                className="w-full min-h-35 rounded-2xl border border-black/10 bg-black/10 px-4 py-3 text-black placeholder:text-black/40 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition"
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

            <div className="flex justify-center mt-15">
                <button className="w-fit px-50 py-3 rounded-2xl bg-blue-500 text-white font-semibold hover:bg-blue-400 transition shadow-xl shadow-blue-500/30">
                    Add Mobile
                </button>
                </div>
          </form>
        </div>
      </div>
    </main>
  );
}