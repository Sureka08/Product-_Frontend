'use client';

import { useEffect, useState } from 'react';

const API = process.env.NEXT_PUBLIC_API_URL;

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
  });

  const loadProducts = async () => {
    const res = await fetch(`${API}/products`);
    const data = await res.json();
    setProducts(data);
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
  };

  const handleEdit = (product: any) => {
    setEditId(product._id);
    setForm({
      name: product.name,
      description: product.description,
      price: String(product.price),
    });
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h1 className="text-3xl font-bold mb-6">
            {editId ? 'Update Product' : 'Create Product'}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Product Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border p-3 rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full border p-3 rounded-lg"
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full border p-3 rounded-lg"
              required
            />
            <button className="bg-black text-white px-5 py-3 rounded-lg">
              {editId ? 'Update Product' : 'Add Product'}
            </button>
          </form>
        </div>

        <div className="space-y-4">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-xl shadow p-5 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p>{product.description}</p>
                <p>Rs. {product.price}</p>
              </div>

              <button
                onClick={() => handleEdit(product)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}