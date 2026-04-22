import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <Image
          src="/image.png"
          alt="Mobile Background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-linear-to-r from-black via-black/75 to-black/40" />
      </div>

      <div className="relative z-10 px-6 md:px-12 lg:px-20 py-6">
        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-md shadow-lg">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide text-white">
            Suka Mobiles
          </h1>

          <div className="flex items-center gap-8 text-sm md:text-lg font-medium">
            <Link href="/" className="text-white/80 hover:text-blue-400 transition">
              Home
            </Link>
            
          </div>
        </nav>

        <section className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2 items-center min-h-[88vh] gap-12">
          <div className="pt-10 lg:pt-0">
            <p className="mb-4 text-blue-400 tracking-[0.3em] uppercase text-sm md:text-base font-medium">
              Premium Mobile Store
            </p>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[0.95] tracking-tight">
              THE BEST
              <br />
              MOBILE
              <br />
              SHOP
            </h1>

            <p className="mt-6 max-w-xl text-base md:text-lg text-white/70 leading-8">
              Discover premium smartphones, latest accessories, and the best mobile deals
              in one modern shopping experience.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/ADD"
                className="rounded-2xl bg-blue-400 px-8 py-4 text-lg font-bold text-black shadow-lg hover:bg-blue-300 transition"
              >
                Add Mobile
              </Link>

              <Link
                href="/VIEW"
                className="rounded-2xl border border-white/20 bg-white/5 px-8 py-4 text-lg font-semibold text-white hover:bg-white/10 transition"
              >
                View Mobiles
              </Link>
            </div>
          </div>

          {/* Right side */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-xl rounded-4xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl shadow-2xl">
              <div className="overflow-hidden rounded-3xl">
                <Image
                  src="/image.png"
                  alt="Featured Mobile"
                  width={800}
                  height={700}
                  className="h-125 w-full object-cover"
                />
              </div>

              <div className="absolute -bottom-6 -left-6 rounded-2xl border border-white/10 bg-black/70 px-5 py-4 backdrop-blur-md shadow-xl">
                <p className="text-sm text-white/60">Featured Product</p>
                <h3 className="text-xl font-bold">iPhone Collection</h3>
              </div>

              <div className="absolute -top-6 -right-6 rounded-2xl border border-blue-400/30 bg-blue-400/10 px-5 py-4 backdrop-blur-md shadow-xl">
                <p className="text-sm text-white/60">Best Offer</p>
                <h3 className="text-xl font-bold text-blue-300">Up to 20% Off</h3>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}