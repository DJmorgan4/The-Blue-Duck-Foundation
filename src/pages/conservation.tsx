import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function Conservation() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-slate-50 to-white py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-5xl font-bold text-slate-900 mb-6">
              Texas Conservation Watch
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Tracking the policies, lawsuits, and land-use decisions shaping Texas wildlife, water, and public access.
            </p>
          </div>
        </section>

        {/* Category Navigation */}
        <section className="border-b border-slate-200 bg-white sticky top-0 z-10 shadow-sm">
          <div className="container mx-auto px-4">
            <nav className="flex gap-6 overflow-x-auto py-4">
              <a href="#waterfowl" className="whitespace-nowrap text-slate-700 hover:text-blue-600 font-medium transition-colors">
                🦆 Waterfowl & Wetlands
              </a>
              <a href="#hunting" className="whitespace-nowrap text-slate-700 hover:text-blue-600 font-medium transition-colors">
                🦌 Public Hunting & Access
              </a>
              <a href="#lands" className="whitespace-nowrap text-slate-700 hover:text-blue-600 font-medium transition-colors">
                🌿 Parks, Refuges & Lands
              </a>
              <a href="#species" className="whitespace-nowrap text-slate-700 hover:text-blue-600 font-medium transition-colors">
                🐢 Endangered Species
              </a>
              <a href="#policy" className="whitespace-nowrap text-slate-700 hover:text-blue-600 font-medium transition-colors">
                ⚖️ Courts & Policy
              </a>
            </nav>
          </div>
        </section>

        {/* Active Fights Tracker */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">
              🔎 Active Texas Conservation Fights
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Fight Card Template */}
              <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Wetlands Protection After Sackett
                </h3>
                <div className="space-y-2 text-sm text-slate-600 mb-4">
                  <p><span className="font-medium">📍 Location:</span> Texas Coast & Inland Prairies</p>
                  <p><span className="font-medium">⚖️ Parties:</span> Developers vs. Conservation Groups</p>
                  <p><span className="font-medium">🦆 At Stake:</span> Seasonal wetlands critical to teal & pintail habitat</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                    🟡 Ongoing
                  </span>
                  <span className="text-xs text-slate-500">Regulatory rollback, no final ruling</span>
                </div>
              </div>

              {/* Placeholder for additional fight cards */}
              <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Additional Conservation Issues
                </h3>
                <p className="text-slate-600 text-sm mb-4">
                  More tracked issues coming soon. Know something happening locally?
                </p>
                <a href="#tip" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  Tip us off →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Recent News Briefs */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">
              Recent Updates
            </h2>

            {/* News Brief Template */}
            <article className="mb-12 pb-12 border-b border-slate-200 last:border-b-0">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Texas Blue-Winged Teal Season Adjustments
              </h3>
              
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-700 leading-relaxed mb-4">
                  <strong>What's happening:</strong> Texas wildlife managers are monitoring blue-winged teal populations following surveys that showed breeding population trends tied to habitat conditions and drought patterns across the Central Flyway.
                </p>
                
                <p className="text-slate-700 leading-relaxed mb-4">
                  <strong>Why it matters for ducks & hunters:</strong> Texas sits at the center of the Central Flyway. Habitat stress—especially wetlands loss and drought—affects migration success statewide and can influence season lengths and bag limits.
                </p>

                <div className="bg-blue-50 border-l-4 border-blue-600 p-4 my-6">
                  <p className="text-sm font-medium text-blue-900 mb-1">🦆 BlueDuck Take:</p>
                  <p className="text-sm text-blue-800">
                    Teal populations are early indicators of wetland health. Protecting seasonal wetlands and playas during peak migration is critical for maintaining huntable populations.
                  </p>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 font-medium rounded-full">
                    🟡 Ongoing
                  </span>
                  <span className="text-slate-600">
                    Sources: <a href="#" className="text-blue-600 hover:underline">TPWD</a> • <a href="#" className="text-blue-600 hover:underline">USFWS</a>
                  </span>
                </div>
              </div>
            </article>

            {/* Placeholder for more briefs */}
            <div className="text-center py-8">
              <p className="text-slate-600 mb-4">More conservation updates coming soon</p>
              <a href="#subscribe" className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                Get Monthly Updates
              </a>
            </div>
          </div>
        </section>

        {/* Texas Waterfowl Brief Promo */}
        <section className="py-16 px-4 bg-slate-900 text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-4">
              🦆 Texas Waterfowl & Habitat Brief
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Monthly roundup of policy developments, habitat trends, and upcoming decisions affecting Texas waterfowl
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#subscribe" className="px-8 py-3 bg-white text-slate-900 font-semibold rounded-lg hover:bg-slate-100 transition-colors">
                Subscribe to Monthly Brief
              </a>
              <a href="#archive" className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-slate-900 transition-colors">
                View Archive
              </a>
            </div>
          </div>
        </section>

        {/* Participation CTA */}
        <section className="py-12 px-4 bg-blue-50 border-t border-blue-100">
          <div className="container mx-auto max-w-4xl">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Know something happening locally?
                </h3>
                <p className="text-slate-600 mb-4">
                  Help us track conservation issues affecting Texas waterfowl and habitat.
                </p>
                <a href="#tip" className="text-blue-600 hover:text-blue-700 font-medium">
                  Tip us off →
                </a>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Dealing with wetlands permitting?
                </h3>
                <p className="text-slate-600 mb-4">
                  We're listening to landowners navigating conservation regulations.
                </p>
                <a href="#contact" className="text-blue-600 hover:text-blue-700 font-medium">
                  Share your story →
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
