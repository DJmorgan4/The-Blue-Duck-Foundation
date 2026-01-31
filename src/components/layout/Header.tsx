import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-slate-900 text-white sticky top-0 z-50">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
        <Link href="/" className="text-xl font-bold">
          The Blue Duck Foundation
        </Link>

        <ul className="hidden md:flex gap-8 text-sm">
          <li><Link href="/" className="hover:text-blue-400">Home</Link></li>
          <li><Link href="/conservation" className="hover:text-blue-400">Conservation</Link></li>
          <li><Link href="/products" className="hover:text-blue-400">Products</Link></li>
          <li><Link href="/news" className="hover:text-blue-400">News</Link></li>
          <li><Link href="/events" className="hover:text-blue-400">Events</Link></li>
        </ul>

        <Link
          href="/contribute"
          className="bg-white text-slate-900 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-200"
        >
          Donate
        </Link>
      </nav>
    </header>
  );
}

