import Head from "next/head";
import Link from "next/link";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

export default function DonateSuccessPage() {
  return (
    <>
      <Head>
        <title>Thank you — The Blue Duck Foundation</title>
      </Head>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow bg-white font-['Jost',sans-serif]">
          <section className="border-b border-slate-100">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-28 lg:py-36">
              <div className="max-w-2xl">

                <div className="flex items-center gap-3 mb-10">
                  <div className="w-6 h-px bg-emerald-500" />
                  <span className="text-[10px] tracking-[0.2em] uppercase text-emerald-600 font-medium">
                    Donation received
                  </span>
                </div>

                <h1 className="font-['Cormorant_Garamond'] text-6xl lg:text-7xl font-light leading-[1.04] tracking-tight text-slate-900 mb-8">
                  Thank you<br />
                  <em className="italic">for your support.</em>
                </h1>

                <p className="text-[15px] leading-[1.9] text-slate-500 font-light mb-8 max-w-lg">
                  Your contribution is confirmed. A tax receipt has been sent to your email — keep it for your records. Every dollar goes directly to the work.
                </p>

                <div className="border border-slate-100 bg-slate-50 p-8 mb-10">
                  <div className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium mb-4">
                    What happens next
                  </div>
                  <div className="space-y-4">
                    {[
                      { step: "01", text: "Check your inbox — your official tax receipt is on its way from info@theblueduck.org" },
                      { step: "02", text: "If your gift qualifies for physical recognition, we'll be in touch to get your mailing address." },
                      { step: "03", text: "Your name will be added to our supporter recognition as programs launch." },
                    ].map((item) => (
                      <div key={item.step} className="flex gap-5">
                        <span className="text-[10px] tracking-[0.15em] text-slate-300 font-medium pt-0.5 flex-shrink-0">{item.step}</span>
                        <p className="text-sm text-slate-500 font-light leading-relaxed">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/conservation"
                    className="text-[11px] font-medium tracking-[0.14em] uppercase bg-slate-900 text-white px-8 py-4 hover:bg-slate-700 transition-colors text-center"
                  >
                    See our programs
                  </Link>
                  <Link
                    href="/"
                    className="text-[11px] font-medium tracking-[0.14em] uppercase border border-slate-200 text-slate-700 px-8 py-4 hover:border-slate-400 transition-colors text-center"
                  >
                    Back to home
                  </Link>
                </div>

              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
