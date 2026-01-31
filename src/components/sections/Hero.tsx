import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-20 grid gap-12 md:grid-cols-2 items-center">

        <div className="space-y-6">
          <p className="text-sm font-semibold text-slate-500">
            The Blue Duck Foundation
          </p>

          <h1 className="text-5xl font-bold text-slate-900">
            Protect wildlife. Restore habitats.
          </h1>

          <p className="text-lg text-slate-700">
            Supporting conservation projects, clean waterways, and
            community-driven restoration efforts.
          </p>

          <div className="flex gap-4">
            <Link
              href="/contribute"
              className="bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-slate-800"
            >
              Donate Now
            </Link>

            <Link
              href="/conservation"
              className="border border-slate-300 px-6 py-3 rounded-xl font-semibold hover:bg-slate-50"
            >
              Learn More
            </Link>
          </div>
        </div>

        <div className="bg-slate-100 rounded-3xl p-10 text-center">
          <h2 className="text-xl font-bold text-slate-900">
            This Month’s Focus
          </h2>

          <p className="mt-3 text-slate-700">
            Habitat restoration and water conservation initiatives.
          </p>

          <div className="mt-6 h-3 bg-white rounded-full overflow-hidden">
            <div className="h-3 bg-slate-900 w-2/3"></div>
          </div>

          <p className="mt-2 text-sm text-slate-600">62% funded</p>
        </div>

      </div>
    </section>
  );
}

