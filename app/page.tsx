import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-10 rounded-2xl shadow-lg max-w-xl text-center">
        <h1 className="text-4xl font-bold mb-4">Suka Product</h1>
        <p className="text-gray-600 mb-6">
          Suka Suka Suka
        </p>
        <Link
          href="/products"
          className="inline-block bg-black text-white px-6 py-3 rounded-lg"
        >
          Go to Products
        </Link>
      </div>
    </main>
  );
}