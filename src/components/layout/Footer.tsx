import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-12 grid gap-8 md:grid-cols-4">

        <div>
          <h3 className="text-xl font-bold">The Blue Duck</h3>
          <p className="text-slate-400 mt-2">
            Conservation through technology and stewardship.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-slate-400">
            <li><Link href="/conservation">Conservation</Link></li>
            <li><Link href="/products">Products</Link></li>
            <li><Link href="/contribute">Contribute</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Resources</h4>
          <ul className="space-y-2 text-slate-400">
            <li><Link href="/news">News</Link></li>
            <li><Link href="/events">Events</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Location</h4>
          <p className="text-slate-400">McKinney, Texas</p>
          <p className="text-slate-400">hello@theblueduck.org</p>
        </div>

      </div>

      <div className="border-t border-slate-800 text-center py-6 text-slate-500">
        © {new Date().getFullYear()} The Blue Duck LLC
      </div>
    </footer>
  );
}

