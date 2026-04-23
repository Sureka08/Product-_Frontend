'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const API =
  process.env.NEXT_PUBLIC_API_URL ||
  'https://productbackend-production-b452.up.railway.app';

export default function AddMobilePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          price: Number(form.price),
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      setForm({
        name: '',
        description: '',
        price: '',
      });

      router.push('/VIEW');
    } catch (error) {
      console.error('Failed to create product:', error);
      alert('Could not save the mobile. Make sure the backend is running on http://localhost:3001.');
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
    <main className="min-h-screen bg-gray-100 text-black px-6 py-10">
      <div className="mx-auto max-w-3xl">
        
        <Link
  href="/"
  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/5 backdrop-blur-xl border border-black/10 text-sm font-medium text-black hover:text-blue-500 hover:scale-105 transition-all duration-200 shadow-md"
>
  <span className="text-lg">←</span>
  Back
</Link>
<br />
<br />

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