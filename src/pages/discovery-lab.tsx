import Head from "next/head";
import Link from "next/link";
import Header from "@/components/layout/Header";

export default function DiscoveryLab() {
  return (
    <>
      <Head>
        <title>Discovery Lab | The Blue Duck Foundation</title>
        <meta
          name="description"
          content="The Blue Duck Discovery Lab explores environmental technology through real-world field research, conservation, and education."
        />
      </Head>

      <div className="min-h-screen bg-slate-950 text-white">
        <Header />

        <main>
          <section className="relative overflow-hidden border-b border-slate-800">
            <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-36">
              <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.24em] text-emerald-300">
                Blue Duck Discovery Lab
              </p>

              <h1 className="max-w-5xl font-['Cormorant_Garamond'] text-5xl font-light leading-tight sm:text-6xl lg:text-8xl">
                Discovering what lies
                <span className="block italic text-emerald-200">
                  above, below, and across the landscape.
                </span>
              </h1>

              <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-slate-300">
                The Blue Duck Discovery Lab brings environmental technology,
                field research, conservation, and education together to better
                understand the world around us.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center bg-white px-8 py-4 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-950 transition-colors hover:bg-slate-100"
                >
                  Partner with the Lab
                </Link>

                <Link
                  href="/donate"
                  className="inline-flex items-center justify-center border border-slate-600 px-8 py-4 text-[11px] font-medium uppercase tracking-[0.14em] text-white transition-colors hover:bg-white/10"
                >
                  Support the Lab
                </Link>
              </div>
            </div>
          </section>

          <section className="bg-white text-slate-900">
            <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
              <div className="grid gap-12 lg:grid-cols-2">
                <div>
                  <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-emerald-700">
                    Our Mission
                  </p>

                  <h2 className="font-['Cormorant_Garamond'] text-4xl font-light leading-tight lg:text-5xl">
                    Field-tested innovation for environmental understanding.
                  </h2>
                </div>

                <div className="space-y-6 text-base leading-relaxed text-slate-600">
                  <p>
                    The Discovery Lab evaluates environmental technologies in
                    real-world conditions and shares what we learn with
                    communities, researchers, conservation groups, and
                    technology partners.
                  </p>

                  <p>
                    Our work may include drones, LiDAR, ground-penetrating radar,
                    GIS, thermal imaging, water sensors, wildlife monitoring,
                    remote sensing, and other emerging tools.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
