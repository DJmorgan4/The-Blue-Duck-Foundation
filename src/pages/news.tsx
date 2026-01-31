import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function News() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">News & Updates</h1>
        {/* News articles grid */}
      </main>
      <Footer />
    </div>
  );
}
