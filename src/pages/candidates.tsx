import { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { supabase } from '../lib/supabase';

interface Site {
  id: string;
  name: string;
  lat: number;
  lng: number;
  county: string;
  state: string;
  status: string;
  created_from: string;
  created_at: string;
}

export default function CandidatesPage() {
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('sites')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (data) setSites(data);
        if (error) console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Conservation Candidates — Blue Duck Foundation</title>
      </Head>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow bg-white font-['Jost',sans-serif]">

          {/* HERO */}
          <section className="border-b border-slate-100">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 lg:py-20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-5 h-px bg-slate-300" />
                <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium">
                  Field Action Pipeline
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <div>
                  <h1 className="font-['Cormorant_Garamond'] text-5xl font-light text-slate-900 mb-3">
                    Conservation Candidates
                  </h1>
                  <p className="text-[15px] leading-relaxed text-slate-500 font-light max-w-xl">
                    Sites identified by the Lithic Earth intelligence platform and queued for field validation, restoration assessment, or active conservation action.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <span className="text-[10px] tracking-[0.15em] uppercase text-slate-400 font-medium border border-slate-200 px-4 py-2">
                    {sites.length} site{sites.length !== 1 ? 's' : ''} in pipeline
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* SITES LIST */}
          <section>
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
              {loading && (
                <p className="text-sm text-slate-400 font-light">Loading sites...</p>
              )}
              {!loading && sites.length === 0 && (
                <div className="border border-dashed border-slate-200 p-12 text-center">
                  <p className="font-['Cormorant_Garamond'] text-2xl font-light text-slate-400 mb-2">No candidates yet</p>
                  <p className="text-sm text-slate-400 font-light">Sites saved from Lithic Earth will appear here.</p>
                </div>
              )}
              {!loading && sites.length > 0 && (
                <div className="divide-y divide-slate-100">
                  {sites.map((site) => (
                    <div key={site.id} className="py-6 grid sm:grid-cols-[1fr_auto] gap-4 items-start">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h2 className="font-['Cormorant_Garamond'] text-xl font-light text-slate-900">
                            {site.name || `Site ${site.id.slice(0, 8)}`}
                          </h2>
                          <StatusBadge status={site.status} />
                        </div>
                        <div className="flex flex-wrap gap-4 text-[11px] tracking-wide text-slate-400 font-light">
                          <span>{site.lat?.toFixed(5)}°, {site.lng?.toFixed(5)}°</span>
                          {site.county && <span>{site.county}{site.state ? `, ${site.state}` : ''}</span>}
                          <span className="uppercase tracking-[0.1em]">Source: {site.created_from}</span>
                          <span>{new Date(site.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        
                          href={`https://lithicearth.com/portal/globe?lat=${site.lat}&lng=${site.lng}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[10px] tracking-[0.12em] uppercase font-medium border border-slate-200 text-slate-500 px-4 py-2 hover:border-slate-400 transition-colors"
                        >
                          View in Lithic →
                        </a>
                        <button className="text-[10px] tracking-[0.12em] uppercase font-medium border border-slate-900 text-slate-900 px-4 py-2 hover:bg-slate-900 hover:text-white transition-colors">
                          Start Field Visit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

        </main>
        <Footer />
      </div>
    </>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; color: string; bg: string }> = {
    new:       { label: 'New',       color: '#1e40af', bg: '#eff6ff' },
    analyzed:  { label: 'Analyzed',  color: '#92400e', bg: '#fef3c7' },
    candidate: { label: 'Candidate', color: '#065f46', bg: '#ecfdf5' },
    active:    { label: 'Active',    color: '#7c3aed', bg: '#f5f3ff' },
    completed: { label: 'Completed', color: '#374151', bg: '#f9fafb' },
  };
  const s = config[status] ?? config['new'];
  return (
    <span
      className="text-[9px] tracking-[0.12em] uppercase font-medium px-2 py-0.5"
      style={{ color: s.color, background: s.bg }}
    >
      {s.label}
    </span>
  );
}
