import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function Events() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-5xl font-bold text-slate-900 mb-6">
              Events & Community Programs
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Building community through conservation, competition, and celebration
            </p>
          </div>
        </section>

        {/* Signature Events */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
              🌟 Signature Events & Annual Highlights
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Blue Duck Banquet */}
              <div className="bg-white rounded-lg border-2 border-blue-100 p-8 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold text-slate-900">
                    🦆 The Blue Duck Banquet
                  </h3>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full whitespace-nowrap">
                    Coming Soon
                  </span>
                </div>
                <p className="text-lg font-medium text-blue-600 mb-4">
                  October 2026 (Pending Funding)
                </p>
                <p className="text-slate-700 mb-6">
                  An elevated evening celebrating conservation, community, and the mission behind Blue Duck.
                </p>
                <ul className="space-y-2 mb-6 text-slate-600">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Dinner & program
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Silent & live auction
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Storytelling + impact highlights
                  </li>
                </ul>
                <p className="text-sm font-medium text-slate-500 mb-4">
                  Status: Planning & Sponsorship Phase
                </p>
                <button className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                  Become a Sponsor
                </button>
              </div>

              {/* Gold Tournament */}
              <div className="bg-white rounded-lg border-2 border-blue-100 p-8 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold text-slate-900">
                    🏆 The Blue Duck Gold Tournament
                  </h3>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full whitespace-nowrap">
                    Coming Soon
                  </span>
                </div>
                <p className="text-lg font-medium text-blue-600 mb-4">
                  September 2026
                </p>
                <p className="text-slate-700 mb-6">
                  A competitive fundraising tournament bringing together supporters, sponsors, and community leaders for a high-energy day with purpose.
                </p>
                <ul className="space-y-2 mb-6 text-slate-600">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Tournament play
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Team & individual awards
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Sponsor recognition
                  </li>
                </ul>
                <button className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                  Register Interest
                </button>
              </div>

              {/* Clay Shooting */}
              <div className="bg-white rounded-lg border-2 border-blue-100 p-8 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold text-slate-900">
                    🎯 Blue Duck Clay Shooting Event
                  </h3>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full whitespace-nowrap">
                    Coming Soon
                  </span>
                </div>
                <p className="text-lg font-medium text-blue-600 mb-4">
                  September–October (Date TBD)
                </p>
                <p className="text-slate-700 mb-6">
                  A classic outdoor fundraiser focused on camaraderie, friendly competition, and conservation values.
                </p>
                <ul className="space-y-2 mb-6 text-slate-600">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Clay shooting competition
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Food & refreshments
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Awards + raffle
                  </li>
                </ul>
                <button className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                  Register Interest
                </button>
              </div>

              {/* Photography Calendar */}
              <div className="bg-white rounded-lg border-2 border-blue-100 p-8 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold text-slate-900">
                    📸 Annual Animal Photography Calendar Competition
                  </h3>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full whitespace-nowrap">
                    Coming Soon
                  </span>
                </div>
                <p className="text-lg font-medium text-blue-600 mb-4">
                  Submissions: Spring–Summer | Winners: Fall
                </p>
                <p className="text-slate-700 mb-6">
                  A nationwide photo competition celebrating animals, nature, and the bond between people and pets.
                </p>
                <ul className="space-y-2 mb-6 text-slate-600">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Open to amateurs & professionals
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Public voting + judges' picks
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Winners featured in Annual Calendar
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Proceeds support charitable work
                  </li>
                </ul>
                <p className="text-sm italic text-slate-600 mb-4">
                  Inspired by Boone's incredible journey and the joy animals bring into our lives.
                </p>
                <button className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Year-Round Calendar */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
              📅 Year-Round Events & Community Programs
            </h2>

            <div className="space-y-6">
              {/* Q1 */}
              <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 md:mb-0">
                    January – March
                  </h3>
                  <span className="text-sm font-medium text-slate-500">Q1</span>
                </div>
                <h4 className="text-lg font-semibold text-blue-600 mb-3">
                  Community Outreach & Social Service Initiatives
                </h4>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Volunteer days
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Partnered charity support
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Local service projects
                  </li>
                </ul>
              </div>

              {/* Q2 */}
              <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 md:mb-0">
                    April – June
                  </h3>
                  <span className="text-sm font-medium text-slate-500">Q2</span>
                </div>
                <h4 className="text-lg font-semibold text-blue-600 mb-3">
                  Spring Charity Events & Fundraisers
                </h4>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Small-scale fundraising events
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Community meet-ups
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Photography contest submissions open
                  </li>
                </ul>
              </div>

              {/* Q3 */}
              <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 md:mb-0">
                    July – August
                  </h3>
                  <span className="text-sm font-medium text-slate-500">Q3</span>
                </div>
                <h4 className="text-lg font-semibold text-blue-600 mb-3">
                  Summer Community Engagement
                </h4>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Youth & family-friendly events
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Outreach programs
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Calendar competition voting
                  </li>
                </ul>
              </div>

              {/* September */}
              <div className="bg-white rounded-lg border-2 border-blue-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 md:mb-0">
                    September
                  </h3>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                    Peak Season
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-blue-600 mb-3">
                  Major Event Month
                </h4>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Blue Duck Gold Tournament
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Clay Shooting Event (Date TBD)
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Fall fundraising push
                  </li>
                </ul>
              </div>

              {/* October */}
              <div className="bg-white rounded-lg border-2 border-blue-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 md:mb-0">
                    October
                  </h3>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                    Peak Season
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-blue-600 mb-3">
                  Celebration & Awards
                </h4>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Blue Duck Banquet (Pending Funding)
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Calendar Winners Announced
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Calendar pre-orders & sales
                  </li>
                </ul>
              </div>

              {/* Q4 */}
              <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 md:mb-0">
                    November – December
                  </h3>
                  <span className="text-sm font-medium text-slate-500">Q4</span>
                </div>
                <h4 className="text-lg font-semibold text-blue-600 mb-3">
                  Giving Season & Impact Campaigns
                </h4>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Year-end giving
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Community service initiatives
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Annual impact recap
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-blue-600 text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">
              Stay Connected
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Get updates on upcoming events, volunteer opportunities, and ways to support our mission
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
                Get Event Updates
              </button>
              <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                Volunteer Sign-Up
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
