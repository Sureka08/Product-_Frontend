'use client';

import Link from 'next/link';
import { useState } from 'react';

const API = process.env.NEXT_PUBLIC_API_URL;

export default function AddMobilePage() {
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

    alert('Mobile added successfully');
  };

  return (
    <main className="min-h-screen bg-gray-100 text-black">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-black/70 hover:text-black transition mb-6"
        >
          ← Back
        </Link>

        <div className="rounded-3xl border border-black/10 bg-black/10 backdrop-blur-xl shadow-2xl p-8">
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
                className="w-full rounded-2xl border border-black/10 bg-black/10 px-4 py-4 text-black placeholder:text-black/40 outline-none focus:border-cyan-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-black/70 mb-2">Description</label>
              <textarea
                placeholder="Enter mobile description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full min-h-[140px] rounded-2xl border border-black/10 bg-black/10 px-4 py-4 text-black placeholder:text-black/40 outline-none focus:border-b-400"
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
                className="w-full rounded-2xl border border-black/10 bg-black/10 px-4 py-4 text-black placeholder:text-black/40 outline-none focus:border-cyan-400"
                required
              />
            </div>

            <button className="w-full rounded-2xl bg-blue-400 px-6 py-4 text-lg font-bold text-black hover:bg-blue-300 transition">
              Add Mobile
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}